/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import FanAssistant from './pages/FanAssistant';
import NavigationCenter from './pages/NavigationCenter';
import CrowdDashboard from './pages/CrowdDashboard';
import SustainabilityDashboard from './pages/SustainabilityDashboard';
import CommandCenter from './pages/CommandCenter';
import StaffPortal from './pages/StaffPortal';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assistant" element={<FanAssistant />} />
            <Route path="/navigation" element={<NavigationCenter />} />
            <Route path="/crowd" element={<CrowdDashboard />} />
            <Route path="/sustainability" element={<SustainabilityDashboard />} />
            <Route path="/command" element={<CommandCenter />} />
            <Route path="/staff" element={<StaffPortal />} />
          </Routes>
          <Toaster position="top-right" toastOptions={{
            style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
          }} />
        </Layout>
      </Router>
    </AuthProvider>
  );
}
