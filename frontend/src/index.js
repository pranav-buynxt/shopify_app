// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from "@shopify/polaris/locales/en.json";

import App from "./App";

// function WrappedApp() {
//   return (
//     <AppProvider i18n={enTranslations}>
//       <App />
//     </AppProvider>
//   );
// }

// ReactDOM.render(<WrappedApp />, document.getElementById("root"));

const config = {
  apiKey: process.env.SHOPIFY_API_KEY,
  shopOrigin: new URLSearchParams(window.location.search).get('shop'),
  forceRedirect: true,
};

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);