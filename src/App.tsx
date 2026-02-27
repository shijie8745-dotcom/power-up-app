import './App.css'
import Dashboard from './pages/Dashboard'
import Textbook from './pages/Textbook'
import Lesson from './pages/Lesson'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/textbook/:id" element={<Textbook />} />
        <Route path="/lesson/:id" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
