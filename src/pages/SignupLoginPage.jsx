import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';
import * as amplitude from '@amplitude/analytics-browser';
import { devInfoLogger } from '../utils/DevInfoLogger';

// Signup Page using standard elements and CSS classes
const SignupLoginPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '' // Add password field state
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Event properties and snippet for the final Track event
  const signupTrackProps = { 
    form_name: 'Sign Up', 
    method: 'email', // Example property
    page: 'Signup/Login' 
  };
  const signupTrackSnippet = `amplitude.track('Sign Up', ${JSON.stringify(signupTrackProps, null, 2)});`;

  // Handle form submission: Set User ID, Identify, then allow TrackedElement to track
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission regardless
    const { name, email } = formData;

    if (!email || !name) { // Basic validation
      alert('Please fill in Name and Email.');
      return;
    }

    // --- Amplitude Sequence ---
    try {
      // 1. Set User ID
      amplitude.setUserId(email); 
      const setUserIdSnippet = `amplitude.setUserId('${email}');`;
      devInfoLogger.addLog('setUserId', 'Set User ID', { userId: email }, setUserIdSnippet);
      console.log(`Amplitude User ID set to: ${email}`);

      // 2. Identify User (Set Properties)
      const identifyObj = new amplitude.Identify();
      identifyObj.set('name', name);
      identifyObj.set('email', email); 
      identifyObj.setOnce('signup_date', new Date().toISOString().split('T')[0]); // YYYY-MM-DD
      amplitude.identify(identifyObj);
      const identifySnippet = `const identify = new amplitude.Identify();\nidentify.set('name', '${name}');\nidentify.set('email', '${email}');\nidentify.setOnce('signup_date', '${new Date().toISOString().split('T')[0]}');\namplitude.identify(identify);`;
      devInfoLogger.addLog('identify', 'User Identified', { name: name, email: email }, identifySnippet);
      console.log(`Amplitude Identify call sent for user: ${email}`);

      // 3. Track 'Sign Up' Event - This will be handled by the TrackedElement wrapper
      // We manually trigger the submission logic within TrackedElement if needed,
      // but often just letting the submit bubble works if TrackedElement listens correctly.
      // For clarity, we might just alert and clear form here.

      alert('Sign Up Successful! Check Dev Panel for setUserId, identify, and track events.');
      setFormData({ name: '', email: '', password: '' }); // Clear form

    } catch (error) {
      console.error("Error during Amplitude operations:", error);
      devInfoLogger.addLog('error', 'Amplitude Error', { error: error.message }, 'Error during setUserId/identify');
      alert('An error occurred during sign up. Check console.');
    }
    // --- End Amplitude Sequence ---
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '1.5rem' }}>
        Create an account. Submitting demonstrates the typical Sign Up event flow.
      </p>

      {/* Single Signup Form Card */}
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}> {/* Centered card */}
        <h2>Create Account</h2>
        <TrackedElement
          eventName="Sign Up" // Event name for the track call
          eventProperties={signupTrackProps} 
          codeSnippet={signupTrackSnippet}
          interactionType="track"
          trigger="onSubmit"
          // Pass the manual handler; TrackedElement should still trigger tracking on submit
          manualHandler={handleSubmit} 
        >
          <form onSubmit={handleSubmit}> { /* onSubmit still needed for manual calls */}
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="signup-name" 
                name="name" 
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="signup-email" 
                name="email" 
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="signup-password" 
                name="password" 
                placeholder="Choose a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
          </form>
        </TrackedElement>
      </div>

      {/* Removed the separate Identify User Card */}

    </div>
  );
};

export default SignupLoginPage; 