import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PersonnelAdministration } from './pages/PersonnelAdministration';
import { OrganizationalManagement } from './pages/OrganizationalManagement';
import { PersonnelActions } from './pages/PersonnelActions';
import { TimeManagement } from './pages/TimeManagement';
import { LeaveManagement } from './pages/LeaveManagement';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { EmployeeProfile } from './pages/employee/EmployeeProfile';
import { EmployeeOrganization } from './pages/employee/EmployeeOrganization';
import { EmployeeRequests } from './pages/employee/EmployeeRequests';
import { PerformanceManagement } from './pages/PerformanceManagement';
import { LearningManagement } from './pages/LearningManagement';
import { DocumentManagement } from './pages/DocumentManagement';
import { Transfers } from './pages/Transfers';
import { Offboarding } from './pages/Offboarding';
import { Reports } from './pages/Reports';
import { SAPSimulator } from './pages/SAPSimulator';
import { SAPConcepts } from './pages/SAPConcepts';
import { Settings } from './pages/Settings';
import { About } from './pages/About';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const RootRedirect: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return role === 'employee' ? <Navigate to="/employee" replace /> : <Navigate to="/dashboard" replace />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/login" element={<Login />} />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Authenticated routes wrapped with AppLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Core HR Operations */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/personnel-administration" element={<PersonnelAdministration />} />
            <Route path="/organizational-management" element={<OrganizationalManagement />} />
            <Route path="/personnel-actions" element={<PersonnelActions />} />
            <Route path="/time-management" element={<TimeManagement />} />
            <Route path="/leave" element={<LeaveManagement />} />

            {/* Employee Self-Service */}
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/employee/profile" element={<EmployeeProfile />} />
            <Route path="/employee/organization" element={<EmployeeOrganization />} />
            <Route path="/employee/requests" element={<EmployeeRequests />} />

            {/* Talent & Operational Modules */}
            <Route path="/performance" element={<PerformanceManagement />} />
            <Route path="/learning" element={<LearningManagement />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/offboarding" element={<Offboarding />} />

            {/* Simulation & Reference */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/sap-simulator" element={<SAPSimulator />} />
            <Route path="/sap-concepts" element={<SAPConcepts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
