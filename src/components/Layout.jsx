import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const tools = [
  { to: '/esop-value', label: 'ESOP Value' },
  { to: '/co-founder-split', label: 'Co-Founder Split' },
  { to: '/dilution-sim', label: 'Dilution Sim' },
  { to: '/esop-tax', label: 'ESOP Tax' },
  { to: '/esop-pool', label: 'ESOP Pool' },
];

export default function Layout() {
  const { signOut, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-surface-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xl font-bold text-brand">
                Hissa
              </Link>
              <div className="hidden lg:flex items-center gap-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-brand/10 text-brand-light' : 'text-slate-400 hover:text-slate-200'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                {tools.map((t) => (
                  <NavLink
                    key={t.to}
                    to={t.to}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-brand/10 text-brand-light' : 'text-slate-400 hover:text-slate-200'
                      }`
                    }
                  >
                    {t.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hidden sm:block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-brand/10 text-brand-light' : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {profile?.full_name || 'Profile'}
              </NavLink>
              <button
                onClick={signOut}
                className="hidden sm:block rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 transition"
              >
                Sign Out
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden rounded-lg p-2 text-slate-400 hover:text-slate-200"
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
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-surface-border px-4 pb-4 pt-2 space-y-1">
            <NavLink to="/" end onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface-light">Dashboard</NavLink>
            {tools.map((t) => (
              <NavLink key={t.to} to={t.to} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface-light">{t.label}</NavLink>
            ))}
            <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface-light">Profile</NavLink>
            <button onClick={() => { signOut(); setMenuOpen(false); }} className="block w-full text-left rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-surface-light">Sign Out</button>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
