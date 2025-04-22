import React from 'react';
import TrackedElement from '../components/TrackedElement'; // Import wrapper

const HomePage = () => {
  const ctaEventProps = { ctaType: 'signup', page: 'home' };
  // Format snippet for readability
  const ctaCodeSnippet = `amplitude.track('CTA Clicked', {
  ctaType: 'signup',
  page: 'home'
});`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p>Basic marketing content and CTA placeholder.</p>
      {/* Wrap button with TrackedElement */}
      <TrackedElement
        eventName="CTA Clicked"
        eventProperties={ctaEventProps}
        codeSnippet={ctaCodeSnippet}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Sign Up Now (Tracked)
        </button>
      </TrackedElement>
    </div>
  );
};

export default HomePage; 