import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const STARS = 2200

// Soft round blob, used for stars and nebula clouds.
function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.25, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

// Fresnel rim glow, drawn on the inside of a slightly larger sphere.
const atmosphereMat = () =>
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float i = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(0.35, 0.65, 1.0, 1.0) * i;
      }`,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  })

// Space scene: twinkling stars, nebula, textured Earth. Fixed behind every section.
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200)
    camera.position.z = 8

    const glow = glowTexture()
    const disposables: { dispose(): void }[] = [glow]

    // Stars: white, pale blue, warm, with the site's mint mixed in.
    const pos = new Float32Array(STARS * 3)
    const col = new Float32Array(STARS * 3)
    const palette = [0xffffff, 0xcfe3ff, 0xfff1d6, 0x9ff5cf].map((c) => new THREE.Color(c))
    for (let i = 0; i < STARS; i++) {
      const r = 10 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], i * 3)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col.set([c.r, c.g, c.b], i * 3)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.35, map: glow, vertexColors: true, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)
    disposables.push(starGeo, starMat)

    // Nebula: big faint additive sprites in emerald / violet / teal.
    ;[
      [0x2ecf8a, -14, 6, -40, 38],
      [0x6d4fd6, 16, -8, -45, 44],
      [0x1ba3b8, 2, 14, -55, 40],
    ].forEach(([color, x, y, z, s]) => {
      const m = new THREE.SpriteMaterial({
        map: glow, color, transparent: true, opacity: 0.14,
        depthWrite: false, blending: THREE.AdditiveBlending,
      })
      const sp = new THREE.Sprite(m)
      sp.position.set(x, y, z)
      sp.scale.setScalar(s)
      scene.add(sp)
      disposables.push(m)
    })

    // Earth: day map + normal + specular oceans, cloud shell, atmosphere rim.
    const loader = new THREE.TextureLoader().setPath('/earth/')
    const maxAniso = renderer.capabilities.getMaxAnisotropy()
    const tex = (file: string, srgb = false) => {
      const t = loader.load(file)
      t.anisotropy = maxAniso
      if (srgb) t.colorSpace = THREE.SRGBColorSpace
      disposables.push(t)
      return t
    }
    const R = 2.4
    const earth = new THREE.Group()
    const eGeo = new THREE.SphereGeometry(R, 96, 96)
    const eMat = new THREE.MeshPhongMaterial({
      map: tex('earth_atmos_2048.jpg', true),
      specularMap: tex('earth_specular_2048.jpg'),
      normalMap: tex('earth_normal_2048.jpg'),
      normalScale: new THREE.Vector2(0.85, 0.85),
      specular: new THREE.Color(0x335577),
      shininess: 18,
    })
    const surface = new THREE.Mesh(eGeo, eMat)
    const cGeo = new THREE.SphereGeometry(R * 1.012, 96, 96)
    const cMat = new THREE.MeshStandardMaterial({
      map: tex('earth_clouds_1024.png', true),
      transparent: true, opacity: 0.55, depthWrite: false,
    })
    const clouds = new THREE.Mesh(cGeo, cMat)
    const aGeo = new THREE.SphereGeometry(R * 1.12, 64, 64)
    const aMat = atmosphereMat()
    earth.add(surface, clouds, new THREE.Mesh(aGeo, aMat))
    earth.rotation.z = 0.41 // axial tilt
    scene.add(earth)
    disposables.push(eGeo, eMat, cGeo, cMat, aGeo, aMat)

    scene.add(new THREE.AmbientLight(0x6b8f9f, 0.35))
    const sun = new THREE.DirectionalLight(0xfff4e0, 3.6)
    sun.position.set(-8, 5, 6)
    scene.add(sun)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    // Earth drifts right <-> left as the page scrolls, so it stays visible in every section.
    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return max > 0 ? window.scrollY / max : 0
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const tick = (t: number) => {
      if (!reduce) {
        stars.rotation.y += 0.0002
        surface.rotation.y += 0.0015
        clouds.rotation.y += 0.002
        starMat.opacity = 0.8 + Math.sin(t * 0.0015) * 0.1 // gentle twinkle
      }
      const p = scrollProgress()
      const narrow = Math.min(1, camera.aspect / 1.5)
      const tx = Math.cos(p * Math.PI * 3) * 9.5 * narrow
      const ty = -3 + p * 4
      earth.position.x += (tx - earth.position.x) * 0.05
      earth.position.y += (ty - earth.position.y) * 0.05
      earth.position.z = -10
      earth.scale.setScalar(0.6 + 0.4 * narrow)

      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04
      camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
