import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Test from "./test";
import App from "./component/generalComponent/headAndSidebar/headAndSidebar";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
