import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';

const AboutContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Define event properties for the form
  const formEventProps = {
    form_type: 'contact',
    page: 'about_contact'
  };
  const formCodeSnippet = `amplitude.track('Form Submitted', {\n  form_type: 'contact',\n  page: 'about_contact'\n});`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About/Contact Page</h1>
      <p>Form-based track call simulation placeholder. Submitting the form will trigger a <code>track()</code> call with the specified event properties.</p>

      {/* Tracked Form */}
      <TrackedElement
        eventName="Form Submitted"
        eventProperties={formEventProps}
        codeSnippet={formCodeSnippet}
        interactionType="track"
        trigger="onSubmit"
      >
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </TrackedElement>
    </div>
  );
};

export default AboutContactPage; 