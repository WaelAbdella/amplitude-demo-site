import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';
import * as amplitude from '@amplitude/analytics-browser';
import { devInfoLogger } from '../utils/DevInfoLogger';

// Signup/Login Page using standard elements and CSS classes
const SignupLoginPage = () => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('free');
  const [userId, setUserId] = useState(''); // For identify example

  // Define event properties for the *track* call (form submission CTA)
  const formEventProps = {
    page: 'signup_login',
    email: email, // Include email from state
    plan: plan,   // Include plan from state
  };
  const formCodeSnippet = `// Form Submit Track Call:
amplitude.track('Signup Form Submitted', {
  page: 'signup_login',
  email: '${email.replace(/'/g, "\'")}',
  plan: '${plan}'
});`;
  // Separate snippet for setUserId log
  const setUserIdSnippet = email ? `amplitude.setUserId('${email.replace(/'/g, "\'")}');` : `amplitude.setUserId(null);`;

  // Event properties for form submission
  const formSubmitProps = { formName: 'Sign Up', page: 'Signup/Login' };
  const formSubmitSnippet = `amplitude.track('Form Submitted', ${JSON.stringify(formSubmitProps, null, 2)});`;

  // Function to handle signup form submission
  const handleSignupSubmit = (event) => {
    event.preventDefault(); // Prevent actual form submission
    // In a real app, you would send data to your backend here
    console.log('Signup attempt with email:', email);
    // Tracking happens via TrackedElement on the form
  };

  // Function to handle user identification
  const handleIdentifyUser = () => {
    if (!userId) {
      alert('Please enter a User ID to identify.');
      return;
    }
    const identifyObject = new amplitude.Identify();
    identifyObject.set('email', `${userId}@example.com`); // Example: Set email trait
    identifyObject.set('plan', 'free'); // Example: Set plan trait
    amplitude.identify(identifyObject, { user_id: userId });

    // Log for Dev Panel
    // Note: TrackedElement handles logging for button click, but we might 
    // want separate logging for the identify call itself if needed.
    console.log(`Identify called for User ID: ${userId}`);
    alert(`Identify called for User ID: ${userId} with traits (see console/dev logs).`);
  };

  // Event properties and snippet for Identify button
  const identifyButtonProps = { userId: userId, page: 'Signup/Login', action: 'identify' };
  const identifyCodeSnippet = `const identify = new amplitude.Identify();\nidentify.set('email', '${userId || 'USER_ID'}@example.com');\nidentify.set('plan', 'free');\namplitude.identify(identify, { user_id: '${userId || 'USER_ID'}' });`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Signup/Login Page</h1>
      <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '1.5rem' }}>
        Demonstrating form tracking and user identification.
      </p>

      <div className="signup-login-grid">
        {/* Signup Form Card */}
        <div className="card">
          <h2>Sign Up</h2>
          <TrackedElement
            eventName="Form Submitted"
            eventProperties={formSubmitProps}
            codeSnippet={formSubmitSnippet}
            interactionType="track"
            trigger="onSubmit"
          >
            <form onSubmit={handleSignupSubmit} className="mt-4 border p-4 rounded">
              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="signup-email" 
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up (Tracked)</button>
            </form>
          </TrackedElement>
        </div>

        {/* Identify User Card */}
        <div className="card">
          <h2>Identify User</h2>
          <p style={{ color: '#495057', marginBottom: '1rem' }}>
            Simulate identifying a user with specific traits after login or signup.
          </p>
          <div className="form-group">
            <label htmlFor="identify-userid" className="form-label">User ID</label>
            <input 
              type="text" 
              className="form-control" 
              id="identify-userid" 
              placeholder="Enter a User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <TrackedElement
            eventName="Button Clicked"
            eventProperties={identifyButtonProps}
            codeSnippet={identifyCodeSnippet} // Use the generated identify snippet
            elementType="button"
          >
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleIdentifyUser} 
              disabled={!userId}
            >
              Identify User (Tracked)
            </button>
          </TrackedElement>
        </div>
      </div>
    </div>
  );
};

// Add CSS for .signup-login-grid to index.css
/*
.signup-login-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
*/

export default SignupLoginPage; 