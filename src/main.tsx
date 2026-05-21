import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Recover from stale dynamic import chunks after a new deploy
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});
window.addEventListener("error", (e) => {
  const msg = e?.message || "";
  if (
    msg.includes("Importing a module script failed") ||
    msg.includes("Failed to fetch dynamically imported module")
  ) {
    window.location.reload();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
