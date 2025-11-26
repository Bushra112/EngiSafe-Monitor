import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Equipment from "./pages/Equipment";
import Incidents from "./pages/Incidents";
import FloatingChatbot from "./components/FloatingChatbot";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/incidents" element={<Incidents />} />
      </Routes>

      <FloatingChatbot />
    </BrowserRouter>
  );
}
