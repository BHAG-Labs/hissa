import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

const tools = [
  {
    to: '/esop-value',
    title: 'ESOP Value Calculator',
    description: 'Compare two company offers side-by-side — see the real value of your ESOPs.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    to: '/co-founder-split',
    title: 'Co-Founder Split',
    description: 'Fair equity split among co-founders based on weighted contributions.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    to: '/dilution-sim',
    title: 'Dilution Simulator',
    description: 'Visualize how your equity gets diluted across funding rounds.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    to: '/esop-tax',
    title: 'ESOP Tax Calculator',
    description: 'Calculate perquisite tax and capital gains on your ESOPs (India-specific).',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    to: '/esop-pool',
    title: 'ESOP Pool Planner',
    description: 'Plan your ESOP pool size based on hiring roadmap and stage.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="mt-1 text-slate-400">Choose a tool to get started</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group rounded-xl border border-surface-border bg-surface p-6 transition hover:border-brand/40 hover:bg-surface-light"
          >
            <div className="mb-4 text-brand group-hover:text-brand-light transition">
              {tool.icon}
            </div>
            <h2 className="text-lg font-semibold text-slate-100 group-hover:text-white">
              {tool.title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
