import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error jsx
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx
import { RoleGuard } from "../rbac/RoleGuard";
// @ts-expect-error jsx
import { useAuth } from "../rbac/AuthContext";
import { 
  User as UserIcon, 
  Settings, 
  Bell, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layout,
  ExternalLink
} from "lucide-react";

export const Route = createFileRoute("/user")({
  component: () => (
    <RoleGuard path="/user" allow={["admin", "manager", "user"]}>
      <UserPage />
    </RoleGuard>
  ),
});

function UserPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
      {/* Inline Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop { animation: fadeInScale 0.5s ease-out forwards; }
      `}} />

      <div className="max-w-5xl mx-auto space-y-10 pb-10">
        
        {/* --- Header & Badge --- */}
        <div className="animate-pop" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <Sparkles size={12} />
              Personal Workspace
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs text-slate-500 font-medium">Role: {user?.role}</span>
          </div>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
        </div>

        {/* --- Profile Glass Card --- */}
        <section 
          className="animate-pop relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-1 dark:border-white/5 dark:bg-slate-900 shadow-xl"
          style={{ animationDelay: '200ms' }}
        >
          <div className="absolute right-0 top-0 h-32 w-32 bg-emerald-500/10 blur-3xl" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 p-8">
            {/* Avatar with Glow */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 opacity-30 blur transition duration-500 group-hover:opacity-60" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-3xl font-black text-white dark:bg-white dark:text-black">
                {user?.name?.[0] ?? "U"}
              </div>
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-emerald-500 dark:border-slate-900" />
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-slate-500 font-medium">@{user?.username}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-400">Account Verified</span>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-400">Standard Plan</span>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95">
              <Settings size={18} />
              Edit Profile
            </button>
          </div>
        </section>

        {/* --- Quick Links Grid --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Layout size={20} className="text-emerald-500" />
              Quick Actions
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "My Tasks", d: "12 tasks pending today.", icon: <CheckCircle2 size={22} />, color: "text-blue-500", bg: "bg-blue-500/5" },
              { t: "Notifications", d: "3 new security alerts.", icon: <Bell size={22} />, color: "text-amber-500", bg: "bg-amber-500/5" },
              { t: "App Settings", d: "Preferences & security.", icon: <Settings size={22} />, color: "text-purple-500", bg: "bg-purple-500/5" },
            ].map((i, idx) => (
              <button 
                key={i.t} 
                className="animate-pop group text-left flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg dark:border-white/5 dark:bg-slate-900"
                style={{ animationDelay: `${300 + (idx * 100)}ms` }}
              >
                <div>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${i.bg} ${i.color} transition-transform group-hover:scale-110`}>
                    {i.icon}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {i.t}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {i.d}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-600 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                  Open <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- Activity Footer --- */}
        <div 
          className="animate-pop flex items-center justify-between rounded-2xl bg-slate-50 p-6 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10"
          style={{ animationDelay: '700ms' }}
        >
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Your session is active. All systems operational.
            </p>
          </div>
          <a href="#" className="text-xs font-bold flex items-center gap-1 hover:underline">
            System Status <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </AppLayout>
  );
}