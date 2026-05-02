import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EsopValue from './pages/EsopValue';
import CoFounderSplit from './pages/CoFounderSplit';
import DilutionSim from './pages/DilutionSim';
import EsopTax from './pages/EsopTax';
import EsopPool from './pages/EsopPool';
import LegalPage from './pages/LegalPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/esop-value" element={<EsopValue />} />
        <Route path="/co-founder-split" element={<CoFounderSplit />} />
        <Route path="/dilution-sim" element={<DilutionSim />} />
        <Route path="/esop-tax" element={<EsopTax />} />
        <Route path="/esop-pool" element={<EsopPool />} />
        <Route path="/privacy" element={<LegalPage kind="privacy" />} />
        <Route path="/terms" element={<LegalPage kind="terms" />} />
        <Route path="/grievance" element={<LegalPage kind="grievance" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
