import { motion } from 'framer-motion'

const GNOME_MR = 'https://gitlab.gnome.org/GNOME'

// Merged upstream work, grouped by project. Each ref links to the merged MR/PR.
const CONTRIBUTIONS = [
  {
    project: 'GIMP',
    items: [
      { text: 'First end-to-end UI tests, driving real GIMP windows on headless Wayland in CI', ref: '!2909', href: `${GNOME_MR}/gimp/-/merge_requests/2909` },
      { text: 'Guide for writing and debugging UI tests on developer.gimp.org', ref: 'guide', href: 'https://developer.gimp.org/core/debug/ui-tests/' },
      { text: 'Commit-message checks for every merge request in GIMP CI', ref: '!2833', href: `${GNOME_MR}/gimp/-/merge_requests/2833` },
      { text: 'Build and environment info in the About dialog, one click to copy as markdown', ref: '!2955', href: `${GNOME_MR}/gimp/-/merge_requests/2955` },
      { text: 'Fixed early saturation in the spectral paint blend', ref: '!3003', href: `${GNOME_MR}/gimp/-/merge_requests/3003` },
    ],
  },
  {
    project: 'dogtail',
    items: [
      { text: 'Hermetic sessions: UI tests with no desktop, using a private D-Bus, at-spi2-registryd and headless Mutter. Headline feature of dogtail 2.1.0', ref: '!63', href: 'https://gitlab.com/dogtail/dogtail/-/merge_requests/63' },
      { text: "Stopped the private bus from auto-starting the host's services", ref: '!66', href: 'https://gitlab.com/dogtail/dogtail/-/merge_requests/66' },
    ],
  },
  {
    project: 'GTK, Showtime, meson',
    items: [
      { text: 'gtk-demo: dropped a property that no longer exists', ref: 'gtk !10183', href: `${GNOME_MR}/gtk/-/merge_requests/10183` },
      { text: 'Showtime: show the correct audio track', ref: 'showtime !98', href: `${GNOME_MR}/showtime/-/merge_requests/98` },
      { text: "depfixer: don't run install_name_tool on non-Darwin targets", ref: 'meson #16016', href: 'https://github.com/mesonbuild/meson/pull/16016' },
    ],
  },
]

