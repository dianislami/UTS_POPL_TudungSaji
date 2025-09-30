import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AboutUs from './components/AboutUs';
import Dashboard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Dashboard />
        </main>
        <AboutUs />
        <Footer />
      </div>
    </>
  )
}

export default App
