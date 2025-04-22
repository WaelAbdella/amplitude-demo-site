import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/amplitude'; // Import the tracking function

const TrackPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    // Map pathname to a user-friendly page name
    let pageName = location.pathname.substring(1) || 'Home'; // Remove leading slash, default to 'Home'
    if (pageName.includes('/')) pageName = pageName.replace('/', '_'); // Simple replacement for nested paths if any
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1); // Capitalize

    // Handle specific routes if needed for better naming
    switch (location.pathname) {
      case '/':
        pageName = 'Home';
        break;
      case '/features':
        pageName = 'Features';
        break;
      case '/pricing':
        pageName = 'Pricing';
        break;
      case '/signup-login':
        pageName = 'SignupLogin';
        break;
      case '/about-contact':
        pageName = 'AboutContact';
        break;
      // Add more cases if needed
    }

    trackPageView(pageName); // Call the tracking function

  }, [location]); // Re-run effect when location changes

  return null; // This component doesn't render anything
};

export default TrackPageViews; 