import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatINR, formatPercent } from '../lib/formatters';

const ROUND_NAMES = ['Pre-Seed', 'Seed', 'Series A', 'Series B'];
const FOUNDER_COLORS = ['#6366f1', '#f59e0b', '#10b981'];

const DEFAULT_ROUND = { enabled: false, raised: '', preMoney: '', esopTopUp: '' };

export default function DilutionSim() {
  const [founderCount, setFounderCount] = useState(2);
  const [founders, setFounders] = useState([
    { name: 'Founder 1', split: 50 },
    { name: 'Founder 2', split: 40 },
    { name: 'Founder 3', split: 0 },
  ]);
  const [esopPool, setEsopPool] = useState(10);
  const [rounds, setRounds] = useState(ROUND_NAMES.map(() => ({ ...DEFAULT_ROUND })));

  function setFounder(idx, field, value) {
    setFounders((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  function setRound(idx, field, value) {
    setRounds((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  const simulation = useMemo(() => {
    const activeFounders = founders.slice(0, founderCount);
    const founderTotal = activeFounders.reduce((s, f) => s + Number(f.split || 0), 0);
    const initialEsop = Number(esopPool) || 0;

    if (founderTotal + initialEsop === 0) return [];

    const totalInitial = founderTotal + initialEsop;
    let ownership = activeFounders.map((f) => ((Number(f.split) || 0) / totalInitial) * 100);
    let esopOwnership = (initialEsop / totalInitial) * 100;
    let investorOwnership = 0;

    const stages = [
      {
        name: 'Founding',
        founders: ownership.map((o, i) => ({ name: activeFounders[i].name, pct: o })),
        esop: esopOwnership,
        investors: 0,
        postMoney: 0,
      },
    ];

    let cumulativeInvestorPct = 0;

    rounds.forEach((round, idx) => {
      if (!round.enabled) return;

      const raised = Number(round.raised) || 0;
      const preMoney = Number(round.preMoney) || 0;
      const topUp = Number(round.esopTopUp) || 0;
      const postMoney = preMoney + raised;

      if (postMoney === 0) return;

      const dilutionFromRaise = raised / postMoney;
      const dilutionFromTopUp = topUp / 100;

      ownership = ownership.map((o) => o * (1 - dilutionFromRaise) * (1 - dilutionFromTopUp));
      esopOwnership = esopOwnership * (1 - dilutionFromRaise) + topUp;
      cumulativeInvestorPct = cumulativeInvestorPct * (1 - dilutionFromRaise) * (1 - dilutionFromTopUp) + dilutionFromRaise * 100;

      stages.push({
        name: ROUND_NAMES[idx],
        founders: ownership.map((o, i) => ({ name: activeFounders[i].name, pct: o })),
        esop: esopOwnership,
        investors: cumulativeInvestorPct,
        postMoney,
      });
    });

    return stages;
  }, [founders, founderCount, esopPool, rounds]);

  const chartData = simulation.map((stage) => {
    const entry = { name: stage.name };
    stage.founders.forEach((f) => {
      entry[f.name] = Math.round(f.pct * 100) / 100;
    });
    entry['ESOP Pool'] = Math.round(stage.esop * 100) / 100;
    entry['Investors'] = Math.round(stage.investors * 100) / 100;
    return entry;
  });

  const lastStage = simulation[simulation.length - 1];
  const inputCls = 'w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand';

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Dilution Simulator</h1>
      <p className="mb-6 text-slate-400">Visualize equity dilution across funding rounds</p>

      <div className="mb-6 rounded-xl border border-surface-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-semibold">Initial Cap Table</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-300">Number of Founders</label>
          <div className="flex gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setFounderCount(n)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  founderCount === n ? 'bg-brand text-white' : 'border border-surface-border bg-surface-light text-slate-300 hover:border-brand/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founders.slice(0, founderCount).map((f, i) => (
            <div key={i} className="space-y-2">
              <input
                type="text"
                value={f.name}
                onChange={(e) => setFounder(i, 'name', e.target.value)}
                className={inputCls}
                placeholder={`Founder ${i + 1}`}
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={f.split}
                  onChange={(e) => setFounder(i, 'split', e.target.value)}
                  className={inputCls}
                  placeholder="Equity %"
                />
                <span className="text-sm text-slate-400">%</span>
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400">ESOP Pool</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={esopPool}
                onChange={(e) => setEsopPool(e.target.value)}
                className={inputCls}
              />
              <span className="text-sm text-slate-400">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {ROUND_NAMES.map((name, idx) => (
          <div key={name} className={`rounded-xl border bg-surface p-6 transition ${rounds[idx].enabled ? 'border-brand/40' : 'border-surface-border opacity-60'}`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-100">{name}</h3>
              <button
                onClick={() => setRound(idx, 'enabled', !rounds[idx].enabled)}
                className={`relative h-6 w-11 rounded-full transition ${rounds[idx].enabled ? 'bg-brand' : 'bg-surface-light'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${rounds[idx].enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            {rounds[idx].enabled && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Amount Raised (₹)</label>
                  <input type="number" value={rounds[idx].raised} onChange={(e) => setRound(idx, 'raised', e.target.value)} className={inputCls} placeholder="5,00,00,000" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Pre-Money Valuation (₹)</label>
                  <input type="number" value={rounds[idx].preMoney} onChange={(e) => setRound(idx, 'preMoney', e.target.value)} className={inputCls} placeholder="20,00,00,000" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">ESOP Top-Up (%)</label>
                  <input type="number" value={rounds[idx].esopTopUp} onChange={(e) => setRound(idx, 'esopTopUp', e.target.value)} className={inputCls} placeholder="2" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {simulation.length > 0 && (
        <>
          <div className="mb-8 rounded-xl border border-surface-border bg-surface p-6">
            <h2 className="mb-4 text-lg font-semibold">Ownership Over Rounds</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} stackOffset="expand">
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#f1f5f9' }}
                  formatter={(value) => formatPercent(value)}
                />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
                {founders.slice(0, founderCount).map((f, i) => (
                  <Bar key={f.name} dataKey={f.name} stackId="a" fill={FOUNDER_COLORS[i]} />
                ))}
                <Bar dataKey="ESOP Pool" stackId="a" fill="#64748b" />
                <Bar dataKey="Investors" stackId="a" fill="#e11d48" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Round</th>
                  {founders.slice(0, founderCount).map((f) => (
                    <th key={f.name} className="px-4 py-3 text-right font-medium text-slate-400">{f.name}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-slate-400">ESOP</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-400">Investors</th>
                </tr>
              </thead>
              <tbody>
                {simulation.map((stage) => (
                  <tr key={stage.name} className="border-b border-surface-border last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-200">{stage.name}</td>
                    {stage.founders.map((f) => (
                      <td key={f.name} className="px-4 py-3 text-right text-slate-100">{formatPercent(f.pct)}</td>
                    ))}
                    <td className="px-4 py-3 text-right text-slate-100">{formatPercent(stage.esop)}</td>
                    <td className="px-4 py-3 text-right text-slate-100">{formatPercent(stage.investors)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {lastStage && lastStage.postMoney > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold">Value at Final Post-Money ({formatINR(lastStage.postMoney)})</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lastStage.founders.map((f, i) => (
                  <div key={f.name} className="rounded-xl border border-surface-border bg-surface p-6 text-center">
                    <h3 className="font-semibold text-slate-200">{f.name}</h3>
                    <p className="text-2xl font-bold text-brand-light">{formatINR((f.pct / 100) * lastStage.postMoney)}</p>
                    <p className="text-sm text-slate-400">{formatPercent(f.pct)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
