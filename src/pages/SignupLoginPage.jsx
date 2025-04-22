import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';
import { Identify, identify, setUserId } from '../utils/amplitude';
import { devInfoLogger } from '../utils/DevInfoLogger';

const SignupLoginPage = () => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('free');

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

  // Handler to set userId *and* identify *before* form submission tracking
  const handleFormSubmit = () => {
     if (email) {
        // 1. Set User ID
        setUserId(email);
        console.log(`Amplitude User ID set to: ${email}`);
        devInfoLogger.addLog(
          'setUserId', 
          'Set User ID', 
          { userId: email }, 
          setUserIdSnippet
        );

        // 2. Identify User (Set Properties)
        const identifyObj = new Identify().set('plan', plan); // Create Identify object
        identify(identifyObj); // Call identify
        console.log(`Amplitude Identify call sent for plan: ${plan}`);
        // Log Identify Call - Pass a simple object for properties
        const identifySnippet = `const identifyObj = new Identify().set('plan', '${plan}');\namplitude.identify(identifyObj);`;
        devInfoLogger.addLog(
            'identify', 
            'User Identify', 
            { plan: plan }, // Pass simple {plan: plan} object here
            identifySnippet
        );

     } else {
        // Still set user ID to null for anonymous
        setUserId(null);
        console.log('Amplitude User ID cleared (no email provided).');
        devInfoLogger.addLog(
          'setUserId', 
          'Clear User ID', 
          { userId: null }, 
          setUserIdSnippet
        );
     }
     // 3. Track Form Submission (handled by TrackedElement wrapper automatically after this handler)
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Signup/Login Page</h1>
      <p>Submitting the form will set the User ID, send an <code>identify()</code> call (setting plan property), and track the submission event. All actions appear in Dev Logs.</p>

      {/* Tracked Form - tracks the submit action */}
      <TrackedElement
        eventName="Signup Form Submitted"
        eventProperties={formEventProps}
        codeSnippet={formCodeSnippet}
        interactionType="track"
        trigger="onSubmit"
      >
        <form onSubmit={handleFormSubmit} className="mt-4 border p-4 rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email (Sets User ID)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plan">
              Choose Plan (User Property via Identify)
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="plan"
              name="plan"
              value={plan}
              onChange={e => setPlan(e.target.value)}
            >
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign Up / Login (Tracked)
          </button>
        </form>
      </TrackedElement>
    </div>
  );
};

export default SignupLoginPage; 