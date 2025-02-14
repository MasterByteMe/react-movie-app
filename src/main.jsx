// Importing the StrictMode component from React. StrictMode is a development tool that helps identify potential problems in the app during development.
import { StrictMode } from "react";

// Importing the createRoot method from the 'react-dom/client' package. This is the API for rendering the app in React 18+.
import { createRoot } from "react-dom/client";

// Importing the global CSS file (index.css) which contains styles for the entire app.
import "./index.css";

// Importing the main App component from App.jsx, which will be rendered as the root component of the application.
import App from "./App.jsx";

// Using createRoot to initialize and render the React application into the DOM.
createRoot(document.getElementById("root")).render(
  // Wrapping the App component inside StrictMode. This is a development-only feature that highlights potential issues in the application.
  <StrictMode>
    <App />
  </StrictMode>
);
