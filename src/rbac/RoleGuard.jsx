import { Navigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";
import { canAccess } from "./roles";

/**
 * Wrap any page in <RoleGuard path="/admin"> ... </RoleGuard>.
 * - Waits for auth to be ready (no flicker)
 * - Redirects unauthenticated users to /login
 * - Sends users without permission to /access-denied
 */
export function RoleGuard({ path, children, allow }) {
  const { user, role, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} replace />;
  }

  // Either an explicit allow-list of roles, or fall back to route map.
  const ok = allow ? allow.includes(role) : canAccess(role, path);
  if (!ok) return <Navigate to="/access-denied" replace />;

  return children;
}

/** Conditional rendering helper: <Show when={["admin"]}>...</Show> */
export function Show({ when, children, fallback = null }) {
  const { role } = useAuth();
  if (!role || !when.includes(role)) return fallback;
  return children;
}
