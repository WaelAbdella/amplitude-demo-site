import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

// !!! IMPORTANT: Replace this with your actual Amplitude API Key !!!
const AMPLITUDE_API_KEY = '93a30739be4e1aa9110e3a82b95d8710';

// Initialize plugins
const replay = sessionReplayPlugin();

export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY || AMPLITUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('Amplitude API Key is not set. Tracking will be disabled. Please replace "YOUR_API_KEY_HERE" in src/utils/amplitude.js');
    return;
  }

  // Add plugins before init
  amplitude.add(replay);

  amplitude.init(AMPLITUDE_API_KEY, undefined, { // Using undefined for userId initially
    defaultTracking: {
      sessions: true,
      pageViews: false, // We'll handle page views manually for more control
      formInteractions: true, // Re-enabled default form tracking
      fileDownloads: true,
    },
    // Session Replay is enabled via the plugin
    // sessionReplay: true, // This config option might still be useful for certain settings

    // Autocapture is enabled via the plugin
    // Ensure the plugin is added before init
  });

  console.log('Amplitude SDK Initialized with Session Replay');
};

// Export track and identify for use in components
export const track = amplitude.track;
export const identify = amplitude.identify;
export const setUserId = amplitude.setUserId;
export const reset = amplitude.reset; // Useful for logout simulation
export { Identify } from '@amplitude/analytics-browser'; // Re-export Identify for convenience

// A/B Testing helper functions
export const getExperimentVariant = (experimentKey) => {
  if (window.amplitude && window.amplitude.getExperiment) {
    const variant = window.amplitude.getExperiment(experimentKey);
    return variant;
  }
  return null;
};

export const isExperimentActive = (experimentKey) => {
  if (window.amplitude && window.amplitude.isExperimentActive) {
    return window.amplitude.isExperimentActive(experimentKey);
  }
  return false;
};

// --- Function to track page views ---
// We need access to location, so this might be better implemented
// as a hook or called within a component that has router context.
// For now, a simple function:
export const trackPageView = (pageName, properties = {}) => {
   const eventProps = {
        page_name: pageName,
        page_path: window.location.pathname,
        page_url: window.location.href,
        ...properties, // Add any extra properties
    };
  track('Page Viewed', eventProps);
  console.log(`Amplitude Track: Page Viewed - ${pageName}`, eventProps);
}; 