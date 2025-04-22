import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SignupLoginPage from './pages/SignupLoginPage';
import AboutContactPage from './pages/AboutContactPage';
import { initAmplitude } from './utils/amplitude';
import TrackPageViews from './components/TrackPageViews';

function App() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <Router>
      <TrackPageViews />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="signup-login" element={<SignupLoginPage />} />
          <Route path="about-contact" element={<AboutContactPage />} />
          {/* Add catch-all or 404 page if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 