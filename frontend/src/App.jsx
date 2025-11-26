import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Equipment from "./pages/Equipment";
import Incidents from "./pages/Incidents";
import { ToastContainer } from "react-toastify";
import FloatingChatbot from "./components/FloatingChatbot";

function App() {
  return (
    <>
      <Navbar />
      <Routes> ... </Routes>
      <FloatingChatbot />
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/incidents" element={<Incidents />} />
      </Routes>
    </BrowserRouter>
  );
}

