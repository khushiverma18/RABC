import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error jsx
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx
import { RoleGuard } from "../rbac/RoleGuard";
import { 
  Users, 
  ClipboardCheck, 
  Briefcase, 
  BarChart3, 
  Calendar, 
  UserPlus, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

export const Route = createFileRoute("/manager")({
  component: () => (
    <RoleGuard path="/manager" allow={["admin", "manager"]}>
      <AppLayout>
        {/* Custom Animation Style */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-stagger { opacity: 0; animation: slideIn 0.5s ease-out forwards; }
        `}} />

        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="animate-stagger" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  MANAGER + ADMIN ACCESS
                </span>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                  Management Hub
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl">
                  Overview of team performance, pending approvals, and strategic project allocation.
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                <BarChart3 size={18} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats / Metrics Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Team Members", value: "24", icon: <Users size={20} />, color: "text-blue-500", trend: "+2 this month" },
              { label: "Open Approvals", value: "05", icon: <ClipboardCheck size={20} />, color: "text-amber-500", trend: "3 urgent" },
              { label: "Active Projects", value: "08", icon: <Briefcase size={20} />, color: "text-indigo-500", trend: "On track" },
            ].map((s, i) => (
              <div 
                key={s.label} 
                className="animate-stagger relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-white/5 dark:bg-slate-900/50"
                style={{ animationDelay: `${200 + (i * 100)}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl bg-slate-100 p-2.5 dark:bg-white/5 ${s.color}`}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{s.trend}</span>
                </div>
                <div className="mt-5">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</div>
                  <div className="text-sm font-medium text-slate-500">{s.label}</div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-2 -bottom-2 opacity-5 text-slate-900 dark:text-white">
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="animate-stagger space-y-6" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Managerial Toolkit</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Performance Analytics", d: "Weekly KPIs and productivity charts.", icon: <BarChart3 className="text-blue-500" /> },
                { t: "Request Approval", d: "Review and approve pending PTO and expenses.", icon: <ClipboardCheck className="text-amber-500" /> },
                { t: "Resource Planning", d: "Allocate team members across active projects.", icon: <UserPlus className="text-indigo-500" /> },
                { t: "1:1 Meeting Planner", d: "Schedule and track regular team check-ins.", icon: <Calendar className="text-emerald-500" /> },
              ].map((i, idx) => (
                <div 
                  key={i.t} 
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500/50 hover:shadow-lg dark:border-white/5 dark:bg-slate-900"
                  style={{ animationDelay: `${600 + (idx * 50)}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 transition-transform group-hover:scale-110">
                    {i.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 dark:text-white">{i.t}</div>
                      <ArrowUpRight size={16} className="text-slate-300 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{i.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    </RoleGuard>
  ),
});