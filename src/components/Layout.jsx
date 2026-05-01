import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import Footer from './Footer';

const tools = [
  { to: '/esop-value', label: 'ESOP Value' },
  { to: '/co-founder-split', label: 'Co-Founder Split' },
  { to: '/dilution-sim', label: 'Dilution Sim' },
  { to: '/esop-tax', label: 'ESOP Tax' },
  { to: '/esop-pool', label: 'ESOP Pool' },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkBase = 'px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors';
  const linkCls = ({ isActive }) =>
    `${linkBase} ${isActive ? 'text-terracotta border-b-2 border-terracotta' : 'text-charcoal/70 hover:text-charcoal'}`;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <nav className="sticky top-0 z-40 glass-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex flex-col leading-none">
                <span className="font-heading font-bold text-xl text-charcoal tracking-tight">Hissa</span>
                <span className="text-[10px] text-charcoal/50 font-subheading">by BHAG Labs</span>
              </Link>
              <div className="hidden lg:flex items-center gap-1">
                <NavLink to="/" end className={linkCls}>Dashboard</NavLink>
                {tools.map((t) => (
                  <NavLink key={t.to} to={t.to} className={linkCls}>{t.label}</NavLink>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="https://bhaglabs.com" className="text-xs uppercase tracking-[0.15em] text-charcoal/70 hover:text-charcoal transition-colors">
                BHAG Labs ↗
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t-2 border-charcoal bg-cream px-4 pb-4 pt-2 space-y-1">
            <NavLink to="/" end onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-wider text-charcoal/80 hover:bg-cream-dark">Dashboard</NavLink>
            {tools.map((t) => (
              <NavLink key={t.to} to={t.to} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm uppercase tracking-wider text-charcoal/80 hover:bg-cream-dark">{t.label}</NavLink>
            ))}
            <a href="https://bhaglabs.com" className="block px-3 py-2 text-sm uppercase tracking-wider text-charcoal/80 hover:bg-cream-dark">BHAG Labs ↗</a>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
