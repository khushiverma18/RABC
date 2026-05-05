import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { MOCK_USERS } from "./roles";

const STORAGE_KEY = "rbac_auth_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login = useCallback((username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      return { ok: false, error: "Invalid username or password" };
    }

    const safeUser = {
      username: found.username,
      role: found.role,
      name: found.name,
    };

    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    return { ok: true, user: safeUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // ✅ FIX: prevent re-render loop
  const value = useMemo(() => ({
    user,
    role: user?.role ?? null,
    ready,
    login,
    logout,
  }), [user, ready, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}