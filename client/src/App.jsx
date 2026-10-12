import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Play from './pages/Play.jsx'
import Submit from './pages/Submit.jsx'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Play</Link> | <Link to="/submit">Submit a claim</Link> |{' '}
      </nav>
      <Routes>
        <Route path="/" element={<Play />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
      <footer>Not medical advice. Ask a doctor or pharmacist about your health.</footer>
    </>
  )
}