const CVES = [
  {
    id: 'CVE-2026-97185',
    href: 'https://access.redhat.com/security/cve/cve-2026-97185',
    where: "GIMPressionist preset loader",
    text: 'Unvalidated vector indices from a preset file could write past fixed-size arrays. Affected RHEL 7 through 10.',
  },
  {
    id: 'CVE-2026-90947',
    href: 'https://access.redhat.com/security/cve/cve-2026-90947',
    where: 'Lighting plug-in preset loader',
    text: 'An unchecked light count from a preset file could overflow a fixed-size array. Clamped before the write.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function OpenSource() {
  return (
    <section id="floss" className="relative py-16 md:py-28 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent-2 font-mono text-sm">▸</span>
          <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">Open source</span>
          <div className="flex-1 h-px bg-stroke/70" />
          <a
            href="https://gitlab.gnome.org/harshverma"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-text-primary transition-colors"
          >
            gitlab ↗
          </a>
        </motion.div>

        {/* Spotlight */}
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-14 items-center">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary leading-[0.95] mb-6">
              Testing GIMP like a person would
            </h2>
            <div className="space-y-4 text-sm md:text-[0.95rem] text-muted leading-relaxed max-w-lg mb-9">
              <p>
                My first contribution was a docs fix for GNOME's SSH keys page. Since then
                most of my work has been test infrastructure.
              </p>
              <p>
                GIMP now has UI tests that click around the app the way a person does and
                check that menus, dialogs and layers still work. To run them in CI, Red Hat's
                test framework dogtail had to work without a full desktop, so I built that
                into dogtail first. It shipped as the headline feature of dogtail 2.1.0.
              </p>
              <p>
                Along the way I found and fixed two memory-safety bugs in GIMP, both credited
                by Red Hat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                id="floss-gitlab-btn"
                href="https://gitlab.gnome.org/harshverma"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium bg-text-primary text-bg hover:bg-accent-1 transition-colors"
              >
                View on GNOME GitLab
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
              <a
                id="floss-gimp-blog-btn"
                href="https://www.gimp.org/news/2026/07/18/gsoc-2026-midpoint-progress/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2"
              >
                <span className="text-accent-2">●</span> Featured in GIMP's GSoC 2026 midpoint post
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(60% 60% at 50% 40%, hsl(var(--accent-2) / 0.22), transparent 70%)' }}
            />
            <HermeticMock />
          </motion.div>
        </div>

        {/* CVEs */}
        <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-5">
          {CVES.map((c) => (
            <a
              key={c.id}
              id={c.id.toLowerCase()}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-stroke bg-[#080b09]/80 p-6 md:p-7 hover:border-accent-2/60 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-sm md:text-base text-accent-1">{c.id}</span>
                <span className="font-mono text-xs text-muted">CVSS 7.8</span>
              </div>
              <h3 className="font-display text-2xl text-text-primary mb-2">{c.where}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">{c.text}</p>
              <span className="text-xs text-text-primary/80 group-hover:text-accent-1 transition-colors">
                Found, fixed, credited by Red Hat ↗
              </span>
            </a>
          ))}
        </div>

        {/* Merged work */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">Merged upstream</span>
            <div className="flex-1 h-px bg-stroke/70" />
          </div>
          <div className="border-t border-stroke/60">
            {CONTRIBUTIONS.map((group) => (
              <div key={group.project} className="grid md:grid-cols-[14rem_1fr] gap-x-8 gap-y-3 py-6 md:py-7 border-b border-stroke/60">
                <h3 className="font-display text-2xl text-text-primary">{group.project}</h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href} className="flex items-start gap-4 text-sm">
                      <span className="flex-1 text-text-primary/80 leading-snug">{item.text}</span>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-muted hover:text-accent-1 transition-colors whitespace-nowrap pt-0.5"
                      >
                        {item.ref} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Bespoke dogtail window: hermetic session bring-up, then GIMP's UI tests. */
function HermeticMock() {
  const steps = [
    ['private D-Bus session', 'up'],
    ['at-spi2-registryd', 'up'],
    ['mutter --headless', 'up'],
    ['input via RemoteDesktop', 'ready'],
  ]
  return (
    <div className="relative rounded-2xl border border-stroke bg-[#080b09]/95 overflow-hidden shadow-2xl shadow-black/50 font-mono">
      <div className="absolute inset-0 lab-grid opacity-50 pointer-events-none" />

      <div className="relative flex items-center justify-between border-b border-stroke/70 px-4 h-9 bg-[#0a0e0b]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent-1 animate-led-blink" />
          <span className="text-[0.72rem] text-accent-1 font-semibold">dogtail</span>
          <span className="text-[0.66rem] text-muted/80 hidden sm:inline">hermetic session</span>
        </div>
        <span className="text-[0.66rem] text-muted/80">gimp ui tests</span>
      </div>

      <div className="relative p-4 sm:p-5 min-h-[300px]">
        <pre className="text-[0.7rem] sm:text-[0.74rem] leading-[1.7] whitespace-pre-wrap">
<span className="text-muted/60"># no desktop session on this CI runner</span>{'\n'}
{steps.map(([name, state]) => (
  <span key={name}>
    <span className="text-accent-1">✓</span> {name.padEnd(26, ' ')}<span className="text-accent-3">{state}</span>{'\n'}
  </span>
))}
{'\n'}
<span className="text-muted/60">→ launching GIMP on Wayland</span>{'\n'}
<span className="text-muted/60">→ walking the accessibility tree</span>{'\n'}
{'\n'}
<span className="text-accent-1">✓</span> 12 of 12 UI tests passed{'\n'}
<span className="text-accent-1">✓</span> session torn down, nothing left running<span className="inline-block w-[7px] h-[0.95em] bg-accent-1 align-middle ml-1 animate-caret-blink" />
        </pre>
      </div>

      <div className="relative flex items-center gap-3 border-t border-stroke/70 px-4 py-2 bg-[#0a0e0b] text-[0.66rem]">
        <span className="text-accent-1">✓</span>
        <span className="text-muted">merged in GIMP, 25 Oct 2026</span>
        <div className="ml-auto relative w-16 h-1 rounded-full bg-stroke/80 overflow-hidden">
          <div className="absolute inset-y-0 w-1/3 rounded-full bg-accent-1 animate-build-sweep" />
        </div>
      </div>
    </div>
  )
}
