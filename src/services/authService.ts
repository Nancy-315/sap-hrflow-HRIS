import { AuthSession } from '../types/hr.types';

const SESSION_KEY = 'hrflow_auth_session_v1';

export const AuthService = {
  getStoredSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (!data) return null;
      return JSON.parse(data) as AuthSession;
    } catch {
      return null;
    }
  },

  login(email: string, pass: string): { success: boolean; session?: AuthSession; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === 'admin@hrflow.demo' && cleanPass === 'HRFlow@123') {
      const session: AuthSession = {
        user: {
          id: 'USR-ADMIN-01',
          name: 'Nancy F (HR Administrator)',
          email: 'admin@hrflow.demo',
          role: 'admin',
          position: 'Enterprise HR Systems Administrator',
          department: 'Human Resources'
        },
        token: 'demo-jwt-admin-token-' + Date.now(),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new Event('hrflow_auth_change'));
      return { success: true, session };
    }

    if (cleanEmail === 'employee@hrflow.demo' && cleanPass === 'Employee@123') {
      const session: AuthSession = {
        user: {
          id: 'USR-EMP-1001',
          name: 'Ananya Kumar',
          email: 'employee@hrflow.demo',
          role: 'employee',
          employeeId: 'EMP1001',
          department: 'Human Resources',
          position: 'HR Executive - Talent & Operations',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        },
        token: 'demo-jwt-emp-token-' + Date.now(),
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new Event('hrflow_auth_change'));
      return { success: true, session };
    }

    return {
      success: false,
      error: 'Invalid demo credentials. Please try again.'
    };
  },

  switchRole(targetRole: 'admin' | 'employee'): AuthSession {
    if (targetRole === 'admin') {
      return this.login('admin@hrflow.demo', 'HRFlow@123').session!;
    } else {
      return this.login('employee@hrflow.demo', 'Employee@123').session!;
    }
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event('hrflow_auth_change'));
  }
};
