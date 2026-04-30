import { useState, useMemo } from 'react';
import { formatPercent } from '../lib/formatters';

const QUESTIONS = [
  { id: 'idea', text: 'Who came up with the original idea?', weight: 8 },
  { id: 'ceo', text: 'Who is serving as CEO?', weight: 10 },
  { id: 'tech', text: 'Who is leading technology / product development?', weight: 10 },
  { id: 'domain', text: 'Who brings the most domain expertise?', weight: 8 },
  { id: 'fulltime', text: 'Who is working full-time from day one?', weight: 12 },
  { id: 'experience', text: 'Who has the most startup experience?', weight: 7 },
  { id: 'customers', text: 'Who is bringing the first customers / revenue?', weight: 10 },
  { id: 'longest', text: 'Who has been working on this the longest?', weight: 8 },
  { id: 'relationships', text: 'Who brings key industry relationships?', weight: 7 },
  { id: 'investment', text: 'Who is making the largest financial investment?', weight: 12 },
  { id: 'opportunity', text: 'Who has the highest opportunity cost?', weight: 8 },
];

const RESPONSE_OPTIONS = [
  { label: 'Not at all', value: 0 },
  { label: 'Somewhat', value: 1 },
  { label: 'Significantly', value: 2 },
  { label: 'Primarily', value: 3 },
];

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];

export default function CoFounderSplit() {
  const [founderCount, setFounderCount] = useState(2);
  const [founderNames, setFounderNames] = useState(['Founder 1', 'Founder 2', 'Founder 3', 'Founder 4']);
  const [answers, setAnswers] = useState(() => {
    const init = {};
    QUESTIONS.forEach((q) => {
      init[q.id] = [0, 0, 0, 0];
    });
    return init;
  });

  function setAnswer(qId, fIdx, value) {
    setAnswers((prev) => {
      const updated = { ...prev };
      updated[qId] = [...updated[qId]];
      updated[qId][fIdx] = Number(value);
      return updated;
    });
  }

  function setName(idx, name) {
    setFounderNames((prev) => {
      const next = [...prev];
      next[idx] = name;
      return next;
    });
  }

  const results = useMemo(() => {
    const scores = Array(founderCount).fill(0);
    QUESTIONS.forEach((q) => {
      for (let i = 0; i < founderCount; i++) {
        scores[i] += answers[q.id][i] * q.weight;
      }
    });

    const totalScore = scores.reduce((a, b) => a + b, 0) || 1;
    let rawPcts = scores.map((s) => (s / totalScore) * 100);

    const FLOOR = 10;
    const belowFloor = rawPcts.filter((p) => p < FLOOR && p > 0);
    if (belowFloor.length > 0) {
      let deficit = 0;
      rawPcts = rawPcts.map((p) => {
        if (p > 0 && p < FLOOR) {
          deficit += FLOOR - p;
          return FLOOR;
        }
        return p;
      });
      const aboveFloorTotal = rawPcts.filter((p) => p > FLOOR).reduce((a, b) => a + b, 0);
      if (aboveFloorTotal > 0) {
        rawPcts = rawPcts.map((p) => (p > FLOOR ? p - (deficit * p) / aboveFloorTotal : p));
      }
    }

    rawPcts = rawPcts.map((p) => Math.round(p * 2) / 2);
    const sum = rawPcts.reduce((a, b) => a + b, 0);
    if (sum !== 100 && rawPcts.some((p) => p > 0)) {
      const maxIdx = rawPcts.indexOf(Math.max(...rawPcts));
      rawPcts[maxIdx] += 100 - sum;
    }

    return rawPcts.map((pct, i) => ({ name: founderNames[i], pct, score: scores[i] }));
  }, [answers, founderCount, founderNames]);

  const hasAnswers = results.some((r) => r.score > 0);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Co-Founder Equity Split</h1>
      <p className="mb-6 text-slate-400">Answer questions to calculate a fair split based on contributions</p>

      <div className="mb-6 rounded-xl border border-surface-border bg-surface p-6">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-300">Number of Co-Founders</label>
          <div className="flex gap-2">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setFounderCount(n)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  founderCount === n
                    ? 'bg-brand text-white'
                    : 'border border-surface-border bg-surface-light text-slate-300 hover:border-brand/40'
                }`}
              >
                {n} Founders
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${founderCount}, 1fr)` }}>
          {Array.from({ length: founderCount }, (_, i) => (
            <div key={i}>
              <label className="mb-1 block text-xs font-medium text-slate-400">Name</label>
              <input
                type="text"
                value={founderNames[i]}
                onChange={(e) => setName(i, e.target.value)}
                className="w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="rounded-xl border border-surface-border bg-surface p-6">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-medium text-slate-200">{q.text}</p>
              <span className="text-xs text-slate-500">Weight: {q.weight}</span>
            </div>
            <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${founderCount}, 1fr)` }}>
              {Array.from({ length: founderCount }, (_, i) => (
                <div key={i}>
                  <label className="mb-1 block text-xs text-slate-400">{founderNames[i]}</label>
                  <select
                    value={answers[q.id][i]}
                    onChange={(e) => setAnswer(q.id, i, e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-light px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand"
                  >
                    {RESPONSE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasAnswers && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Results</h2>

          <div className="mb-6 rounded-xl border border-surface-border bg-surface p-6">
            <p className="mb-3 text-sm font-medium text-slate-400">Equity Distribution</p>
            <div className="flex h-12 overflow-hidden rounded-lg">
              {results.slice(0, founderCount).map((r, i) => (
                r.pct > 0 && (
                  <div
                    key={i}
                    className="flex items-center justify-center text-xs font-bold text-white transition-all"
                    style={{ width: `${r.pct}%`, backgroundColor: COLORS[i] }}
                  >
                    {r.pct >= 5 && formatPercent(r.pct, 1)}
                  </div>
                )
              ))}
            </div>
            <div className="mt-3 flex gap-4">
              {results.slice(0, founderCount).map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-300">{r.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(founderCount, 4)}, 1fr)` }}>
            {results.slice(0, founderCount).map((r, i) => (
              <div key={i} className="rounded-xl border border-surface-border bg-surface p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: COLORS[i] + '20', color: COLORS[i] }}>
                  <span className="text-lg font-bold">{r.name[0]}</span>
                </div>
                <h3 className="font-semibold text-slate-100">{r.name}</h3>
                <p className="mt-1 text-2xl font-bold" style={{ color: COLORS[i] }}>
                  {formatPercent(r.pct, 1)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Score: {r.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
