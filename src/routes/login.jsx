import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
// @ts-expect-error jsx module
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx module
import { useAuth } from "../rbac/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  Fingerprint, 
  ShieldCheck, 
  Users, 
  User as UserIcon, 
  ChevronRight, 
  Activity, 
  Lock,
  ShieldAlert,
  Zap
} from "lucide-react";

export const Route = createFileRoute("/login")({
  validateSearch: (s) => {
    const redirect = typeof s.redirect === "string" ? s.redirect : "/dashboard";
    return { redirect };
  },
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const search = Route.useSearch();
  const redirect = search?.redirect || "/dashboard";
  const navigate = useNavigate();


  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const triggerError = (msg) => {
    setError(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Reset shake
  };

  const submit = (e) => {
    e.preventDefault();
    const res = login(username, password);

    if (!res.ok) {
      triggerError(res.error);
      return;
    }

    const role = res.user.role;
    const routeMap = {
      admin: "/admin",
      manager: "/manager",
      user: "/user",
    };

    navigate({ to: routeMap[role] || redirect || "/dashboard" });
  };

  const quick = (u) => {
    const res = login(u, u);
    if (res.ok) {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <AppLayout>
      {/* 1. Enhanced Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.2); }
          50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
        }
        .animate-slide-right { opacity: 0; animation: slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .delay-1 { animation-delay: 150ms; }
        .delay-2 { animation-delay: 300ms; }
        .delay-3 { animation-delay: 450ms; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-12">
        
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000" />

        {/* --- Header Section --- */}
        <div className="mb-12 text-center animate-slide-right">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40">
            <Fingerprint size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-5xl">
            Identity <span className="text-indigo-600">Portal</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-sm mx-auto">
            Select a security profile to initialize your session with specific clearance.
          </p>
        </div>

        {/* --- Horizontal Cards Container --- */}
        <div className="no-scrollbar flex w-full max-w-6xl flex-row gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:justify-center">
          {[
            { 
              r: "admin", 
              title: "System Administrator", 
              icon: <ShieldAlert size={28} />, 
              color: "from-red-500 to-rose-600", 
              level: "Level 10 (Full)", 
              access: "Core Settings, User DB, Audit Logs",
              delay: "delay-1"
            },
            { 
              r: "manager", 
              title: "Regional Manager", 
              icon: <Users size={28} />, 
              color: "from-blue-500 to-indigo-600", 
              level: "Level 5 (Elevated)", 
              access: "Team Reports, Approvals, Analytics",
              delay: "delay-2"
            },
            { 
              r: "user", 
              title: "Standard Operator", 
              icon: <UserIcon size={28} />, 
              color: "from-emerald-500 to-teal-600", 
              level: "Level 1 (Standard)", 
              access: "Personal Workspace, Tasks, Profile",
              delay: "delay-3"
            },
          ].map((item) => (
            <button
              key={item.r}
              onClick={() => quick(item.r)}
              className={`animate-slide-right ${item.delay} group relative flex min-w-[320px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/70 p-8 text-left shadow-lg backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/60`}
            >
              {/* Card Decoration */}
              <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${item.color} opacity-[0.03] transition-transform group-hover:scale-150`} />

              {/* Icon & Title Row */}
              <div className="flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:bg-white/5">
                  <Activity size={10} className="text-indigo-500" />
                  Active
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-indigo-500">{item.r}</p>
              </div>

              {/* Additional Information (The "Effective" part) */}
              <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 dark:border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Clearance</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.level}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Access Scope</span>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.access}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-slate-400" />
                  <span className="text-[10px] font-medium text-slate-400 uppercase">End-to-End Encryption</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-all group-hover:bg-indigo-600 group-hover:translate-x-1">
                  <ChevronRight size={18} />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 border-2 border-transparent transition-all group-hover:border-indigo-500/20 rounded-[2.5rem]`} />
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 animate-slide-right delay-3 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          <Zap size={14} className="text-amber-500 fill-amber-500" />
          Powered by Core RBAC Engine v2.0
        </div>

      </div>
    </AppLayout>
  );
}
 