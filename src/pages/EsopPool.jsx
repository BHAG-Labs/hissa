import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatPercent } from '../lib/formatters';

const STAGES = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];

const SENIORITY_LEVELS = ['Junior', 'Mid', 'Senior', 'Lead / Principal', 'VP / C-Level'];

const EQUITY_BENCHMARKS = {
  'Pre-Seed': { Junior: 0.05, Mid: 0.10, Senior: 0.25, 'Lead / Principal': 0.50, 'VP / C-Level': 1.00 },
  Seed: { Junior: 0.02, Mid: 0.05, Senior: 0.15, 'Lead / Principal': 0.30, 'VP / C-Level': 0.75 },
  'Series A': { Junior: 0.01, Mid: 0.03, Senior: 0.08, 'Lead / Principal': 0.15, 'VP / C-Level': 0.40 },
  'Series B': { Junior: 0.005, Mid: 0.015, Senior: 0.04, 'Lead / Principal': 0.08, 'VP / C-Level': 0.20 },
  'Series C+': { Junior: 0.002, Mid: 0.005, Senior: 0.02, 'Lead / Principal': 0.04, 'VP / C-Level': 0.10 },
};

const INDUSTRY_BENCHMARKS = {
  'Pre-Seed': { min: 10, max: 20 },
  Seed: { min: 10, max: 15 },
  'Series A': { min: 10, max: 15 },
  'Series B': { min: 5, max: 10 },
  'Series C+': { min: 3, max: 7 },
};

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function EsopPool() {
  const [stage, setStage] = useState('Seed');
  const [hires, setHires] = useState([
    { role: 'Engineer', seniority: 'Mid', count: 3 },
  ]);
  const [advisorPct, setAdvisorPct] = useState(1);

  function addHire() {
    setHires((prev) => [...prev, { role: '', seniority: 'Mid', count: 1 }]);
  }

  function removeHire(idx) {
    setHires((prev) => prev.filter((_, i) => i !== idx));
  }

  function setHire(idx, field, value) {
    setHires((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  const analysis = useMemo(() => {
    const benchmarks = EQUITY_BENCHMARKS[stage];
    const breakdown = hires.map((h) => {
      const pctPerHire = benchmarks[h.seniority] || 0;
      const total = pctPerHire * (Number(h.count) || 0);
      return { role: h.role || 'Unnamed', seniority: h.seniority, count: Number(h.count) || 0, pctPerHire, total };
    });

    const hiringTotal = breakdown.reduce((s, b) => s + b.total, 0);
    const advisor = Number(advisorPct) || 0;
    const subtotal = hiringTotal + advisor;
    const buffer = subtotal * 0.20;
    const recommended = subtotal + buffer;

    const benchmark = INDUSTRY_BENCHMARKS[stage];

    return { breakdown, hiringTotal, advisor, subtotal, buffer, recommended, benchmark };
  }, [stage, hires, advisorPct]);

  const pieData = [
    ...analysis.breakdown.filter((b) => b.total > 0).map((b) => ({
      name: `${b.role} (${b.count}×)`,
      value: Math.round(b.total * 1000) / 1000,
    })),
    ...(analysis.advisor > 0 ? [{ name: 'Advisors', value: analysis.advisor }] : []),
    { name: 'Buffer (20%)', value: Math.round(analysis.buffer * 1000) / 1000 },
  ];

  const inputCls = 'w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand';

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">ESOP Pool Planner</h1>
      <p className="mb-6 text-slate-400">Plan your ESOP pool based on hiring roadmap</p>

      <div className="mb-6 rounded-xl border border-surface-border bg-surface p-6">
        <label className="mb-2 block text-sm font-medium text-slate-300">Company Stage</label>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                stage === s ? 'bg-brand text-white' : 'border border-surface-border bg-surface-light text-slate-300 hover:border-brand/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-surface-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Hiring Plan</h2>
          <button
            onClick={addHire}
            className="rounded-lg bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand-light transition hover:bg-brand/20"
          >
            + Add Role
          </button>
        </div>

        <div className="mb-3 hidden sm:grid sm:grid-cols-[1fr_1fr_80px_100px_40px] gap-3 text-xs font-medium text-slate-400">
          <span>Role</span>
          <span>Seniority</span>
          <span>Count</span>
          <span>Equity/Hire</span>
          <span />
        </div>

        <div className="space-y-3">
          {hires.map((h, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_80px_100px_40px] items-center">
              <input
                type="text"
                value={h.role}
                onChange={(e) => setHire(i, 'role', e.target.value)}
                className={inputCls}
                placeholder="e.g. Engineer"
              />
              <select
                value={h.seniority}
                onChange={(e) => setHire(i, 'seniority', e.target.value)}
                className={inputCls}
              >
                {SENIORITY_LEVELS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={h.count}
                onChange={(e) => setHire(i, 'count', e.target.value)}
                className={inputCls}
              />
              <span className="text-sm text-slate-400">
                {formatPercent(EQUITY_BENCHMARKS[stage][h.seniority] || 0, 3)}
              </span>
              <button
                onClick={() => removeHire(i)}
                className="rounded p-1 text-slate-500 hover:text-red-400 transition"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_80px_100px_40px] items-center">
          <span className="text-sm font-medium text-slate-300">Advisor Allocation</span>
          <span />
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="0.5"
              min={0}
              value={advisorPct}
              onChange={(e) => setAdvisorPct(e.target.value)}
              className={inputCls}
            />
          </div>
          <span className="text-sm text-slate-400">% total</span>
          <span />
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-surface-border bg-surface p-6">
        <h2 className="mb-2 text-lg font-semibold">Equity Benchmarks at {stage}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="px-3 py-2 text-left font-medium text-slate-400">Seniority</th>
                <th className="px-3 py-2 text-right font-medium text-slate-400">Equity / Hire</th>
              </tr>
            </thead>
            <tbody>
              {SENIORITY_LEVELS.map((s) => (
                <tr key={s} className="border-b border-surface-border last:border-0">
                  <td className="px-3 py-2 text-slate-200">{s}</td>
                  <td className="px-3 py-2 text-right text-slate-100">{formatPercent(EQUITY_BENCHMARKS[stage][s], 3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {analysis.recommended > 0 && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-surface-border bg-surface p-5">
              <p className="text-xs font-medium text-slate-400">Hiring Equity</p>
              <p className="mt-1 text-xl font-bold text-brand-light">{formatPercent(analysis.hiringTotal, 2)}</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface p-5">
              <p className="text-xs font-medium text-slate-400">Advisors</p>
              <p className="mt-1 text-xl font-bold text-amber-400">{formatPercent(analysis.advisor, 2)}</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface p-5">
              <p className="text-xs font-medium text-slate-400">Buffer (20%)</p>
              <p className="mt-1 text-xl font-bold text-slate-300">{formatPercent(analysis.buffer, 2)}</p>
            </div>
            <div className="rounded-xl border border-brand/40 bg-brand/5 p-5">
              <p className="text-xs font-medium text-slate-400">Recommended Pool</p>
              <p className="mt-1 text-xl font-bold text-brand-light">{formatPercent(analysis.recommended, 2)}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold">Pool Composition</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    labelLine={{ stroke: '#64748b' }}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    formatter={(v) => formatPercent(v, 3)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold">Industry Benchmark</h2>
              <div className="flex flex-col items-center justify-center h-[250px]">
                <p className="text-sm text-slate-400 mb-2">Typical pool at {stage}</p>
                <div className="relative w-full max-w-xs">
                  <div className="h-4 w-full rounded-full bg-surface-light" />
                  <div
                    className="absolute top-0 h-4 rounded-full bg-brand/30"
                    style={{
                      left: `${(analysis.benchmark.min / 25) * 100}%`,
                      width: `${((analysis.benchmark.max - analysis.benchmark.min) / 25) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute top-0 h-4 w-1 rounded bg-brand"
                    style={{ left: `${Math.min((analysis.recommended / 25) * 100, 100)}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between w-full max-w-xs text-xs text-slate-400">
                  <span>0%</span>
                  <span>25%</span>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-6 rounded bg-brand/30" />
                    <span className="text-slate-400">Benchmark: {analysis.benchmark.min}–{analysis.benchmark.max}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-1 rounded bg-brand" />
                    <span className="text-slate-300">Your pool: {formatPercent(analysis.recommended, 2)}</span>
                  </div>
                  {analysis.recommended < analysis.benchmark.min && (
                    <p className="text-amber-400 text-xs mt-2">Your pool is below the typical range. Consider increasing it.</p>
                  )}
                  {analysis.recommended > analysis.benchmark.max && (
                    <p className="text-emerald-400 text-xs mt-2">Your pool is above the typical range — generous!</p>
                  )}
                  {analysis.recommended >= analysis.benchmark.min && analysis.recommended <= analysis.benchmark.max && (
                    <p className="text-emerald-400 text-xs mt-2">Your pool is within the typical range.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-surface-border bg-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Role</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-400">Seniority</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-400">Count</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-400">Per Hire</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-400">Total</th>
                </tr>
              </thead>
              <tbody>
                {analysis.breakdown.map((b, i) => (
                  <tr key={i} className="border-b border-surface-border">
                    <td className="px-4 py-3 text-slate-200">{b.role}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{b.seniority}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{b.count}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{formatPercent(b.pctPerHire, 3)}</td>
                    <td className="px-4 py-3 text-right text-slate-100">{formatPercent(b.total, 3)}</td>
                  </tr>
                ))}
                <tr className="border-b border-surface-border">
                  <td className="px-4 py-3 text-slate-200">Advisors</td>
                  <td className="px-4 py-3 text-right text-slate-300">—</td>
                  <td className="px-4 py-3 text-right text-slate-300">—</td>
                  <td className="px-4 py-3 text-right text-slate-300">—</td>
                  <td className="px-4 py-3 text-right text-slate-100">{formatPercent(analysis.advisor, 2)}</td>
                </tr>
                <tr className="border-b border-surface-border bg-surface-light">
                  <td colSpan={4} className="px-4 py-3 font-medium text-slate-300">Subtotal</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-100">{formatPercent(analysis.subtotal, 2)}</td>
                </tr>
                <tr className="border-b border-surface-border">
                  <td colSpan={4} className="px-4 py-3 text-slate-300">+ 20% Buffer</td>
                  <td className="px-4 py-3 text-right text-slate-300">{formatPercent(analysis.buffer, 2)}</td>
                </tr>
                <tr className="bg-brand/5">
                  <td colSpan={4} className="px-4 py-3 font-bold text-brand-light">Recommended Pool</td>
                  <td className="px-4 py-3 text-right font-bold text-brand-light">{formatPercent(analysis.recommended, 2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
