import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';
import { Identify, setUserId } from '../utils/amplitude';

const SignupLoginPage = () => {
  // State to hold form values for identify call
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('free');

  // Construct Identify object based on state
  const identifyObj = new Identify()
    .set('email', email || undefined) // Set only if email exists
    .set('plan', plan);
  const identifyCodeSnippet = `// Assuming 'email' and 'plan' variables hold form values:\nconst identifyObj = new Identify()\n  .set('email', email)\n  .set('plan', plan);\n\namplitude.identify(identifyObj);\n\n// Also setting userId for the session:\namplitude.setUserId(email);`;

  // Handler to update state AND set userId
  const handleIdentifySubmit = () => {
     // Simulate setting user ID when identifying
     if (email) {
        setUserId(email);
        console.log(`Amplitude User ID set to: ${email}`);
     } else {
        // Optional: clear user ID if email is cleared? Or handle anonymous users
        setUserId(null); // Explicitly set to null for anonymous
        console.log('Amplitude User ID cleared (no email provided).');
     }
     // Note: The actual identify call is handled by TrackedElement
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Signup/Login Page</h1>
      <p>Form-based identify call simulation placeholder. Submitting the form will trigger an <code>identify()</code> call with the entered data and set the User ID for the session if an email is provided.</p>

      {/* Tracked Form for Identify */}
      {/* Pass identifyObject and interactionType='identify', trigger='onSubmit' */}
      {/* Attach our custom handler to the form's onSubmit as well */}
      <TrackedElement
        identifyObject={identifyObj}
        interactionType="identify"
        codeSnippet={identifyCodeSnippet}
        trigger="onSubmit"
      >
        <form className="mt-4 border p-4 rounded inline-block" onSubmit={handleIdentifySubmit}>
            <label className="block mb-2">
            Email:
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="border rounded p-1 ml-2" />
            </label>
            <label className="block mb-2">
            Plan:
            <select
                name="plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="border rounded p-1 ml-2"
            >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
            </select>
            </label>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
            Sign Up / Identify (Tracked)
            </button>
        </form>
      </TrackedElement>
    </div>
  );
};

export default SignupLoginPage; 