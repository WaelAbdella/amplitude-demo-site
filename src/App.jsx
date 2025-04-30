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
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DevModeProvider } from './contexts/DevModeContext';

function App() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <DevModeProvider>
      <Router basename="/">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
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
          </main>
          <Footer />
        </div>
      </Router>
    </DevModeProvider>
  );
}

export default App; 