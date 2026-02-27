import './App.css'
import Dashboard from './pages/Dashboard'
import Textbook from './pages/Textbook'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/textbook/:id" element={<Textbook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
