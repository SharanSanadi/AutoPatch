import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { AgentProvider } from "./context/AgentContext"

export default function App() {
  return (
    <AgentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AgentProvider>
  )
}