/* CtrlCap hero scene — "systems constellation".
   Five glowing nodes around the draw board, light pulses travelling along
   the connections, drifting dust, and a slow parallax toward the cursor.
   Desktop only, WebGL only, pauses when the hero is off-screen. */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const container = document.getElementById('hero-scene');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = window.matchMedia('(min-width: 961px)').matches;

if (container && desktop && !reduce) {
  try { init(); } catch (e) { console.warn('hero scene skipped:', e.message); }
}

function glowTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 15);

  const world = new THREE.Group();
  scene.add(world);

  // World units: at z=0 the visible half-height is ~5.2, half-width ~5.2*aspect.
  // The DOM board sits in the right half; nodes ring around it, the core sits behind it.
  const amber = 0xf5a623, cyan = 0x5fd0ff;
  const nodes = [
    { name: 'Monday.com',          pos: [4.6,  0.2, -2.2], color: amber, r: 0.55, core: true },
    { name: 'Salesforce',          pos: [0.9,  3.5, -1.0], color: cyan,  r: 0.16 },
    { name: 'Snowflake',           pos: [8.3,  3.6, -1.6], color: cyan,  r: 0.16 },
    { name: 'The Mortgage Office', pos: [7.2, -4.6, -0.8], color: cyan,  r: 0.16 },
    { name: 'Your CRM',            pos: [1.1, -3.9, -1.4], color: cyan,  r: 0.16 },
    { name: 'QuickBooks',          pos: [-7.2, 4.1, -3.4], color: cyan,  r: 0.13 },
  ];

  const texSoft = glowTexture('rgba(255,255,255,0.95)', 'rgba(255,255,255,0.18)');
  const nodeObjs = [];
  for (const n of nodes) {
    const g = new THREE.Group();
    g.position.set(...n.pos);
    // halo
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft, color: n.color, transparent: true, opacity: n.core ? 0.55 : 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.setScalar(n.core ? 7.5 : 1.9);
    g.add(halo);
    // body
    const body = new THREE.Mesh(new THREE.SphereGeometry(n.r, 24, 24), new THREE.MeshBasicMaterial({ color: n.core ? 0xffd27a : 0xdff6ff }));
    g.add(body);
    // ring
    if (!n.core) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(n.r * 1.9, n.r * 2.05, 40), new THREE.MeshBasicMaterial({ color: n.color, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
      g.add(ring);
      g.userData.ring = ring;
    }
    g.userData.node = n;
    g.userData.phase = Math.random() * Math.PI * 2;
    world.add(g);
    nodeObjs.push(g);
  }

  // Connections from the core to each satellite, gently curved.
  const core = nodeObjs[0];
  const links = [];
  for (let i = 1; i < nodeObjs.length; i++) {
    const a = core.position.clone(), b = nodeObjs[i].position.clone();
    const mid = a.clone().lerp(b, 0.5);
    mid.z += 1.2; mid.y += (i % 2 ? 0.6 : -0.6);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(48);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.22 }));
    world.add(line);
    // pulses
    const pulses = [];
    for (let k = 0; k < 2; k++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSoft, color: k ? amber : cyan, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.scale.setScalar(0.42);
      s.userData.t = Math.random();
      s.userData.speed = 0.06 + Math.random() * 0.05;
      s.userData.dir = k ? -1 : 1;
      world.add(s);
      pulses.push(s);
    }
    links.push({ curve, pulses });
  }

  // Dust
  const N = 520;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 2] = -Math.random() * 12;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ map: texSoft, color: 0x9fd8ff, size: 0.16, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  world.add(dust);

  // Labels (HTML) that follow the satellites
  const labels = nodeObjs.slice(1).map(g => {
    const el = document.createElement('span');
    el.className = 'scene-label';
    el.textContent = g.userData.node.name;
    container.appendChild(el);
    return { el, g };
  });

  // Parallax
  const target = new THREE.Vector2(0, 0), cur = new THREE.Vector2(0, 0);
  window.addEventListener('pointermove', (e) => {
    target.set((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
  }, { passive: true });

  // Pause off-screen
  let visible = true;
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) tick(); }, { threshold: 0 }).observe(container);

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  const v = new THREE.Vector3();
  const clock = new THREE.Clock();
  let raf = 0;
  function tick() {
    if (!visible) { raf = 0; return; }
    const t = clock.getElapsedTime();
    cur.lerp(target, 0.04);
    camera.position.x = cur.x * 0.9;
    camera.position.y = -cur.y * 0.6;
    camera.lookAt(0.6, 0, 0);
    world.rotation.y = Math.sin(t * 0.12) * 0.05;
    world.rotation.x = Math.cos(t * 0.1) * 0.03;
    dust.rotation.y = t * 0.012;
    dust.position.y = Math.sin(t * 0.2) * 0.3;
    for (const g of nodeObjs) {
      const p = g.userData.phase;
      g.position.y = g.userData.node.pos[1] + Math.sin(t * 0.6 + p) * 0.18;
      g.position.x = g.userData.node.pos[0] + Math.cos(t * 0.4 + p) * 0.08;
      if (g.userData.ring) { g.userData.ring.lookAt(camera.position); g.userData.ring.material.opacity = 0.35 + Math.sin(t * 2 + p) * 0.2; }
      if (g.userData.node.core) g.children[0].material.opacity = 0.45 + Math.sin(t * 1.3) * 0.1;
    }
    for (const L of links) {
      for (const s of L.pulses) {
        s.userData.t = (s.userData.t + s.userData.speed * 0.016 * s.userData.dir + 1) % 1;
        L.curve.getPoint(s.userData.t, v);
        s.position.copy(v);
        // fade pulses near the core so they look absorbed
        s.material.opacity = 0.35 + 0.6 * Math.sin(s.userData.t * Math.PI);
      }
    }
    // labels
    const w = container.clientWidth, h = container.clientHeight;
    for (const { el, g } of labels) {
      v.copy(g.position).applyMatrix4(world.matrixWorld).project(camera);
      const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
      el.style.transform = `translate(${x.toFixed(1)}px, ${(y + 16).toFixed(1)}px) translate(-50%, 0)`;
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();
  container.classList.add('is-live');
}
