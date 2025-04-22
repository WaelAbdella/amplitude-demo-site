import React from 'react';
import TrackedElement from '../components/TrackedElement';

// Homepage using standard elements and CSS classes
const HomePage = () => {
  const buttonProps = { page: 'Home', location: 'Hero' };
  const buttonSnippet = `amplitude.track('CTA Clicked', ${JSON.stringify(buttonProps, null, 2)});`;

  return (
    <div> { /* Main container for the page content */}
      <div className="section" style={{ backgroundColor: '#e9ecef', textAlign: 'center', padding: '3rem 1rem' }}>
        <h1>Welcome to the Convz Amplitude Demo</h1>
        <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '1.5rem' }}>
          See Amplitude tracking in action within a React application.
        </p>
        {/* Example CTA Button */}
        <TrackedElement 
          eventName="CTA Clicked" 
          eventProperties={buttonProps} 
          codeSnippet={buttonSnippet}
          elementType="button" // Specify element type for clarity
        >
          <button className="btn btn-primary">Learn More (Tracked)</button>
        </TrackedElement>
      </div>

      <div className="section">
        <h2>How it Works</h2>
        <p>
          Navigate through the pages and interact with tracked elements like buttons and forms.
          Use the "Dev Mode" toggle in the navigation bar to see a live feed of the tracked events
          and their properties in the panel at the bottom right.
        </p>
      </div>

      <div className="section card">
        <h2>Explore Features</h2>
        <p>
          Check out the different pages to see examples of:
        </p>
        <ul>
          <li style={{ marginBottom: '0.5rem' }}>Page view tracking (automatic on navigation)</li>
          <li style={{ marginBottom: '0.5rem' }}>Button click tracking with properties (Features, Pricing pages)</li>
          <li style={{ marginBottom: '0.5rem' }}>Form submission tracking (Signup/Login page)</li>
          <li style={{ marginBottom: '0.5rem' }}>User identification (Signup/Login page)</li>
        </ul>
      </div>

    </div>
  );
};

export default HomePage; 