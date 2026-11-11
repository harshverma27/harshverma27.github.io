import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OpenSource from './components/OpenSource'
import Works from './components/Works'
import Community from './components/Community'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Contact from './components/Contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            {/* Content slides over the fixed animated background. */}
            <div className="relative z-10">
              <OpenSource />
              <Stats />
              <Works />
              <Community />
              <Journal />
              <Explorations />
            </div>
          </main>
          <div className="relative z-10">
            <Contact />
          </div>
        </>
      )}
    </>
  )
}
