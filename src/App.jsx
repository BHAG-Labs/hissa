import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EsopValue from './pages/EsopValue';
import CoFounderSplit from './pages/CoFounderSplit';
import DilutionSim from './pages/DilutionSim';
import EsopTax from './pages/EsopTax';
import EsopPool from './pages/EsopPool';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/esop-value" element={<EsopValue />} />
          <Route path="/co-founder-split" element={<CoFounderSplit />} />
          <Route path="/dilution-sim" element={<DilutionSim />} />
          <Route path="/esop-tax" element={<EsopTax />} />
          <Route path="/esop-pool" element={<EsopPool />} />
        </Route>
      </Route>
    </Routes>
  );
}
