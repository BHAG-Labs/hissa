import { useState, useMemo } from 'react';
import { formatINR, formatPercent } from '../lib/formatters';

const DEFAULT_COMPANY = {
  name: '',
  valuation: '',
  totalShares: '',
  exitValuation: '',
  esopsGranted: '',
  exercisePrice: '',
  vestingYears: 4,
  cliffMonths: 12,
};

function CompanyCard({ label, data, onChange }) {
  function set(field) {
    return (e) => onChange({ ...data, [field]: e.target.value });
  }

  const inputCls = 'w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand';

  return (
    <div className="rounded-xl border border-surface-border bg-surface p-6">
      <h3 className="mb-4 text-lg font-semibold text-brand-light">{label}</h3>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Company Name</label>
          <input type="text" value={data.name} onChange={set('name')} className={inputCls} placeholder="Acme Inc." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Current Valuation (₹)</label>
            <input type="number" value={data.valuation} onChange={set('valuation')} className={inputCls} placeholder="10,00,00,000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Total Shares</label>
            <input type="number" value={data.totalShares} onChange={set('totalShares')} className={inputCls} placeholder="10,00,000" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Expected Exit Valuation (₹)</label>
          <input type="number" value={data.exitValuation} onChange={set('exitValuation')} className={inputCls} placeholder="1,00,00,00,000" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">ESOPs Granted</label>
            <input type="number" value={data.esopsGranted} onChange={set('esopsGranted')} className={inputCls} placeholder="10,000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Exercise Price (₹)</label>
            <input type="number" value={data.exercisePrice} onChange={set('exercisePrice')} className={inputCls} placeholder="10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Vesting (years)</label>
            <select value={data.vestingYears} onChange={set('vestingYears')} className={inputCls}>
              <option value={3}>3 years</option>
              <option value={4}>4 years</option>
              <option value={5}>5 years</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Cliff (months)</label>
            <select value={data.cliffMonths} onChange={set('cliffMonths')} className={inputCls}>
              <option value={0}>None</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
              <option value={18}>18 months</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function computeMetrics(d) {
  const valuation = Number(d.valuation) || 0;
  const totalShares = Number(d.totalShares) || 1;
  const exitValuation = Number(d.exitValuation) || 0;
  const esops = Number(d.esopsGranted) || 0;
  const exercisePrice = Number(d.exercisePrice) || 0;

  const pricePerShare = valuation / totalShares;
  const ownership = (esops / totalShares) * 100;
  const intrinsicValue = esops * pricePerShare;
  const costToExercise = esops * exercisePrice;
  const exitPricePerShare = exitValuation / totalShares;
  const valueAtExit = esops * exitPricePerShare;
  const netPayout = valueAtExit - costToExercise;

  return { pricePerShare, ownership, intrinsicValue, costToExercise, exitPricePerShare, valueAtExit, netPayout };
}

export default function EsopValue() {
  const [companyA, setCompanyA] = useState({ ...DEFAULT_COMPANY, name: 'Company A' });
  const [companyB, setCompanyB] = useState({ ...DEFAULT_COMPANY, name: 'Company B' });

  const metricsA = useMemo(() => computeMetrics(companyA), [companyA]);
  const metricsB = useMemo(() => computeMetrics(companyB), [companyB]);

  const vestingYearsA = Number(companyA.vestingYears);
  const cliffMonthsA = Number(companyA.cliffMonths);
  const vestingYearsB = Number(companyB.vestingYears);
  const cliffMonthsB = Number(companyB.cliffMonths);

  function vestingSchedule(esops, years, cliffMonths) {
    const schedule = [];
    const totalMonths = years * 12;
    for (let m = 1; m <= totalMonths; m++) {
      if (m < cliffMonths) {
        schedule.push({ month: m, vested: 0 });
      } else if (m === cliffMonths) {
        schedule.push({ month: m, vested: Math.floor((esops * cliffMonths) / totalMonths) });
      } else {
        schedule.push({ month: m, vested: Math.floor((esops * m) / totalMonths) });
      }
    }
    return schedule;
  }

  const scheduleA = vestingSchedule(Number(companyA.esopsGranted) || 0, vestingYearsA, cliffMonthsA);
  const scheduleB = vestingSchedule(Number(companyB.esopsGranted) || 0, vestingYearsB, cliffMonthsB);

  const hasData = (Number(companyA.valuation) > 0 || Number(companyB.valuation) > 0);

  const rows = [
    { label: 'Price / Share', a: formatINR(metricsA.pricePerShare), b: formatINR(metricsB.pricePerShare) },
    { label: 'Ownership %', a: formatPercent(metricsA.ownership), b: formatPercent(metricsB.ownership) },
    { label: 'Intrinsic Value', a: formatINR(metricsA.intrinsicValue), b: formatINR(metricsB.intrinsicValue) },
    { label: 'Cost to Exercise', a: formatINR(metricsA.costToExercise), b: formatINR(metricsB.costToExercise) },
    { label: 'Value at Exit', a: formatINR(metricsA.valueAtExit), b: formatINR(metricsB.valueAtExit) },
    { label: 'Net Payout', a: formatINR(metricsA.netPayout), b: formatINR(metricsB.netPayout), highlight: true },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">ESOP Value Calculator</h1>
      <p className="mb-6 text-slate-400">Compare two company offers side-by-side</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <CompanyCard label={companyA.name || 'Company A'} data={companyA} onChange={setCompanyA} />
        <CompanyCard label={companyB.name || 'Company B'} data={companyB} onChange={setCompanyB} />
      </div>

      {hasData && (
        <>
          <div className="mt-8 rounded-xl border border-surface-border bg-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="px-6 py-3 text-left font-medium text-slate-400">Metric</th>
                  <th className="px-6 py-3 text-right font-medium text-brand-light">{companyA.name || 'Company A'}</th>
                  <th className="px-6 py-3 text-right font-medium text-brand-light">{companyB.name || 'Company B'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className={`border-b border-surface-border last:border-0 ${r.highlight ? 'bg-brand/5' : ''}`}>
                    <td className="px-6 py-3 font-medium text-slate-300">{r.label}</td>
                    <td className={`px-6 py-3 text-right ${r.highlight ? 'font-bold text-brand-light' : 'text-slate-100'}`}>{r.a}</td>
                    <td className={`px-6 py-3 text-right ${r.highlight ? 'font-bold text-brand-light' : 'text-slate-100'}`}>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Vesting Timeline</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { schedule: scheduleA, name: companyA.name || 'Company A', years: vestingYearsA },
                { schedule: scheduleB, name: companyB.name || 'Company B', years: vestingYearsB },
              ].map(({ schedule, name, years }) => {
                const maxVested = Math.max(...schedule.map((s) => s.vested), 1);
                const yearMarkers = Array.from({ length: years }, (_, i) => (i + 1) * 12);
                return (
                  <div key={name} className="rounded-xl border border-surface-border bg-surface p-6">
                    <h3 className="mb-4 text-sm font-semibold text-brand-light">{name}</h3>
                    <div className="space-y-1">
                      {yearMarkers.map((m) => {
                        const entry = schedule.find((s) => s.month === m);
                        const pct = entry ? (entry.vested / maxVested) * 100 : 0;
                        return (
                          <div key={m} className="flex items-center gap-3">
                            <span className="w-16 text-xs text-slate-400">Year {m / 12}</span>
                            <div className="flex-1 h-6 rounded-md bg-surface-light overflow-hidden">
                              <div
                                className="h-full rounded-md bg-brand transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-20 text-right text-xs text-slate-300">
                              {entry?.vested?.toLocaleString('en-IN') || 0} shares
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
