import React from 'react';
import TrackedElement from '../components/TrackedElement'; // Import wrapper

const PricingPage = () => {

  // Props and Snippets for Plan A Button
  const planAProps = { plan: 'A', page: 'pricing' };
  const planASnippet = `amplitude.track('Plan Button Clicked', ${JSON.stringify(planAProps, null, 2)});`;

  // Props and Snippets for Plan B Button
  const planBProps = { plan: 'B', page: 'pricing' };
  const planBSnippet = `amplitude.track('Plan Button Clicked', ${JSON.stringify(planBProps, null, 2)});`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing Page</h1>
      <p>Buttons and navigation tracking placeholder.</p>

      {/* Wrap Plan A Button */}
      <TrackedElement eventName="Plan Button Clicked" eventProperties={planAProps} codeSnippet={planASnippet}>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
          Select Plan A (Tracked)
        </button>
      </TrackedElement>

      {/* Wrap Plan B Button */}
      <TrackedElement eventName="Plan Button Clicked" eventProperties={planBProps} codeSnippet={planBSnippet}>
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
           Select Plan B (Tracked)
        </button>
      </TrackedElement>

    </div>
  );
};

export default PricingPage; 