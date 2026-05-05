import { Link, useNavigate } from "@tanstack/react-router";
// @ts-expect-error jsx module
import { useAuth } from "../rbac/AuthContext";
// @ts-expect-error jsx module
import { getNavFor, ROLE_PERMISSIONS } from "../rbac/roles";
import { Button } from "../components/ui/button";
import { useMemo } from "react";
import { 
  LayoutDashboard, 
  Shield, 
  Users, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Bell,
  Cpu,
  Globe
} from "lucide-react";

// Nav labels ko icons ke saath map karne ke liye helper
const ICON_MAP = {
  Dashboard: <LayoutDashboard size={18} />,
  Admin: <Shield size={18} />,
  Manager: <Users size={18} />,
  User: <UserIcon size={18} />,
  Profile: <UserIcon size={18} />,
};

export function AppLayout({ children }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const nav = useMemo(() => getNavFor(role), [role]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-foreground">
      {/* Inline Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes headerSlide {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes contentFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-header { animation: headerSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-content { animation: contentFade 0.6s ease-out; }
      `}} />

      {/* --- Sticky Navigation --- */}
      <header className="animate-header sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          
          <div className="flex items-center gap-10">
            {/* Logo Section */}
            <Link to="/" className="group flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white transition-transform group-hover:rotate-12">
                <Cpu size={20} />
              </div>
              <span className="text-lg font-black tracking-tighter transition-colors group-hover:text-indigo-600">
                CORE<span className="text-indigo-600">RBAC</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  activeProps={{
                    className: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-bold shadow-sm ring-1 ring-indigo-500/20",
                  }}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {ICON_MAP[item.label] || <Globe size={18} />}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Status Indicator (Extra Info) */}
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-white/5 lg:flex">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live</span>
                </div>

                <button className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />

                {/* User Dropdown Style */}
                <div className="flex items-center gap-3">
                  <div className="hidden text-right text-sm lg:block">
                    <div className="font-bold text-slate-900 dark:text-white leading-none">{user.name}</div>
                    <div className="mt-1 text-[10px] font-black uppercase tracking-tighter text-indigo-500">
                      {ROLE_PERMISSIONS[role]?.label}
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 font-bold text-white shadow-lg">
                    {user.name?.[0]}
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-5 ml-2"
                  >    LogOut
                    <LogOut size={18} />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button className="rounded-xl bg-indigo-600 px-6 font-bold text-white hover:bg-indigo-500">
                  Sign in
                </Button>
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="animate-content relative mx-auto max-w-7xl px-6 py-10">
        {/* Background Decorative Blur */}
        <div className="fixed top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />

        {children}
      </main>

      {/* --- Simple Footer Info --- */}
      <footer className="mt-auto border-t border-slate-200/60 py-6 dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div>© 2024 RBAC System v2.4</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-indigo-500 cursor-pointer">Privacy</span>
            <span className="hover:text-indigo-500 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}