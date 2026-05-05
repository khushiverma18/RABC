import { createFileRoute, Link } from "@tanstack/react-router";
// @ts-expect-error jsx
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx
import { RoleGuard, Show } from "../rbac/RoleGuard";
// @ts-expect-error jsx
import { useAuth } from "../rbac/AuthContext";
import { 
  ShieldAlert, 
  Users, 
  User as UserIcon, 
  Activity, 
  Key, 
  Calendar, 
  ArrowRight,
  LayoutDashboard,
  Zap
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <RoleGuard path="/dashboard">
      <Dashboard />
    </RoleGuard>
  ),
});

// Role styling map
const ROLE_CONFIG = {
  admin: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20",
    icon: <ShieldAlert size={16} />,
    glow: "shadow-red-500/20"
  },
  manager: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    icon: <Users size={16} />,
    glow: "shadow-blue-500/20"
  },
  user: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    icon: <UserIcon size={16} />,
    glow: "shadow-emerald-500/20"
  },
};

function Dashboard() {
  const { user, role } = useAuth();
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.user;

  const stats = [
    { label: "Active sessions", value: "1", icon: <Activity size={18} />, color: "text-blue-500" },
    { 
      label: "Permissions", 
      value: role === "admin" ? "Full Access" : role === "manager" ? "Elevated" : "Standard",
      icon: <Key size={18} />, 
      color: "text-amber-500" 
    },
    { label: "Last login", value: "Today", icon: <Calendar size={18} />, color: "text-emerald-500" },
  ];

  return (
    <AppLayout>
      {/* Dynamic Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-dash { opacity: 0; animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .floating-sticker { animation: float 3s ease-in-out infinite; }
      `}} />

      <div className="relative space-y-10 pb-10">
        
        {/* --- Header Section --- */}
        <header className="animate-dash flex flex-wrap items-center justify-between gap-6" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
              <LayoutDashboard size={30} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
              <p className="text-slate-500 font-medium">Welcome back, <span className="text-indigo-600 dark:text-indigo-400 font-bold">{user?.name}</span></p>
            </div>
          </div>

          <div className={`flex items-center gap-2 rounded-2xl border ${config.border} ${config.bg} ${config.text} px-5 py-2.5 font-black text-xs tracking-widest shadow-lg ${config.glow}`}>
            {config.icon}
            {role?.toUpperCase()}
          </div>
        </header>

        {/* --- Stats Row --- */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{ animationDelay: `${200 + (i * 100)}ms` }}
              className="animate-dash group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:shadow-xl dark:border-white/5 dark:bg-slate-900"
            >
              <div className={`mb-4 inline-flex rounded-xl p-2 bg-slate-50 dark:bg-white/5 ${s.color}`}>
                {s.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</div>
              <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
              
              {/* Abstract decoration */}
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-slate-50 dark:bg-white/5 transition-transform group-hover:scale-150" />
            </div>
          ))}
        </div>

        {/* --- Accessible Sections (Launchpad) --- */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accessible Apps</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Show when={["admin"]}>
              <AppCard
                to="/admin"
                title="System Admin"
                desc="Manage servers, users, and global policies."
                icon={<ShieldAlert size={28} />}
                theme="from-red-500 to-rose-600"
                delay="400ms"
              />
            </Show>

            <Show when={["admin", "manager"]}>
              <AppCard
                to="/manager"
                title="Team Hub"
                desc="Analyze performance and approve requests."
                icon={<Users size={28} />}
                theme="from-blue-500 to-indigo-600"
                delay="500ms"
              />
            </Show>

            <Show when={["admin", "manager", "user"]}>
              <AppCard
                to="/user"
                title="My Workspace"
                desc="Your personal tasks, profile, and settings."
                icon={<UserIcon size={28} />}
                theme="from-emerald-500 to-teal-600"
                delay="600ms"
              />
            </Show>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function AppCard({ to, title, desc, icon, theme, delay }) {
  return (
    <Link
      to={to}
      style={{ animationDelay: delay }}
      className="animate-dash group relative h-full rounded-[2.5rem] border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-white/5 dark:bg-slate-900"
    >
      {/* Floating Sticker Effect */}
      <div className={`floating-sticker mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${theme} text-white shadow-lg`}>
        {icon}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {desc}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2">
        Launch App <ArrowRight size={16} />
      </div>

      {/* Background Decorative Sticker */}
      <div className={`absolute bottom-4 right-6 text-6xl opacity-[0.03] transition-all group-hover:opacity-10 group-hover:rotate-12`}>
        {icon}
      </div>
    </Link>
  );
}