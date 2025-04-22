import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';
import { Identify, setUserId } from '../utils/amplitude';

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
});

// Separate User Identification:
// amplitude.setUserId('${email.replace(/'/g, "\'")}');
// const identifyObj = new Identify().set('plan', '${plan}');
// amplitude.identify(identifyObj);`;

  // Handler to set userId *before* form submission tracking
  const handleFormSubmit = () => {
     if (email) {
        setUserId(email);
        console.log(`Amplitude User ID set to: ${email}`);
        // Optionally send an identify call here too if needed
        // const identifyObj = new Identify().set('plan', plan);
        // identify(identifyObj); // Using the imported identify
     } else {
        setUserId(null);
        console.log('Amplitude User ID cleared (no email provided).');
     }
     // The track call is handled by TrackedElement on submit
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Signup/Login Page</h1>
      <p>Form-based track call simulation. Submitting the form will set the User ID (if email provided) and trigger a <code>track()</code> call for the submission including email and plan.</p>

      {/* Tracked Form - now using track instead of identify */}
      <TrackedElement
        eventName="Signup Form Submitted" // Event name for the CTA
        eventProperties={formEventProps}    // Pass dynamic props
        codeSnippet={formCodeSnippet}     // Pass dynamic snippet
        interactionType="track"         // Changed to track
        trigger="onSubmit"
      >
        <form onSubmit={handleFormSubmit} className="mt-4 border p-4 rounded"> {/* Call handler on submit */}
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
              Choose Plan (User Property)
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