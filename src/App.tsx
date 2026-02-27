import './App.css'
import Dashboard from './pages/Dashboard'
import Textbook from './pages/Textbook'
import Lesson from './pages/Lesson'
import Favorites from './pages/Favorites'
import Stats from './pages/Stats'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/textbook/:id" element={<Textbook />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </HashRouter>
  )
}

export default App
