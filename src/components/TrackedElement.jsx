import React from 'react';
import { useOutletContext } from 'react-router-dom'; // To get isDevMode state
import { track, identify, Identify } from '../utils/amplitude'; // Import standard functions
import { devInfoLogger } from '../utils/DevInfoLogger'; // Import the logger

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
      // console.log('Form submitted (prevented default)'); // Optional: keep for debugging
    }

    // Call original handler if it exists and is a function
    if (children?.props && typeof children.props[trigger] === 'function') {
      children.props[trigger](e);
    }

    // Fire Amplitude event and log if in Dev Mode
    if (interactionType === 'track' && eventName) {
      track(eventName, eventProperties || {}); // Use standard track
      if (isDevMode) {
        devInfoLogger.log({
          type: 'track',
          name: eventName,
          properties: eventProperties || {},
          code: codeSnippet,
        });
      }
    } else if (interactionType === 'identify' && identifyObject instanceof Identify) {
      identify(identifyObject); // Use standard identify
       if (isDevMode) {
        // Log identify call. Identify object structure might be complex,
        // log relevant parts or the code snippet.
        // For simplicity, logging the code snippet which should detail the identify properties.
         devInfoLogger.log({
           type: 'identify',
           name: 'User Identify', // Generic name for identify calls
           properties: identifyObject.payload, // Log the actual payload
           code: codeSnippet,
         });
       }
    }
  };

  // Determine if children is a valid React element to clone
  const isValidElement = React.isValidElement(children);

  // Create props for the wrapped element
  const elementProps = {
    [trigger]: handleInteraction,
    // Add title attribute for code snippet on hover only in dev mode
    ...(isDevMode && codeSnippet && { title: codeSnippet }),
    // Add a visual indicator in dev mode (e.g., a border)
    ...(isDevMode && { className: `${children?.props?.className || ''} border-2 border-dashed border-blue-500` }),
  };

  // Clone the child element with the new props
  return isValidElement ? React.cloneElement(children, elementProps) : children;
};

export default TrackedElement; 