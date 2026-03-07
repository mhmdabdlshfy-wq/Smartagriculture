import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SensorProvider } from './context/SensorContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import MessagePanel from './components/MessagePanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InsightsPage from './pages/InsightsPage';
import CropPage from './pages/CropPage';
import PlantDiseasesPage from './pages/PlantDiseasesPage';
import DiseaseDetailPage from './pages/DiseaseDetailPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.loading}</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <MessagePanel />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <SensorProvider>
            <ToastProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/insights" element={
                    <ProtectedRoute>
                      <InsightsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/crop/:cropName" element={
                    <ProtectedRoute>
                      <CropPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/plant-diseases" element={
                    <ProtectedRoute>
                      <PlantDiseasesPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/plant-diseases/:plantName/:diseaseId" element={
                    <ProtectedRoute>
                      <DiseaseDetailPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </ToastProvider>
          </SensorProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
