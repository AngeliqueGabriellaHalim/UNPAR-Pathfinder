// src/App.jsx
// Router setup — 3 pages:
//   /        → Home (search form)
//   /route   → RoutePage (step-by-step navigation with images)
//   /confirm → ConfirmPage (arrival confirmation)

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import ConfirmPage from "./pages/ConfirmPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}
