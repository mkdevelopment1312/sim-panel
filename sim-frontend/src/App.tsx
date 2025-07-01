
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthForm from './features/AuthForm';
import Dashboard from './features/Dashboard';
import SimForm from './features/SimForm';
import Payment from './features/Payment';
import Support from './features/Support';
import AdminDashboard from './features/AdminDashboard';

import { isAuthenticated, isAdmin } from './lib/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-dark">
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/sim/register" element={
            <ProtectedRoute>
              <SimForm />
            </ProtectedRoute>
          } />
          
          <Route path="/payment/:simId" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          
          <Route path="/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            isAuthenticated() 
              ? isAdmin() 
                ? <Navigate to="/admin" replace />
                : <Navigate to="/dashboard" replace />
              : <Navigate to="/auth" replace />
          } />
          
          <Route path="*" element={
            <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-mono font-bold text-neon-green mb-4">404</h1>
                <p className="text-gray-400">Strona nie znaleziona</p>
              </div>
            </div>
          } />
        </Routes>
        
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="font-mono"
        />
      </div>
    </Router>
  );
};

export default App;
