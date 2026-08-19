import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import { initAnalytics } from "./lib/analytics.ts";
import "./styles/index.css";

// Re-arms Google Analytics for visitors who already accepted; a no-op for
// everyone else, so nothing is loaded before the banner is answered.
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
