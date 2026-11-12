/* ========================================================
   ALA'S PORTFOLIO — 3D QUANTUM NEURAL ATOM CORE
   Interactive WebGL Science & AI Visualization
   ======================================================== */

// ========================================================
// 1. POPULATE DATA FROM data.js
// ========================================================
function initData() {
  if (typeof PORTFOLIO_DATA === 'undefined') return;

  const statusEl = document.getElementById('profileStatus');
  if (statusEl && PORTFOLIO_DATA.personal) {
    statusEl.textContent = `SYSTEM ONLINE · ${PORTFOLIO_DATA.personal.status || 'READY'}`;
  }

  // Render Projects
  const projectsEl = document.getElementById('projectsContainer');
  if (projectsEl && PORTFOLIO_DATA.projects) {
    projectsEl.innerHTML = PORTFOLIO_DATA.projects
      .map(
        (p) => `
      <div class="project-card">
        <div>
          <span class="card-cat">${p.category}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="tag-list">
            ${p.tags.map((t) => `<span class="tag-badge">${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-links">
          <a href="${p.github}" target="_blank" class="card-link">GitHub ↗</a>
          <a href="${p.demo}" class="card-link">Launch Experiment ↗</a>
        </div>
      </div>
    `
      )
      .join('');
  }

  // Render Socials
  const socialsEl = document.getElementById('socialsContainer');
  if (socialsEl && PORTFOLIO_DATA.socials) {
    socialsEl.innerHTML = PORTFOLIO_DATA.socials
      .map(
        (s) => `
      <a href="${s.url}" target="_blank" class="social-pill ${s.primary ? 'primary' : ''}">
        <span><span class="social-icon">${s.icon}</span>${s.name}</span>
        <span class="arrow">↗</span>
      </a>
    `
      )
      .join('');
  }
}
initData();

// ========================================================
// 2. SLEEK CUSTOM CURSOR
// ========================================================
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

const mouse = {
  screenX: window.innerWidth / 2,
  screenY: window.innerHeight / 2,
  targetX: 0,
  targetY: 0,
  x: 0,
  y: 0,
  isDragging: false,
  prevX: 0,
  prevY: 0,
  dragRotY: 0,
  dragRotX: 0,
  speed: 0
};

let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let lastMoveTime = performance.now();

window.addEventListener('mousemove', (e) => {
  const now = performance.now();
  const dt = Math.max(1, now - lastMoveTime);
  const dist = Math.hypot(e.clientX - mouse.screenX, e.clientY - mouse.screenY);
  mouse.speed = Math.min(3, dist / dt);
  lastMoveTime = now;

  mouse.screenX = e.clientX;
  mouse.screenY = e.clientY;
  mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

  if (cursorDot) {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  }

  if (mouse.isDragging) {
    const dx = e.clientX - mouse.prevX;
    const dy = e.clientY - mouse.prevY;
    mouse.dragRotY += dx * 0.008;
    mouse.dragRotX += dy * 0.008;
    mouse.prevX = e.clientX;
    mouse.prevY = e.clientY;
  }
});

window.addEventListener('mousedown', (e) => {
  mouse.isDragging = true;
  mouse.prevX = e.clientX;
  mouse.prevY = e.clientY;
});

window.addEventListener('mouseup', () => {
  mouse.isDragging = false;
});

function updateCursor() {
  if (cursorGlow) {
    glowX += (mouse.screenX - glowX) * 0.18;
    glowY += (mouse.screenY - glowY) * 0.18;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
  }
  requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

document.querySelectorAll('a, button, .project-card, .social-pill').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ========================================================
// 3. THREE.JS 3D QUANTUM NEURAL SCENE
// ========================================================
const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 7.8);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ========================================================
// 4. ATOM & NEURAL BRAIN ENTITY CONSTRUCTION
// ========================================================
const atomGroup = new THREE.Group();
scene.add(atomGroup);

const isMobile = window.innerWidth <= 1024;
atomGroup.position.set(isMobile ? 0 : 2.2, 0, 0);

// State mode configuration
let currentMode = 'neural';
let energyMultiplier = 1.0;
let targetScale = 1.0;

// A. Central Nucleus (Pulsating Quantum Core)
const nucleusGeom = new THREE.IcosahedronGeometry(0.72, 3);
const nucleusMat = new THREE.MeshBasicMaterial({
  color: 0x38bdf8,
  wireframe: true,
  transparent: true,
  opacity: 0.65
});
const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
atomGroup.add(nucleusMesh);

// Inner Core Energy Ball
const innerCoreGeom = new THREE.SphereGeometry(0.48, 32, 32);
const innerCoreMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.95
});
const innerCoreMesh = new THREE.Mesh(innerCoreGeom, innerCoreMat);
atomGroup.add(innerCoreMesh);

// B. Quantum Electron Orbital Rings
const ringsCount = 3;
const orbitalRings = [];
const electrons = [];

const ringMaterials = [
  new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
];

const ringRotations = [
  { x: Math.PI / 3, y: 0, z: Math.PI / 4 },
  { x: -Math.PI / 3, y: Math.PI / 4, z: 0 },
  { x: 0, y: Math.PI / 3, z: -Math.PI / 4 }
];

for (let i = 0; i < ringsCount; i++) {
  const ringGeom = new THREE.RingGeometry(1.65 + i * 0.12, 1.68 + i * 0.12, 64);
  const ring = new THREE.Mesh(ringGeom, ringMaterials[i]);
  ring.rotation.set(ringRotations[i].x, ringRotations[i].y, ringRotations[i].z);
  atomGroup.add(ring);
  orbitalRings.push(ring);

  // Orbiting Electron Nodes
  const electronGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const electronMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x38bdf8 : i === 1 ? 0xffffff : 0xa78bfa });
  const electron = new THREE.Mesh(electronGeom, electronMat);
  atomGroup.add(electron);
  electrons.push({ mesh: electron, ringIndex: i, angle: (i * Math.PI * 2) / ringsCount, radius: 1.66 + i * 0.12 });
}

// C. Neural Synapse Network (Brain Nodes & Connections)
const neuralNodesCount = 60;
const neuralPositions = [];
const neuralVelocities = [];

for (let i = 0; i < neuralNodesCount; i++) {
  // Distribute in a spherical cloud (like a brain lobe)
  const u = Math.random();
  const v = Math.random();
  const theta = u * 2.0 * Math.PI;
  const phi = Math.acos(2.0 * v - 1.0);
  const r = 1.0 + Math.random() * 0.9;

  const sinPhi = Math.sin(phi);
  const x = r * sinPhi * Math.cos(theta);
  const y = r * sinPhi * Math.sin(theta);
  const z = r * Math.cos(phi);

  neuralPositions.push(new THREE.Vector3(x, y, z));
  neuralVelocities.push(
    new THREE.Vector3((Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.003, (Math.random() - 0.5) * 0.003)
  );
}

// Neural Node Points
const neuralNodesGeom = new THREE.BufferGeometry().setFromPoints(neuralPositions);
const neuralNodesMat = new THREE.PointsMaterial({
  size: 0.065,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.85
});
const neuralPoints = new THREE.Points(neuralNodesGeom, neuralNodesMat);
atomGroup.add(neuralPoints);

// Dynamic Neural Synapse Lines
const maxLines = 180;
const linePositions = new Float32Array(maxLines * 6);
const lineColors = new Float32Array(maxLines * 6);

const linesGeom = new THREE.BufferGeometry();
linesGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
linesGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

const linesMat = new THREE.LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.45,
  blending: THREE.AdditiveBlending
});
const neuralLines = new THREE.LineSegments(linesGeom, linesMat);
atomGroup.add(neuralLines);

// D. Ambient Floating Cosmic Dust
const cosmicDustCount = 140;
const dustPos = new Float32Array(cosmicDustCount * 3);
for (let i = 0; i < cosmicDustCount * 3; i += 3) {
  dustPos[i] = (Math.random() - 0.5) * 16;
  dustPos[i + 1] = (Math.random() - 0.5) * 16;
  dustPos[i + 2] = (Math.random() - 0.5) * 10;
}
const dustGeom = new THREE.BufferGeometry();
dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
  size: 0.035,
  color: 0xa78bfa,
  transparent: true,
  opacity: 0.45
});
const dustParticles = new THREE.Points(dustGeom, dustMat);
scene.add(dustParticles);

// ========================================================
// 5. SCIENTIFIC MODE CONTROLLERS
// ========================================================
const modeButtons = document.querySelectorAll('.mode-btn');
const coreStatusText = document.getElementById('coreStatusText');
const controllerHint = document.getElementById('controllerHint');

const modeDescriptions = {
  neural: {
    status: "MODE: NEURAL SYNAPSE",
    hint: "Synaptic connections are firing. Dense interconnected neural pathways processing logic in real-time.",
    nucleusColor: 0x38bdf8,
    nodeColor: 0x38bdf8,
    speed: 1.0,
    scale: 1.0
  },
  quantum: {
    status: "MODE: QUANTUM ATOM",
    hint: "Electron orbits accelerated. Quantum superposition and wave interference visual active.",
    nucleusColor: 0xffffff,
    nodeColor: 0xa78bfa,
    speed: 2.2,
    scale: 1.15
  },
  surge: {
    status: "MODE: SYNAPTIC SURGE",
    hint: "High-frequency neural discharge! Synapses pulsing with maximum algorithmic energy.",
    nucleusColor: 0xf472b6,
    nodeColor: 0xf472b6,
    speed: 3.5,
    scale: 1.25
  },
  void: {
    status: "MODE: DEEP SPACE",
    hint: "Minimal cosmic equilibrium. Serene low-entropy rotation in quantum vacuum.",
    nucleusColor: 0x6366f1,
    nodeColor: 0x64748b,
    speed: 0.4,
    scale: 0.9
  }
};

modeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    modeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const mode = btn.getAttribute('data-mode');
    currentMode = mode;
    const config = modeDescriptions[mode];

    if (config) {
      energyMultiplier = config.speed;
      targetScale = config.scale;
      nucleusMat.color.setHex(config.nucleusColor);
      neuralNodesMat.color.setHex(config.nodeColor);

      if (coreStatusText) coreStatusText.textContent = config.status;
      if (controllerHint) {
        controllerHint.style.opacity = '0';
        setTimeout(() => {
          controllerHint.textContent = config.hint;
          controllerHint.style.opacity = '1';
        }, 150);
      }
    }
  });
});

// ========================================================
// 6. SCROLL INTERACTION & CAMERA POSE
// ========================================================
let scrollProgress = 0;

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = Math.min(1, Math.max(0, window.scrollY / (max || 1)));
});

function getPose(progress) {
  const isMob = window.innerWidth <= 1024;
  if (isMob) {
    return { x: 0, y: -progress * 1.5, z: -progress * 2, rotY: 0 };
  }

  if (progress < 0.28) {
    // Hero: On right, prominent
    return { x: 2.2, y: 0, z: 0, rotY: -0.2 };
  } else if (progress < 0.65) {
    // About: Moves to left, floating next to the text
    return { x: -2.3, y: 0.2, z: 0.4, rotY: 0.35 };
  } else {
    // Projects & Contact: Higher and centered in deep background
    return { x: 0, y: 0.6, z: -1.2, rotY: 0 };
  }
}

// ========================================================
// 7. MAIN 60 FPS RENDER LOOP
// ========================================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime() * energyMultiplier;

  // Smooth mouse lerp
  mouse.x += (mouse.targetX - mouse.x) * 0.08;
  mouse.y += (mouse.targetY - mouse.y) * 0.08;

  // Natural levitation breathing
  const hoverY = Math.sin(elapsed * 1.5) * 0.1;

  // Scroll pose lerp
  const pose = getPose(scrollProgress);
  atomGroup.position.x += (pose.x - atomGroup.position.x) * 0.06;
  atomGroup.position.y += (pose.y + hoverY - atomGroup.position.y) * 0.06;
  atomGroup.position.z += (pose.z - atomGroup.position.z) * 0.06;

  // Scale transition
  atomGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

  // Smooth 3D Rotation (combination of mouse look + user drag + continuous spin)
  const targetRotY = pose.rotY + mouse.x * 0.45 + mouse.dragRotY + elapsed * 0.15;
  const targetRotX = -mouse.y * 0.3 + mouse.dragRotX;

  atomGroup.rotation.y = targetRotY;
  atomGroup.rotation.x += (targetRotX - atomGroup.rotation.x) * 0.08;

  // A. Animate Nucleus Pulse & Deformation
  const pulse = 1.0 + Math.sin(elapsed * 4.0) * 0.08 + mouse.speed * 0.05;
  nucleusMesh.scale.set(pulse, pulse, pulse);
  nucleusMesh.rotation.x = elapsed * 0.3;
  nucleusMesh.rotation.y = elapsed * 0.4;

  const innerPulse = 1.0 + Math.cos(elapsed * 3.5) * 0.12;
  innerCoreMesh.scale.set(innerPulse, innerPulse, innerPulse);

  // B. Animate Orbiting Electrons along Rings
  electrons.forEach((el) => {
    el.angle += 0.04 * energyMultiplier + mouse.speed * 0.03;
    const ring = orbitalRings[el.ringIndex];

    // Local circular point
    const lx = Math.cos(el.angle) * el.radius;
    const ly = Math.sin(el.angle) * el.radius;
    const pos = new THREE.Vector3(lx, ly, 0).applyEuler(ring.rotation);
    el.mesh.position.copy(pos);
  });

  // Rotate Orbital Rings independently
  orbitalRings[0].rotation.z += 0.008 * energyMultiplier;
  orbitalRings[1].rotation.x += 0.009 * energyMultiplier;
  orbitalRings[2].rotation.y += 0.007 * energyMultiplier;

  // C. Update Neural Synapse Connections
  let lineIndex = 0;
  const posAttr = linesGeom.attributes.position;
  const colorAttr = linesGeom.attributes.color;
  const connectionDistance = 0.95;

  for (let i = 0; i < neuralNodesCount; i++) {
    // Gentle internal movement
    neuralPositions[i].add(neuralVelocities[i]);
    if (neuralPositions[i].length() > 2.0 || neuralPositions[i].length() < 0.9) {
      neuralVelocities[i].negate();
    }

    // Connect close neighbors
    for (let j = i + 1; j < neuralNodesCount; j++) {
      if (lineIndex >= maxLines) break;

      const d = neuralPositions[i].distanceTo(neuralPositions[j]);
      if (d < connectionDistance) {
        const p1 = neuralPositions[i];
        const p2 = neuralPositions[j];

        const idx = lineIndex * 6;
        linePositions[idx] = p1.x;
        linePositions[idx + 1] = p1.y;
        linePositions[idx + 2] = p1.z;

        linePositions[idx + 3] = p2.x;
        linePositions[idx + 4] = p2.y;
        linePositions[idx + 5] = p2.z;

        // Pulse color along the synapse
        const intensity = (1 - d / connectionDistance) * (0.5 + Math.sin(elapsed * 5.0 + i) * 0.5);
        lineColors[idx] = 0.22 * intensity;
        lineColors[idx + 1] = 0.74 * intensity;
        lineColors[idx + 2] = 0.97 * intensity;

        lineColors[idx + 3] = 0.65 * intensity;
        lineColors[idx + 4] = 0.54 * intensity;
        lineColors[idx + 5] = 0.98 * intensity;

        lineIndex++;
      }
    }
  }

  // Clear remaining lines
  for (let i = lineIndex * 6; i < maxLines * 6; i++) {
    linePositions[i] = 0;
    lineColors[i] = 0;
  }

  posAttr.needsUpdate = true;
  colorAttr.needsUpdate = true;
  neuralNodesGeom.setFromPoints(neuralPositions);

  // D. Cosmic Dust drift
  dustParticles.rotation.y = elapsed * 0.02;

  // Subtle camera parallax
  camera.position.x += (mouse.x * 0.25 - camera.position.x) * 0.04;
  camera.position.y += (mouse.y * 0.15 - camera.position.y) * 0.04;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
