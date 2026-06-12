import { motion } from 'framer-motion'

const FEATURES = [
  'Live Arduino C++ generated as you snap blocks',
  '50+ custom blocks — the full standard library',
  'One-click compile & flash via arduino-cli',
  'Offline Blockly — no internet connection needed',
]

const STACK = ['Python', 'PyQt6', 'Google Blockly', 'QtWebEngine', 'arduino-cli']

const MORE_WORK = [
  {
    id: 'cctv',
    title: 'Real-Time Surveillance System',
    tag: 'Embedded · Python · FFmpeg',
    github: 'https://github.com/harshverma27/Raspberry-Pi-Based-CCTV',
  },
  {
    id: 'adblocker',
    title: 'Network-Level Ad Blocker',
    tag: 'Networking · DNS · Raspberry Pi',
    github: 'https://github.com/harshverma27/Raspberry-Pi-Based-AdBlocker',
  },
  {
    id: 'kissan',
    title: 'Kissan Connect',
    tag: 'Kotlin · Jetpack Compose · Django',
    github: 'https://github.com/harshverma27/Kissan-Connect',
  },
  {
    id: 'ayurgyanam',
    title: 'AyurGyanam',
    tag: 'Kotlin · Django · Firebase',
    github: 'https://github.com/harshverma27/AyurvedaProject',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Works() {
  return (
    <section id="works" className="relative py-16 md:py-28 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent-2 font-mono text-sm">▸</span>
          <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">Latest Project</span>
          <div className="flex-1 h-px bg-stroke/70" />
          <span className="font-mono text-xs text-muted">001 / 2026</span>
        </motion.div>

        {/* Spotlight */}
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-14 items-center">
          {/* Copy */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary leading-[0.95] mb-4">
              Spark<span className="italic text-accent-1">IDE</span>
            </h2>
            <p className="text-lg md:text-xl text-text-primary/90 font-display italic mb-5">
              A block-based Arduino IDE for Linux.
            </p>
            <p className="text-sm md:text-[0.95rem] text-muted leading-relaxed max-w-lg mb-8">
              SparkIDE brings Scratch-style block programming to Arduino. Drag blocks,
              watch real C++ write itself in a live preview, then compile and flash it to a
              connected board in a single click — all inside a fast, native PyQt6 desktop app
              wrapping Google Blockly.
            </p>

            {/* Feature list */}
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-text-primary/80">
                  <span className="text-accent-2 mt-0.5 flex-shrink-0 font-mono text-xs">[+]</span>
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 mb-9">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.7rem] text-muted px-3 py-1.5 rounded-full border border-stroke/80 bg-bg/30 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Meta + CTAs */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                id="sparkide-github-btn"
                href="https://github.com/harshverma27/SparkIDE"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium bg-text-primary text-bg hover:bg-accent-1 transition-colors"
              >
                View on GitHub
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
              <a
                id="sparkide-releases-btn"
                href="https://github.com/harshverma27/SparkIDE/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2"
              >
                <span className="text-accent-2">●</span> v1.0.0 · MIT · Linux
              </a>
            </div>
          </motion.div>

          {/* Custom-rendered IDE mock */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Ambient accent glow */}
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(60% 60% at 50% 40%, hsl(var(--accent-2) / 0.22), transparent 70%)' }}
            />
            <SparkIdeMock />
          </motion.div>
        </div>

        {/* More work */}
        <div className="mt-24 md:mt-32">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">More work</span>
            <div className="flex-1 h-px bg-stroke/70" />
            <a
              href="https://github.com/harshverma27"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-text-primary transition-colors"
            >
              all repos ↗
            </a>
          </motion.div>

          <div className="border-t border-stroke/60">
            {MORE_WORK.map((p, i) => (
              <motion.a
                key={p.id}
                id={`project-${p.id}`}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 md:gap-8 py-5 md:py-6 border-b border-stroke/60 hover:bg-surface/40 transition-colors px-2 -mx-2 rounded-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span className="font-mono text-xs text-muted/70 w-8 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg md:text-2xl font-display text-text-primary group-hover:text-accent-1 transition-colors flex-1 min-w-0 truncate">
                  {p.title}
                </h3>
                <span className="hidden sm:block font-mono text-xs text-muted text-right">
                  {p.tag}
                </span>
                <span className="text-muted group-hover:text-accent-1 group-hover:translate-x-1 transition-all flex-shrink-0">
                  ↗
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Bespoke SparkIDE window — block workspace + live C++ generation    */
/* ------------------------------------------------------------------ */

type Tone = 'structure' | 'io' | 'time'

const TONE: Record<Tone, string> = {
  structure: 'border-amber-300/40 bg-amber-300/[0.08] text-amber-100/90',
  io: 'border-accent-1/40 bg-accent-1/[0.08] text-accent-1',
  time: 'border-accent-3/40 bg-accent-3/[0.08] text-accent-3',
}

function Block({ tone, children, indent = false }: { tone: Tone; children: React.ReactNode; indent?: boolean }) {
  return (
    <div className={indent ? 'pl-5' : ''}>
      <div className={`inline-flex items-center rounded-md border px-2.5 py-1.5 text-[0.7rem] leading-none ${TONE[tone]}`}>
        {children}
      </div>
    </div>
  )
}

function SparkIdeMock() {
  return (
    <div className="relative rounded-2xl border border-stroke bg-[#080b09]/95 overflow-hidden shadow-2xl shadow-black/50 font-mono">
      <div className="absolute inset-0 lab-grid opacity-50 pointer-events-none" />

      {/* Title bar */}
      <div className="relative flex items-center justify-between border-b border-stroke/70 px-4 h-9 bg-[#0a0e0b]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent-1 animate-led-blink" />
          <span className="text-[0.72rem] text-accent-1 font-semibold">SparkIDE</span>
          <span className="text-[0.66rem] text-muted/80 hidden sm:inline">Hybrid Lab Console</span>
        </div>
        <span className="text-[0.66rem] text-muted/80">blink.ino</span>
      </div>

      {/* Body */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 min-h-[300px]">
        {/* Workspace */}
        <div className="p-4 border-b sm:border-b-0 sm:border-r border-stroke/60">
          <div className="text-[0.62rem] text-muted/70 uppercase tracking-[0.2em] mb-3">// workspace</div>
          <div className="space-y-1.5">
            <Block tone="structure">setup</Block>
            <Block tone="io" indent>pinMode <span className="text-muted ml-1">13, OUTPUT</span></Block>
            <Block tone="structure">loop</Block>
            <Block tone="io" indent>digitalWrite <span className="text-muted ml-1">13, HIGH</span></Block>
            <Block tone="time" indent>delay <span className="text-muted ml-1">1000</span></Block>
            <Block tone="io" indent>digitalWrite <span className="text-muted ml-1">13, LOW</span></Block>
            <Block tone="time" indent>delay <span className="text-muted ml-1">1000</span></Block>
          </div>
        </div>

        {/* Generated sketch */}
        <div className="p-4">
          <div className="text-[0.62rem] text-muted/70 uppercase tracking-[0.2em] mb-3">// generated sketch · c++</div>
          <pre className="text-[0.7rem] leading-[1.55] whitespace-pre overflow-x-auto">
<span className="text-muted/60">// auto-generated by SparkIDE</span>{'\n'}
<span className="text-accent-2">void</span> <span className="text-text-primary">setup</span>() {'{'}{'\n'}
{'  '}<span className="text-text-primary">pinMode</span>(<span className="text-accent-1">13</span>, <span className="text-accent-3">OUTPUT</span>);{'\n'}
{'}'}{'\n'}
{'\n'}
<span className="text-accent-2">void</span> <span className="text-text-primary">loop</span>() {'{'}{'\n'}
{'  '}<span className="text-text-primary">digitalWrite</span>(<span className="text-accent-1">13</span>, <span className="text-accent-3">HIGH</span>);{'\n'}
{'  '}<span className="text-text-primary">delay</span>(<span className="text-accent-1">1000</span>);{'\n'}
{'  '}<span className="text-text-primary">digitalWrite</span>(<span className="text-accent-1">13</span>, <span className="text-accent-3">LOW</span>);{'\n'}
{'  '}<span className="text-text-primary">delay</span>(<span className="text-accent-1">1000</span>);{'\n'}
{'}'}<span className="inline-block w-[7px] h-[0.95em] bg-accent-1 align-middle ml-1 animate-caret-blink" />
          </pre>
        </div>
      </div>

      {/* Build/output strip */}
      <div className="relative flex items-center gap-3 border-t border-stroke/70 px-4 py-2 bg-[#0a0e0b] text-[0.66rem]">
        <span className="text-accent-1">✓</span>
        <span className="text-muted">Sketch uses 924 bytes (2%)</span>
        <span className="text-muted/60 hidden sm:inline">→ /dev/ttyACM0 · arduino:avr:uno</span>
        <div className="ml-auto relative w-16 h-1 rounded-full bg-stroke/80 overflow-hidden">
          <div className="absolute inset-y-0 w-1/3 rounded-full bg-accent-1 animate-build-sweep" />
        </div>
      </div>
    </div>
  )
}
