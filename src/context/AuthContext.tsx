import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthSession, UserRole } from '../types/hr.types';
import { AuthService } from '../services/authService';

interface AuthContextType {
  session: AuthSession | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; session?: AuthSession; error?: string };
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => AuthService.getStoredSession());

  useEffect(() => {
    const handleAuthChange = () => {
      setSession(AuthService.getStoredSession());
    };
    window.addEventListener('hrflow_auth_change', handleAuthChange);
    return () => window.removeEventListener('hrflow_auth_change', handleAuthChange);
  }, []);

  const login = (email: string, pass: string) => {
    const res = AuthService.login(email, pass);
    if (res.success && res.session) {
      setSession(res.session);
    }
    return res;
  };

  const switchRole = (newRole: UserRole) => {
    const newSession = AuthService.switchRole(newRole);
    setSession(newSession);
  };

  const logout = () => {
    AuthService.logout();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        role: session?.user.role || null,
        isAuthenticated: !!session,
        login,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
