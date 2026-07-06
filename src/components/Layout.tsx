import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Trophy, Users, Map as MapIcon, Activity, Leaf, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Trophy },
  { name: 'AI Fan Assistant', path: '/assistant', icon: Globe },
  { name: 'Navigation', path: '/navigation', icon: MapIcon },
  { name: 'Crowd Intelligence', path: '/crowd', icon: Activity },
  { name: 'Sustainability', path: '/sustainability', icon: Leaf },
  { name: 'Command Center', path: '/command', icon: ShieldAlert },
  { name: 'Staff Portal', path: '/staff', icon: Users },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center shrink-0 border border-rose-500/30">
                <Trophy className="w-5 h-5 text-rose-100" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                WorldCup AI Command
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                      isActive 
                        ? "bg-white/10 text-white" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors",
                        isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            &copy; 2026 WorldCup AI Command Center. AI Studio Demo.
          </p>
        </div>
      </footer>
    </div>
  );
}
