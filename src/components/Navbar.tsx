import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Home', 'Project', 'Resume']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (link: string) => {
    setActiveLink(link)
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (link === 'Project') {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
    } else if (link === 'Resume') {
      window.open('https://heyharsh.me/Resume/', '_blank')
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
    >
      <div
        className={`
          inline-flex items-center rounded-full backdrop-blur-md border border-white/10 
          bg-surface px-2 py-2 transition-shadow duration-300
          ${scrolled ? 'shadow-md shadow-black/30' : ''}
        `}
      >
        {/* Logo */}
        <LogoButton />

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              id={`nav-${link.toLowerCase()}`}
              onClick={() => handleNavClick(link)}
              className={`
                text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 
                transition-all duration-200 font-medium
                ${activeLink === link
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }
              `}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Say hi button */}
        <SayHiButton />
      </div>
    </motion.nav>
  )
}

function LogoButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      id="logo-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        background: hovered
          ? 'linear-gradient(270deg, #A8E05F 0%, #34C47C 100%)'
          : 'linear-gradient(90deg, #A8E05F 0%, #34C47C 100%)',
        padding: '2px',
        transition: 'background 0.4s ease',
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
      <div className="w-full h-full bg-bg rounded-full overflow-hidden">
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
      </div>
    </motion.button>
  )
}

function SayHiButton() {
  return (
    <div className="relative">
      <motion.a
        id="say-hi-btn"
        href="mailto:harshkardam246+portfolio@gmail.com"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="
          relative overflow-hidden rounded-full group
          text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2
          text-text-primary font-medium flex items-center gap-1.5
          border border-stroke/50 hover:border-transparent
          transition-all duration-300
        "
        style={{ background: 'hsl(var(--surface))' }}
      >
        {/* Gradient border on hover */}
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background: 'linear-gradient(90deg, #A8E05F 0%, #34C47C 100%)',
            inset: '-2px',
          }}
        />
        <span
          className="absolute inset-0 rounded-full -z-[5]"
          style={{ background: 'hsl(var(--surface))' }}
        />
        <span className="relative z-10 flex items-center gap-1.5">
          Say hi
          <span className="text-muted group-hover:text-text-primary transition-colors">↗</span>
        </span>
      </motion.a>
    </div>
  )
}
