import { createFileRoute, Link } from "@tanstack/react-router";
// @ts-expect-error jsx
import { AppLayout } from "../components/AppLayout";

export const Route = createFileRoute("/access-denied")({
  component: AccessDenied,
});

function AccessDenied() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-2xl">
          🚫
        </div>
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You don't have permission to view this page. If you believe this is a
          mistake, contact your administrator.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to dashboard
          </Link>
          <Link
            to="/"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Home
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
