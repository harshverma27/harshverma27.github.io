import { useState } from 'react'
import { motion } from 'framer-motion'

const COL_SPAN_MAP: Record<number, string> = {
  5: 'md:col-span-5',
  7: 'md:col-span-7',
}

const PROJECTS = [
  {
    id: 'cctv',
    title: 'Real-Time Surveillance System',
    tag: 'Embedded · Python · FFmpeg',
    description: 'Raspberry Pi Zero CCTV with motion detection and live FFmpeg streaming pipeline.',
    github: 'https://github.com/harshverma27/Raspberry-Pi-Based-CCTV',
    image: '/projects/cctv.png',
    gradient: 'from-blue-950/70 via-slate-900/50 to-bg/80',
    accent: '#89AACC',
    icon: '📡',
    span: 7,
  },
  {
    id: 'adblocker',
    title: 'Network-Level Ad Blocker',
    tag: 'Networking · DNS · Raspberry Pi',
    description: 'Custom DNS-based filtering on Raspberry Pi blocking ads network-wide.',
    github: 'https://github.com/harshverma27/Raspberry-Pi-Based-AdBlocker',
    image: '/projects/adblocker.png',
    gradient: 'from-teal-950/70 via-slate-900/50 to-bg/80',
    accent: '#4E85BF',
    icon: '🛡️',
    span: 5,
  },
  {
    id: 'ayurgyanam',
    title: 'AyurGyanam',
    tag: 'Kotlin · Django · Firebase',
    description: 'Full-stack Android app for Ayurveda with Django backend and Firebase auth.',
    github: 'https://github.com/harshverma27/AyurvedaProject',
    image: '/projects/ayurgyanam.png',
    gradient: 'from-green-950/70 via-slate-900/50 to-bg/80',
    accent: '#6B9FD4',
    icon: '🌿',
    span: 5,
  },
  {
    id: 'kissan',
    title: 'Kissan Connect',
    tag: 'Kotlin · Jetpack Compose · Django',
    description: 'Android marketplace connecting farmers and consumers with backend services.',
    github: 'https://github.com/harshverma27/Kissan-Connect',
    image: '/projects/kissan.png',
    gradient: 'from-amber-950/70 via-slate-900/50 to-bg/80',
    accent: '#F59E0B',
    icon: '🌾',
    span: 7,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Works() {
  return (
    <section id="works" className="bg-bg py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-start justify-between mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary mb-3">
              Featured <em>projects</em>
            </h2>
            <p className="text-sm text-muted max-w-md">
              A selection of projects I've built — from embedded systems to full-stack apps.
            </p>
          </div>

          <motion.a
            id="view-all-work-btn"
            href="https://github.com/harshverma27"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted hover:text-text-primary border border-stroke hover:border-transparent transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                inset: '-2px',
                borderRadius: '9999px',
              }}
            />
            <span
              className="absolute inset-0 bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10">View all work</span>
            <span className="relative z-10 group-hover:translate-x-0.5 transition-transform">→</span>
          </motion.a>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={COL_SPAN_MAP[project.span] ?? ''}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface Project {
  id: string
  title: string
  tag: string
  description: string
  github: string
  image: string
  gradient: string
  accent: string
  icon: string
  span: number
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      id={`project-${project.id}`}
      href={project.github}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: '4 / 3' }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Real background image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark gradient overlay so content is readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.2) 100%)`,
        }}
      />

      {/* Subtle coloured tint matching the project accent */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-color"
        style={{ background: project.accent }}
      />

      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-10 mix-blend-multiply pointer-events-none" />

      {/* Icon badge */}
      <div className="absolute top-5 left-5 z-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl backdrop-blur-sm"
          style={{ background: `rgba(10,10,10,0.6)`, border: `1px solid ${project.accent}40` }}
        >
          {project.icon}
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-bg/75 backdrop-blur-sm flex items-center justify-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative">
          <div
            className="absolute -inset-px rounded-full"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          />
          <div className="relative px-6 py-3 rounded-full bg-text-primary text-bg text-sm font-medium">
            View — <em className="font-display">{project.title}</em>
          </div>
        </div>
      </motion.div>

      {/* Content footer */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-3"
          style={{
            background: `rgba(10,10,10,0.7)`,
            border: `1px solid ${project.accent}50`,
            color: project.accent,
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.tag}
        </div>
        <h3 className="text-white font-semibold text-lg mb-1.5 leading-snug drop-shadow-lg">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* GitHub arrow */}
      <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-sm"
          style={{ background: `rgba(10,10,10,0.7)`, color: project.accent, border: `1px solid ${project.accent}40` }}
        >
          ↗
        </div>
      </div>
    </motion.a>
  )
}
