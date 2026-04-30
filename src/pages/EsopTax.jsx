import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { formatINR } from '../lib/formatters';
import { calculatePerquisiteTax, calculateCapitalGainsTax, calculateIncomeTax } from '../lib/indianTax';

export default function EsopTax() {
  const [esops, setEsops] = useState('');
  const [exercisePrice, setExercisePrice] = useState('');
  const [fmv, setFmv] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [salary, setSalary] = useState('');
  const [regime, setRegime] = useState('new');
  const [companyType, setCompanyType] = useState('unlisted');
  const [holdingMonths, setHoldingMonths] = useState('');

  const results = useMemo(() => {
    const n = Number(esops) || 0;
    const ep = Number(exercisePrice) || 0;
    const f = Number(fmv) || 0;
    const sp = Number(salePrice) || 0;
    const sal = Number(salary) || 0;
    const hm = Number(holdingMonths) || 0;

    if (n === 0) return null;

    const perquisiteValue = Math.max(0, (f - ep) * n);
    const exerciseCost = ep * n;
    const grossValue = sp * n;
    const capitalGain = (sp - f) * n;

    const perqTaxNew = calculatePerquisiteTax(sal, perquisiteValue, 'new');
    const perqTaxOld = calculatePerquisiteTax(sal, perquisiteValue, 'old');

    const cgNew = calculateCapitalGainsTax(companyType, hm, Math.max(0, capitalGain), sal + perquisiteValue, 'new');
    const cgOld = calculateCapitalGainsTax(companyType, hm, Math.max(0, capitalGain), sal + perquisiteValue, 'old');

    const totalTaxNew = perqTaxNew + cgNew.tax;
    const totalTaxOld = perqTaxOld + cgOld.tax;

    const netNew = grossValue - exerciseCost - totalTaxNew;
    const netOld = grossValue - exerciseCost - totalTaxOld;

    return {
      perquisiteValue,
      exerciseCost,
      grossValue,
      capitalGain,
      new: { perqTax: perqTaxNew, cgTax: cgNew.tax, cgType: cgNew.type, totalTax: totalTaxNew, net: netNew },
      old: { perqTax: perqTaxOld, cgTax: cgOld.tax, cgType: cgOld.type, totalTax: totalTaxOld, net: netOld },
    };
  }, [esops, exercisePrice, fmv, salePrice, salary, regime, companyType, holdingMonths]);

  const chosen = results ? results[regime] : null;

  const waterfallData = results
    ? [
        { name: 'Gross Value', value: results.grossValue, color: '#6366f1' },
        { name: 'Exercise Cost', value: -results.exerciseCost, color: '#ef4444' },
        { name: 'Perquisite Tax', value: -chosen.perqTax, color: '#f59e0b' },
        { name: 'CG Tax', value: -chosen.cgTax, color: '#f97316' },
        { name: 'Net In Hand', value: chosen.net, color: '#10b981' },
      ]
    : [];

  const inputCls = 'w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand';

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">ESOP Tax Calculator</h1>
      <p className="mb-6 text-slate-400">Calculate perquisite tax and capital gains on your ESOPs</p>

      <div className="mb-8 rounded-xl border border-surface-border bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">ESOPs Exercised</label>
            <input type="number" value={esops} onChange={(e) => setEsops(e.target.value)} className={inputCls} placeholder="10,000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Exercise Price (₹)</label>
            <input type="number" value={exercisePrice} onChange={(e) => setExercisePrice(e.target.value)} className={inputCls} placeholder="10" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">FMV at Exercise (₹)</label>
            <input type="number" value={fmv} onChange={(e) => setFmv(e.target.value)} className={inputCls} placeholder="500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Sale Price per Share (₹)</label>
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className={inputCls} placeholder="1000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Annual Salary (₹)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className={inputCls} placeholder="15,00,000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Holding Period (months)</label>
            <input type="number" value={holdingMonths} onChange={(e) => setHoldingMonths(e.target.value)} className={inputCls} placeholder="24" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Tax Regime</label>
            <select value={regime} onChange={(e) => setRegime(e.target.value)} className={inputCls}>
              <option value="new">New Regime (FY 2025-26)</option>
              <option value="old">Old Regime</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Company Type</label>
            <select value={companyType} onChange={(e) => setCompanyType(e.target.value)} className={inputCls}>
              <option value="listed">Listed</option>
              <option value="startup">Eligible Startup (Sec 80-IAC)</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </div>
        </div>
      </div>

      {results && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Gross Value', value: results.grossValue, color: 'text-brand-light' },
              { label: 'Exercise Cost', value: results.exerciseCost, color: 'text-red-400' },
              { label: `Total Tax (${regime === 'new' ? 'New' : 'Old'})`, value: chosen.totalTax, color: 'text-amber-400' },
              { label: 'Net In Hand', value: chosen.net, color: 'text-emerald-400' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-surface-border bg-surface p-5">
                <p className="text-xs font-medium text-slate-400">{item.label}</p>
                <p className={`mt-1 text-xl font-bold ${item.color}`}>{formatINR(item.value)}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold">Tax Waterfall</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={waterfallData}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => formatINR(Math.abs(v))} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    formatter={(v) => formatINR(Math.abs(v))}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey="value">
                    {waterfallData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <h2 className="mb-4 text-lg font-semibold">Tax Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <span className="text-sm text-slate-400">Perquisite Value</span>
                  <span className="text-sm font-medium text-slate-100">{formatINR(results.perquisiteValue)}</span>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <span className="text-sm text-slate-400">Perquisite Tax ({regime === 'new' ? 'New' : 'Old'})</span>
                  <span className="text-sm font-medium text-amber-400">{formatINR(chosen.perqTax)}</span>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <span className="text-sm text-slate-400">Capital Gain</span>
                  <span className="text-sm font-medium text-slate-100">{formatINR(results.capitalGain)}</span>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <span className="text-sm text-slate-400">CG Type</span>
                  <span className="text-sm font-medium text-slate-100">{chosen.cgType}</span>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2">
                  <span className="text-sm text-slate-400">CG Tax</span>
                  <span className="text-sm font-medium text-amber-400">{formatINR(chosen.cgTax)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-semibold text-slate-200">Total Tax</span>
                  <span className="text-sm font-bold text-amber-400">{formatINR(chosen.totalTax)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface p-6">
            <h2 className="mb-4 text-lg font-semibold">Regime Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Component</th>
                    <th className="px-4 py-3 text-right font-medium text-brand-light">New Regime</th>
                    <th className="px-4 py-3 text-right font-medium text-brand-light">Old Regime</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Perquisite Tax', a: results.new.perqTax, b: results.old.perqTax },
                    { label: 'Capital Gains Tax', a: results.new.cgTax, b: results.old.cgTax },
                    { label: 'Total Tax', a: results.new.totalTax, b: results.old.totalTax },
                    { label: 'Net In Hand', a: results.new.net, b: results.old.net, highlight: true },
                  ].map((row) => (
                    <tr key={row.label} className={`border-b border-surface-border last:border-0 ${row.highlight ? 'bg-brand/5' : ''}`}>
                      <td className="px-4 py-3 font-medium text-slate-300">{row.label}</td>
                      <td className={`px-4 py-3 text-right ${row.highlight ? 'font-bold text-emerald-400' : 'text-slate-100'}`}>
                        {formatINR(row.a)}
                      </td>
                      <td className={`px-4 py-3 text-right ${row.highlight ? 'font-bold text-emerald-400' : 'text-slate-100'}`}>
                        {formatINR(row.b)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {results.new.net !== results.old.net && (
              <p className="mt-4 text-sm text-slate-400">
                {results.new.net > results.old.net
                  ? `New regime saves you ${formatINR(results.new.net - results.old.net)}`
                  : `Old regime saves you ${formatINR(results.old.net - results.new.net)}`}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
