import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// "Tech playground" is the sun; each skill is a small gradient title revolving
// around it on a tilted elliptical path. Titles sink back and shrink across the
// top (passing behind the sun), then swell and come forward along the bottom.
interface Planet {
  label: string
  from: string
  to: string
}

interface Orbit {
  aFrac: number // semi-major radius as a fraction of the stage's min dimension
  period: number // seconds per revolution
  dir: 1 | -1
  offset: number // starting angle, degrees
  size: 'sm' | 'md'
  planets: Planet[]
}

// Vertical squash of every orbit — this is what reads as the 3D tilt.
const B_RATIO = 0.4

const ORBITS: Orbit[] = [
  {
    aFrac: 0.315,
    period: 22,
    dir: 1,
    offset: 0,
    size: 'md',
    planets: [
      { label: 'Python', from: '#A8E05F', to: '#34C47C' },
      { label: 'Kotlin', from: '#86EFAC', to: '#2DD4BF' },
      { label: 'C++', from: '#6FE6B0', to: '#34C47C' },
      { label: 'Bash', from: '#BEF264', to: '#4ADE80' },
    ],
  },
  {
    aFrac: 0.48,
    period: 34,
    dir: -1,
    offset: 40,
    size: 'md',
    planets: [
      { label: 'Django', from: '#A8E05F', to: '#6FE6B0' },
      { label: 'Firebase', from: '#34C47C', to: '#A8E05F' },
      { label: 'MySQL', from: '#6FE6B0', to: '#34C47C' },
      { label: 'Jetpack Compose', from: '#BEF264', to: '#4ADE80' },
      { label: 'GitHub Actions', from: '#4ADE80', to: '#A8E05F' },
    ],
  },
  {
    aFrac: 0.645,
    period: 46,
    dir: 1,
    offset: 18,
    size: 'sm',
    planets: [
      { label: 'Raspberry Pi', from: '#34C47C', to: '#6FE6B0' },
      { label: 'PCB Design', from: '#6FE6B0', to: '#A8E05F' },
      { label: 'GitLab CI/CD', from: '#A8E05F', to: '#34C47C' },
      { label: 'FFmpeg', from: '#2DD4BF', to: '#86EFAC' },
      { label: 'Linux', from: '#4ADE80', to: '#BEF264' },
      { label: 'GTK+', from: '#6FE6B0', to: '#2DD4BF' },
    ],
  },
]

// Flattened list of planets, each carrying its orbit parameters + base angle.
const PLANETS = ORBITS.flatMap((o) =>
  o.planets.map((p, i) => ({
    ...p,
    aFrac: o.aFrac,
    period: o.period,
    dir: o.dir,
    size: o.size,
    baseAngle: o.offset + (i * 360) / o.planets.length,
  }))
)

export default function Explorations() {
  const stageRef = useRef<HTMLDivElement>(null)
  const planetRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const stage = stageRef.current
      if (stage) {
        const unit = Math.min(stage.clientWidth, stage.clientHeight)
        const t = reduce ? 0 : (now - start) / 1000

        PLANETS.forEach((p, idx) => {
          const el = planetRefs.current[idx]
          if (!el) return

          const a = unit * p.aFrac
          const b = a * B_RATIO
          const theta = (p.baseAngle * Math.PI) / 180 + p.dir * (t / p.period) * Math.PI * 2

          const x = a * Math.cos(theta)
          const y = b * Math.sin(theta)
          // depth: 0 at the top (far, behind sun) -> 1 at the bottom (near, front)
          const depth = (Math.sin(theta) + 1) / 2
          const scale = 0.66 + depth * 0.52

          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`
          el.style.opacity = String(0.45 + depth * 0.55)
          el.style.zIndex = String(Math.round(depth * 80) + 5)
          el.style.filter = depth < 0.5 ? `blur(${(0.5 - depth) * 2.4}px)` : 'none'
        })
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="explorations"
      className="relative section-scrim h-screen min-h-[640px] overflow-hidden"
    >
      <div ref={stageRef} className="absolute inset-0">
        {/* Tilted elliptical orbit rings */}
        {ORBITS.map((o) => (
          <span
            key={`ring-${o.aFrac}`}
            className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-stroke/40"
            style={{
              width: `${o.aFrac * 200}vmin`,
              height: `${o.aFrac * 200 * B_RATIO}vmin`,
              boxShadow: 'inset 0 0 50px -26px hsl(var(--accent-2) / 0.5)',
            }}
          />
        ))}

        {/* The sun — "Tech playground" */}
        <div className="absolute left-1/2 top-1/2 z-[45] -translate-x-1/2 -translate-y-1/2 px-6 text-center pointer-events-none">
          <span
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              width: '34vmin',
              height: '34vmin',
              background:
                'radial-gradient(circle, hsl(var(--accent-2) / 0.45) 0%, hsl(var(--accent-1) / 0.18) 40%, transparent 70%)',
              animation: 'sun-pulse 7s ease-in-out infinite',
            }}
          />
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-3 flex items-center justify-center gap-2.5">
              <span className="h-px w-6 bg-stroke" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Explorations
              </span>
              <span className="h-px w-6 bg-stroke" />
            </div>
            <h2 className="font-display text-4xl leading-[0.95] text-text-primary md:text-6xl">
              Tech <em>playground</em>
            </h2>
            <p className="mx-auto mt-3 max-w-[15rem] text-xs text-muted md:text-sm">
              Tools, languages and systems in orbit.
            </p>
            <a
              id="explore-github-btn"
              href="https://github.com/harshverma27"
              target="_blank"
              rel="noreferrer"
              className="group relative mt-5 inline-flex items-center gap-2 rounded-full border border-stroke/80 bg-bg/40 px-5 py-2.5 text-xs text-muted backdrop-blur-sm transition-colors duration-300 hover:text-text-primary"
            >
              <span
                className="absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ inset: '-1.5px', background: 'linear-gradient(90deg, #A8E05F 0%, #34C47C 100%)' }}
              />
              <span className="absolute inset-0 rounded-full bg-bg/85 opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">View GitHub ↗</span>
            </a>
          </motion.div>
        </div>

        {/* Orbiting titles — positioned every frame by the rAF loop */}
        {PLANETS.map((p, idx) => (
          <div
            key={p.label}
            ref={(el) => {
              planetRefs.current[idx] = el
            }}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{ opacity: 0 }}
          >
            <PlanetChip planet={p} size={p.size} />
          </div>
        ))}
      </div>
    </section>
  )
}

function PlanetChip({ planet, size }: { planet: Planet; size: 'sm' | 'md' }) {
  const pad = size === 'md' ? 'px-3.5 py-1.5 text-xs' : 'px-3 py-1 text-[11px]'
  return (
    <span
      className={`relative block cursor-default whitespace-nowrap rounded-full font-mono font-medium tracking-tight transition-transform duration-300 hover:scale-[1.15] ${pad}`}
      style={{
        color: '#06100a',
        background: `linear-gradient(135deg, ${planet.from} 0%, ${planet.to} 100%)`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 22px -8px ${planet.to}, 0 0 28px -10px ${planet.from}`,
      }}
    >
      {/* Spherical top highlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 38%, transparent 60%)',
        }}
      />
      <span className="relative z-10">{planet.label}</span>
    </span>
  )
}
