import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error jsx
import { AppLayout } from "../components/AppLayout";
// @ts-expect-error jsx
import { RoleGuard } from "../rbac/RoleGuard";

export const Route = createFileRoute("/admin")({
  component: () => (
    <RoleGuard path="/admin" allow={["admin"]}>
      <AppLayout>
        <div className="animate-fade-in">
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold role-badge-admin">
            ADMIN ONLY
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="mt-2 text-muted-foreground">
            System-wide controls. Restricted to administrators.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Users", value: "1,248" },
              { label: "Active Roles", value: "3" },
              { label: "Pending Reviews", value: "12" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5 shadow-soft">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-lg font-semibold">Administrative Tools</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Manage users and roles", d: "Create, update, deactivate accounts." },
              { t: "View audit logs", d: "Track every privileged action across the system." },
              { t: "System configuration", d: "Feature flags, integrations, security policies." },
              { t: "Billing & licenses", d: "Plan, seats and usage." },
            ].map((i) => (
              <li key={i.t} className="rounded-lg border bg-card p-4 shadow-soft transition hover:shadow-elegant">
                <div className="font-medium">{i.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{i.d}</div>
              </li>
            ))}
          </ul>
        </div>
      </AppLayout>
    </RoleGuard>
  ),
});
