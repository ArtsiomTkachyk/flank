import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SelectBudgetProvider } from "./context/selectBudgetContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SelectBudgetProvider >
      <App />
    </SelectBudgetProvider >
  </BrowserRouter>
);
