import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './aws-exports.js';

// Polyfills for Buffer and process
import { Buffer } from 'buffer';
import process from 'process';

// Ensure global variables are set correctly
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

if (typeof global.process === 'undefined') {
  global.process = process;
}

// Configure AWS Amplify
Amplify.configure(amplifyconfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
