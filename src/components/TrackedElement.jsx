import React from 'react';
import { useOutletContext } from 'react-router-dom'; // To get isDevMode state
import { trackWithDevInfo, identifyWithDevInfo, Identify } from '../utils/amplitude';

/**
 * Wrapper component to track interactions and optionally display debug info.
 *
 * Props:
 * - children: The element(s) to wrap (e.g., a button, form).
 * - eventName: The name of the Amplitude event to track (for track calls).
 * - eventProperties: An object of properties for the Amplitude event (for track calls).
 * - identifyObject: An Amplitude Identify object (for identify calls).
 * - codeSnippet: A string representation of the tracking code used.
 * - interactionType: 'track' or 'identify'. Defaults to 'track'.
 * - trigger: The event prop to attach the handler to (e.g., 'onClick', 'onSubmit'). Defaults to 'onClick'.
 */
const TrackedElement = ({
  children,
  eventName,
  eventProperties,
  identifyObject,
  codeSnippet,
  interactionType = 'track',
  trigger = 'onClick',
}) => {
  const { isDevMode } = useOutletContext(); // Get dev mode state from Layout context

  const handleInteraction = (e) => {
    // Prevent default form submission if trigger is onSubmit
    if (trigger === 'onSubmit') {
      e.preventDefault();
      console.log('Form submitted (prevented default)');
    }

    // Call original handler if it exists
    if (children?.props && typeof children.props[trigger] === 'function') {
      children.props[trigger](e);
    }

    // Fire Amplitude event
    if (interactionType === 'track' && eventName) {
      trackWithDevInfo(eventName, eventProperties || {}, codeSnippet);
    } else if (interactionType === 'identify' && identifyObject instanceof Identify) {
      identifyWithDevInfo(identifyObject, codeSnippet);
    }
  };

  // Clone the child element to add the interaction handler
  const childElement = React.Children.only(children);
  const trackedChild = React.cloneElement(childElement, {
    [trigger]: handleInteraction,
  });

  return (
    <div className="inline-block relative group"> {/* Wrapper for positioning snippet */}
      {trackedChild}
      {isDevMode && codeSnippet && (
         <div className="absolute left-0 bottom-full mb-2 w-max max-w-xs bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-pre-wrap shadow-lg">
           <pre className="bg-transparent p-0 m-0 text-white">{codeSnippet}</pre>
        </div>

        /* Alternative: Display below the element */
        /*
        <div className="mt-2 text-xs text-gray-600 w-full">
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
            <code>{codeSnippet}</code>
          </pre>
        </div>
        */
      )}
    </div>
  );
};

export default TrackedElement; 