import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { GameContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
