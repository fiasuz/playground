import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/styles.css";
import "./app/styles/index.css";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
