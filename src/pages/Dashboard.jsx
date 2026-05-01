import { Link } from 'react-router';

const tools = [
  {
    to: '/esop-value',
    title: 'ESOP Value Calculator',
    category: 'Compare Offers',
    description: 'Compare two company offers side-by-side — see the real value of your ESOPs at exit.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    to: '/co-founder-split',
    title: 'Co-Founder Split',
    category: 'Equity Allocation',
    description: 'Fair equity split among co-founders based on weighted contributions and roles.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    to: '/dilution-sim',
    title: 'Dilution Simulator',
    category: 'Cap Table',
    description: 'Visualize how your equity gets diluted across seed, Series A, B and beyond.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    to: '/esop-tax',
    title: 'ESOP Tax Calculator',
    category: 'India-specific',
    description: 'Compute perquisite tax and capital gains on your ESOPs as per Indian tax rules.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    to: '/esop-pool',
    title: 'ESOP Pool Planner',
    category: 'Hiring Roadmap',
    description: 'Right-size your ESOP pool based on hiring plan and stage of company.',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  return (
    <div className="paper-texture">
      {/* Hero */}
      <section className="relative pt-8 pb-16 text-center">
        <div className="diamond-divider text-charcoal/40 max-w-[80px] mx-auto mb-8">
          <span className="text-xs select-none">&#9670;</span>
        </div>
        <p className="section-label mb-6">Startup Equity, Demystified</p>
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-forest mb-6">
          Free Equity Tools<br />
          for <span className="text-terracotta">Indian Founders.</span>
        </h1>
        <p className="font-body text-base md:text-lg text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
          ESOP valuation, co-founder splits, dilution simulation, India-specific ESOP tax,
          and pool planning. Client-side. All numbers in ₹. No login required.
        </p>
        <div className="mt-12 max-w-xs mx-auto diamond-divider text-charcoal/40">
          <span className="text-sm select-none">&#9670;</span>
        </div>
      </section>

      {/* Tools grid */}
      <section className="relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-2">Five Calculators</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-charcoal">
              Choose a tool
            </h2>
          </div>
          <hr className="rule-charcoal flex-1 ml-8 mb-3 hidden md:block" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="editorial-card p-7 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-terracotta">{tool.icon}</span>
                <span className="badge-live">Live</span>
              </div>
              <span className="section-label mb-2">{tool.category}</span>
              <h3 className="font-heading font-bold text-2xl text-charcoal mb-3 leading-tight">
                {tool.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
                {tool.description}
              </p>
              <span className="mt-5 text-xs uppercase tracking-[0.15em] font-semibold text-terracotta group-hover:text-charcoal transition-colors">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
