# Amplitude Demo Site

A React-based demo website showcasing Amplitude analytics implementation with a developer-friendly interface.

## Features

- React-based single-page application
- Amplitude analytics integration
- Developer mode with real-time event tracking visualization
- Multiple tracked interactions (buttons, forms, page views)
- Responsive design with Tailwind CSS

## Pages

1. **Home Page**: Basic marketing content with tracked CTA
2. **Features Page**: Multiple tracked buttons and form elements
3. **Pricing Page**: Tracked plan selection buttons
4. **Signup/Login Page**: User identification and form tracking
5. **About/Contact Page**: Contact form with tracking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Amplitude API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/amplitude-demo-site.git
cd amplitude-demo-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your Amplitude API Key:
   - Open `src/utils/amplitude.js`
   - Replace `YOUR_API_KEY_HERE` with your actual Amplitude API key

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Developer Mode

The application includes a developer mode that:
- Shows tracking code snippets on hover
- Displays a real-time log panel of Amplitude events
- Allows toggling between production and development views

To enable developer mode:
1. Click the "Dev Mode" button in the top-right corner
2. Interact with tracked elements to see the event logs
3. Hover over tracked elements to see the tracking code

## Tracking Implementation

The project demonstrates various Amplitude tracking methods:

1. **Page Views**: Automatic tracking of page navigation
2. **Button Clicks**: Tracked using the `TrackedElement` wrapper
3. **Form Submissions**: Tracked with form-specific properties
4. **User Identification**: Implemented in the Signup/Login page

## Technologies Used

- React
- Vite
- React Router
- Tailwind CSS
- Amplitude Analytics Browser SDK

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
