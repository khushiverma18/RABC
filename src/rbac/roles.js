// Central role configuration — add a new role here and the whole app adapts.
// Each role lists which routes it can access and which nav items it sees.

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

// Role -> allowed route paths. Use "*" for wildcard (all routes).
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    label: "Administrator",
    routes: ["*"], // admin can access everything
    nav: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/admin", label: "Admin Panel" },
      { to: "/manager", label: "Manager Tools" },
      { to: "/user", label: "User Area" },
    ],
  },
  [ROLES.MANAGER]: {
    label: "Manager",
    routes: ["/dashboard", "/manager", "/user"],
    nav: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/manager", label: "Manager Tools" },
      { to: "/user", label: "User Area" },
    ],
  },
  [ROLES.USER]: {
    label: "User",
    routes: ["/dashboard", "/user"],
    nav: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/user", label: "User Area" },
    ],
  },
};

export function canAccess(role, path) {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role];
  if (!perms) return false;
  if (perms.routes.includes("*")) return true;
  return perms.routes.includes(path);
}

export function getNavFor(role) {
  return ROLE_PERMISSIONS[role]?.nav ?? [];
}

// Mock user database — simulates a backend.
export const MOCK_USERS = [
  { username: "admin", password: "admin", role: ROLES.ADMIN, name: "Alex Admin" },
  { username: "manager", password: "manager", role: ROLES.MANAGER, name: "Morgan Manager" },
  { username: "user", password: "user", role: ROLES.USER, name: "Khushi Verma" }
];
