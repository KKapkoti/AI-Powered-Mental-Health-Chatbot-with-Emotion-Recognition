//src/index.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext";
axios.defaults.withCredentials = true; 


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider>
     <App />
     <ToastContainer position="top-center" autoClose={2000} />
     </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
