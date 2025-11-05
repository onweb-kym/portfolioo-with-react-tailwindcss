import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import Gracias from "./Gracias";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/gracias" element={<Gracias />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
