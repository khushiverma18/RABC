import { createFileRoute, Link } from "@tanstack/react-router";
// @ts-expect-error jsx module
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx module
import { useAuth } from "../rbac/AuthContext";
import { 
  ShieldCheck, 
  Users, 
  User as UserIcon, 
  Lock, 
  Eye, 
  Zap, 
  Cpu, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const ROLES_INFO = [
  {
    name: "Admin",
    icon: <ShieldCheck className="text-red-400" size={24} />,
    color: "from-red-500/20 to-orange-500/10",
    border: "border-red-500/20",
    desc: "Full access to every page, user management, audit logs, and system configuration.",
    perks: ["Manage users & roles", "Audit logs", "System settings"],
    creds: "admin / admin",
  },
  {
    name: "Manager",
    icon: <Users className="text-blue-400" size={24} />,
    color: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/20",
    desc: "Manager tools, team reports, and personal user area.",
    perks: ["Team reports", "Approve requests", "Project assignments"],
    creds: "manager / manager",
  },
  {
    name: "User",
    icon: <UserIcon className="text-emerald-400" size={24} />,
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    desc: "Personal workspace — profile, tasks and notifications.",
    perks: ["My profile", "My tasks", "Notifications"],
    creds: "user / user",
  },
];

function Index() {
  const { user } = useAuth();

  return (
    <AppLayout>
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
      `}} />

      <div className="space-y-20 pb-20">
        
        {/* --- Hero Section --- */}
        <section className="animate-reveal relative overflow-hidden rounded-[2.5rem] bg-[#0f172a] px-6 py-20 text-center shadow-2xl">
          {/* Background Blobs */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              v2.0 RBAC Architecture
            </span>
            
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Advanced <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Access Control</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-slate-400">
              A professional-grade starter for React apps requiring robust permission layers. 
              Switch roles instantly to see the UI adapt in real-time.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
            
                <Link
                  to="/login"
                  search={{ redirect: "/dashboard" }}
                  className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ChevronRight size={18} />
                </Link>
            
              <a
                href="#roles"
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                View Roles
              </a>
            </div>
          </div>
        </section>

        {/* --- Roles Section --- */}
        <section id="roles" className="scroll-mt-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Experience Different Perspectives</h2>
            <p className="mt-2 text-slate-500">Log in with these credentials to test the permission engine.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES_INFO.map((r, i) => (
              <div
                key={r.name}
                style={{ animationDelay: `${i * 150}ms` }}
                className="animate-reveal group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/5 dark:bg-slate-900"
              >
                {/* Role Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`rounded-2xl bg-gradient-to-br ${r.color} p-3`}>
                    {r.icon}
                  </div>
                  <code className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-400">
                    {r.creds}
                  </code>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{r.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {r.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {r.perks.map((p) => (
                    <div key={p} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {p}
                    </div>
                  ))}
                </div>

                {/* Bottom decorative line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${r.color} transition-all duration-500 group-hover:w-full`} />
              </div>
            ))}
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {[
    { 
      t: "Route Guarding", 
      d: "Automatic redirection for unauthorized paths.", 
      icon: <Lock size={24} />, 
      color: "border-orange-500/50", 
      bg: "bg-orange-500/5", 
      text: "text-orange-500",
      glow: "group-hover:shadow-orange-500/20"
    },
    { 
      t: "UI Masking", 
      d: "Hide buttons or tabs based on user permissions.", 
      icon: <Eye size={24} />, 
      color: "border-blue-500/50", 
      bg: "bg-blue-500/5", 
      text: "text-blue-500",
      glow: "group-hover:shadow-blue-500/20"
    },
    { 
      t: "Global State", 
      d: "Powered by Context API for zero-latency auth.", 
      icon: <Zap size={24} />, 
      color: "border-yellow-500/50", 
      bg: "bg-yellow-500/5", 
      text: "text-yellow-500",
      glow: "group-hover:shadow-yellow-500/20"
    },
    { 
      t: "Fast Loading", 
      d: "Pre-rendering ensures no layout shifts.", 
      icon: <Cpu size={24} />, 
      color: "border-purple-500/50", 
      bg: "bg-purple-500/5", 
      text: "text-purple-500",
      glow: "group-hover:shadow-purple-500/20"
    },
  ].map((f, i) => (
    <div 
      key={f.t} 
      style={{ animationDelay: `${600 + (i * 100)}ms` }}
      className={`animate-reveal group relative flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${f.glow} dark:border-white/10 dark:bg-slate-900`}
    >
      {/* 1. Card Background Accent (Glow on Hover) */}
      <div className={`absolute inset-0 -z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${f.bg}`} />
      
      {/* 2. Floating Icon Container */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg] dark:bg-white/5 ${f.text}`}>
        {f.icon}
      </div>

      {/* 3. Text Content */}
      <div className="space-y-2">
        <div className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
          {f.t}
        </div>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {f.d}
        </p>
      </div>

      {/* 4. Bottom Decorative Bar */}
      <div className={`mt-auto h-1 w-0 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-full ${f.text.replace('text', 'bg')}`} />
      
      {/* 5. Symbol Decoration (Bottom Right) */}
      <div className={`absolute bottom-4 right-6 text-4xl opacity-[0.03] transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12 ${f.text}`}>
        {f.icon}
      </div>
    </div>
  ))}
</section>
      </div>
    </AppLayout>
  );
}