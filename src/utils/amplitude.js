import * as amplitude from '@amplitude/analytics-browser';

// !!! IMPORTANT: Replace this with your actual Amplitude API Key !!!
const AMPLITUDE_API_KEY = 'YOUR_API_KEY_HERE'; // Placeholder

export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY || AMPLITUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('Amplitude API Key is not set. Tracking will be disabled. Please replace "YOUR_API_KEY_HERE" in src/utils/amplitude.js');
    return;
  }

  amplitude.init(AMPLITUDE_API_KEY, undefined, { // Using undefined for userId initially
    defaultTracking: {
      sessions: true,
      pageViews: false, // We'll handle page views manually for more control
      formInteractions: true, // Autocapture form interactions
      fileDownloads: true, // Autocapture file downloads
    },
    // Enable Session Replay
    // Requires Amplitude Experiment or paid plan: https://www.docs.developers.amplitude.com/data/session-replay/
    // sessionReplay: true, // Uncomment if you have Session Replay enabled in your plan

    // Enable Autocapture via BROWSER SDK Enrichment Plugin
    // See: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/plugins/enrichment/autocapture/
    // Requires adding the plugin - let's add basic default tracking first.
    // Will revisit adding the explicit Autocapture plugin if default tracking isn't sufficient.
  });

  console.log('Amplitude SDK Initialized');
};

// Export track and identify for use in components
export const track = amplitude.track;
export const identify = amplitude.identify;
export const setUserId = amplitude.setUserId;
export const reset = amplitude.reset; // Useful for logout simulation
export { Identify } from '@amplitude/analytics-browser'; // Re-export Identify for convenience


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