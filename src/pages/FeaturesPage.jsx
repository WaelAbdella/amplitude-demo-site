import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';

const FeaturesPage = () => {
  // State for the feedback form
  const [feedback, setFeedback] = useState('');

  // --- Define props/snippets inside component to access state ---
  const button1Props = { featureName: 'Feature A', page: 'features' };
  const button1Snippet = `amplitude.track('Feature Button Clicked', ${JSON.stringify(button1Props, null, 2)});`;

  const button2Props = { featureName: 'Feature B', page: 'features' };
  const button2Snippet = `amplitude.track('Feature Button Clicked', ${JSON.stringify(button2Props, null, 2)});`;

  // Include feedback state in form properties
  const formProps = { formName: 'Sample Form', page: 'features', feedback: feedback };
  // Update snippet to show feedback being included
  const formSnippet = `amplitude.track('Form Submitted', {
  formName: 'Sample Form',
  page: 'features',
  feedback: '${feedback.replace(/'/g, "\'")}'
});`;
  // -----------------------------------------------------------

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Features Page</h1>
      <p>Buttons, form elements, interactions placeholder (all tracked).</p>

      {/* Tracked Buttons */}
      <TrackedElement eventName="Feature Button Clicked" eventProperties={button1Props} codeSnippet={button1Snippet}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
          Feature Button 1 (Tracked)
        </button>
      </TrackedElement>

       <TrackedElement eventName="Feature Button Clicked" eventProperties={button2Props} codeSnippet={button2Snippet}>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4">
          Feature Button 2 (Tracked)
        </button>
      </TrackedElement>

      {/* Tracked Form */}
      <div className="mt-8 border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Feedback Form</h2>
        <TrackedElement
          eventName="Form Submitted"
          eventProperties={formProps} // Pass dynamic props
          codeSnippet={formSnippet} // Pass dynamic snippet
          interactionType="track"
          trigger="onSubmit"
        >
          <form>
            <label className="block mb-2">
              Your Feedback:
              <textarea
                className="border rounded p-1 ml-2 w-full mt-1"
                value={feedback} // Controlled component
                onChange={e => setFeedback(e.target.value)} // Update state
                rows={3}
              ></textarea>
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Submit Feedback (Tracked)
            </button>
          </form>
        </TrackedElement>
      </div>

    </div>
  );
};

export default FeaturesPage; 