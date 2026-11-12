/* ========================================================
   ALA — INTERACTIVE CV & 3D AMBIENT WAVE ENGINE
   Clean data binding + fluid particle wave background
   ======================================================== */

// ========================================================
// 1. POPULATE CV CONTENT FROM data.js
// ========================================================
function initCV() {
  if (typeof CV_DATA === 'undefined') return;

  // Header Status & Personal Intro
  const navStatus = document.getElementById('navStatus');
  if (navStatus && CV_DATA.personal.status) {
    navStatus.textContent = CV_DATA.personal.status;
  }

  const heroRole = document.getElementById('heroRole');
  if (heroRole && CV_DATA.personal.title) {
    heroRole.textContent = CV_DATA.personal.title;
  }

  const heroBio = document.getElementById('heroBio');
  if (heroBio && CV_DATA.personal.bio) {
    heroBio.textContent = CV_DATA.personal.bio;
  }

  // Quick Action Links in Hero
  const heroSocials = document.getElementById('heroSocials');
  if (heroSocials && CV_DATA.socials) {
    heroSocials.innerHTML = CV_DATA.socials
      .map(
        (s) => `
      <a href="${s.url}" target="_blank" class="quick-btn">
        <span>${s.icon}</span>
        <span>${s.name}</span>
      </a>
    `
      )
      .join('');
  }

  // 01 / Education
  const eduContainer = document.getElementById('educationContainer');
  if (eduContainer && CV_DATA.education) {
    eduContainer.innerHTML = CV_DATA.education
      .map(
        (e) => `
      <div class="timeline-row">
        <div class="timeline-period">${e.period}</div>
        <div class="timeline-body">
          <h4>${e.institution}</h4>
          <div class="timeline-sub">${e.degree}</div>
          <p class="timeline-details">${e.details}</p>
        </div>
      </div>
    `
      )
      .join('');
  }

  // 02 / Skills
  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer && CV_DATA.skills) {
    skillsContainer.innerHTML = Object.entries(CV_DATA.skills)
      .map(
        ([category, items]) => `
      <div class="skill-category-row">
        <div class="skill-cat-name">${category}</div>
        <div class="skill-tags-wrap">
          ${items.map((skill) => `<span class="skill-pill">${skill}</span>`).join('')}
        </div>
      </div>
    `
      )
      .join('');
  }

  // 03 / Projects
  const projectsContainer = document.getElementById('projectsContainer');
  if (projectsContainer && CV_DATA.projects) {
    projectsContainer.innerHTML = CV_DATA.projects
      .map(
        (p) => `
      <a href="${p.demo || p.github}" target="_blank" class="project-row">
        <div class="project-main">
          <div class="project-meta">
            <span class="project-year">${p.year}</span>
            <span class="project-cat">${p.category}</span>
          </div>
          <h4 class="project-name">${p.title}</h4>
          <p class="project-summary">${p.description}</p>
          <div class="project-chips">
            ${p.tags.map((t) => `<span class="p-chip">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </a>
    `
      )
      .join('');
  }

  // 04 / Interests
  const interestsContainer = document.getElementById('interestsContainer');
  if (interestsContainer && CV_DATA.interests) {
    interestsContainer.innerHTML = CV_DATA.interests
      .map(
        (item) => `
      <div class="interest-item">
        <h4 class="interest-title">${item.name}</h4>
        <p class="interest-desc">${item.desc}</p>
      </div>
    `
      )
      .join('');
  }

  // 05 / Contact
  const contactContainer = document.getElementById('contactContainer');
  if (contactContainer && CV_DATA.socials) {
    contactContainer.innerHTML = CV_DATA.socials
      .map(
        (s) => `
      <a href="${s.url}" target="_blank" class="contact-link-pill">
        <span>${s.icon}</span>
        <span>${s.name} (${s.handle})</span>
        <span>↗</span>
      </a>
    `
      )
      .join('');
  }
}
initCV();

// ========================================================
// 2. SLEEK CUSTOM CURSOR (DESKTOP)
// ========================================================
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

const mouse = {
  screenX: window.innerWidth / 2,
  screenY: window.innerHeight / 2,
  normX: 0,
  normY: 0,
  targetX: 0,
  targetY: 0
};

let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
  mouse.screenX = e.clientX;
  mouse.screenY = e.clientY;
  mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

  if (cursorDot) {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  }
});

function animateCursor() {
  if (cursorGlow) {
    glowX += (mouse.screenX - glowX) * 0.18;
    glowY += (mouse.screenY - glowY) * 0.18;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
  }
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.querySelectorAll('a, button, .skill-pill, .project-row').forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ========================================================
// 3. AMBIENT THREE.JS 3D SCENE & LIGHTING
// ========================================================
const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Soft Lighting for Robot & Environment
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
keyLight.position.set(6, 8, 8);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xa78bfa, 2.5);
rimLight.position.set(-6, 5, -5);
scene.add(rimLight);

// ========================================================
// 4. FLOATING 3D ROBOT COMPANION (FOLLOWS MOUSE)
// ========================================================
const robot = new THREE.Group();
scene.add(robot);

// Materials
const bodyMat = new THREE.MeshStandardMaterial({
  color: 0x141624,
  metalness: 0.85,
  roughness: 0.25
});

const chromeMat = new THREE.MeshStandardMaterial({
  color: 0xe0e7ff,
  metalness: 0.95,
  roughness: 0.1
});

const screenMat = new THREE.MeshStandardMaterial({
  color: 0x05060c,
  metalness: 0.3,
  roughness: 0.1
});

const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
const cyanHaloMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });

// Head Shell
const headGeom = new THREE.BoxGeometry(2.2, 1.8, 1.4);
const headMesh = new THREE.Mesh(headGeom, bodyMat);
robot.add(headMesh);

// Chrome Bezel
const bezelGeom = new THREE.BoxGeometry(2.05, 1.65, 0.12);
const bezelMesh = new THREE.Mesh(bezelGeom, chromeMat);
bezelMesh.position.z = 0.7;
robot.add(bezelMesh);

// Screen Glass
const screenGeom = new THREE.BoxGeometry(1.85, 1.45, 0.06);
const screenMesh = new THREE.Mesh(screenGeom, screenMat);
screenMesh.position.z = 0.74;
robot.add(screenMesh);

// Eye Pupils (Shift with cursor)
const eyesGroup = new THREE.Group();
eyesGroup.position.set(0, 0.05, 0.78);
robot.add(eyesGroup);

const eyeGeom = new THREE.CircleGeometry(0.22, 32);
const leftEye = new THREE.Mesh(eyeGeom, cyanGlowMat);
leftEye.position.x = -0.42;
eyesGroup.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeom, cyanGlowMat);
rightEye.position.x = 0.42;
eyesGroup.add(rightEye);

// Halo glow for eyes
const haloGeom = new THREE.CircleGeometry(0.32, 32);
const leftHalo = new THREE.Mesh(haloGeom, cyanHaloMat);
leftHalo.position.set(-0.42, 0, -0.01);
eyesGroup.add(leftHalo);

const rightHalo = new THREE.Mesh(haloGeom, cyanHaloMat);
rightHalo.position.set(0.42, 0, -0.01);
eyesGroup.add(rightHalo);

// Top Antenna & Pulsing Beacon
const antennaGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 16);
const antenna = new THREE.Mesh(antennaGeom, chromeMat);
antenna.position.set(0, 1.15, 0);
robot.add(antenna);

const beaconGeom = new THREE.SphereGeometry(0.12, 16, 16);
const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
const beacon = new THREE.Mesh(beaconGeom, beaconMat);
beacon.position.set(0, 1.45, 0);
robot.add(beacon);

// Side Ear Pods / Dials
const earGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.2, 24);
earGeom.rotateZ(Math.PI / 2);
const earL = new THREE.Mesh(earGeom, chromeMat);
earL.position.set(-1.2, 0, 0);
robot.add(earL);

const earR = new THREE.Mesh(earGeom, chromeMat);
earR.position.set(1.2, 0, 0);
robot.add(earR);

// Bottom Thruster Mount
const thrusterGeom = new THREE.CylinderGeometry(0.25, 0.35, 0.3, 16);
const thruster = new THREE.Mesh(thrusterGeom, bodyMat);
thruster.position.set(0, -1.05, 0);
robot.add(thruster);

// Orbiting digital ring around robot
const ringGeom = new THREE.RingGeometry(1.8, 1.84, 64);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
const orbitRing = new THREE.Mesh(ringGeom, ringMat);
orbitRing.rotation.x = Math.PI / 2.4;
robot.add(orbitRing);

// Set initial robot pose
function updateRobotPose() {
  const isMob = window.innerWidth <= 768;
  if (isMob) {
    robot.position.set(0, 5.0, 1.0);
    robot.scale.set(0.62, 0.62, 0.62);
  } else {
    robot.position.set(6.8, 1.5, 4.0);
    robot.scale.set(0.9, 0.9, 0.9);
  }
}
updateRobotPose();

// ========================================================
// 5. AMBIENT PARTICLE WAVE
// ========================================================
const SEPARATION = 1.2;
const AMOUNTX = 45;
const AMOUNTY = 45;
const numParticles = AMOUNTX * AMOUNTY;

const positions = new Float32Array(numParticles * 3);
const scales = new Float32Array(numParticles);

let i = 0, j = 0;
for (let ix = 0; ix < AMOUNTX; ix++) {
  for (let iy = 0; iy < AMOUNTY; iy++) {
    positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
    positions[i + 1] = 0;
    positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
    scales[j] = 1;
    i += 3;
    j++;
  }
}

const waveGeometry = new THREE.BufferGeometry();
waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
waveGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

const waveMaterial = new THREE.PointsMaterial({
  size: 0.045,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.35
});

const waveParticles = new THREE.Points(waveGeometry, waveMaterial);
waveParticles.position.set(0, -4, 0);
waveParticles.rotation.x = Math.PI / 6;
scene.add(waveParticles);

// Scroll tracking
let scrollOffset = 0;
window.addEventListener('scroll', () => {
  scrollOffset = window.scrollY * 0.003;
});

// Eye blink timer state
let isBlinking = false;
let blinkProgress = 0;
let lastBlinkTime = 0;

// Animation loop
let count = 0;
const clock = new THREE.Clock();

function animateScene() {
  requestAnimationFrame(animateScene);

  const elapsedTime = clock.getElapsedTime();

  // Smooth mouse lerp
  mouse.normX += (mouse.targetX - mouse.normX) * 0.06;
  mouse.normY += (mouse.targetY - mouse.normY) * 0.06;

  // 1. Robot Mouse Tracking & 3D Tilt
  const targetRotX = -mouse.normY * 0.45;
  const targetRotY = mouse.normX * 0.65;
  robot.rotation.x += (targetRotX - robot.rotation.x) * 0.08;
  robot.rotation.y += (targetRotY - robot.rotation.y) * 0.08;
  robot.rotation.z = Math.sin(elapsedTime * 1.2) * 0.04;

  // Gentle hovering breathing
  const isMob = window.innerWidth <= 768;
  const basePosY = isMob ? 5.0 - scrollOffset * 2.0 : 1.5 - scrollOffset * 2.5;
  robot.position.y = basePosY + Math.sin(elapsedTime * 1.8) * 0.15;

  // 2. Eye pupils shift inside the screen
  eyesGroup.position.x = mouse.normX * 0.12;
  eyesGroup.position.y = 0.05 + mouse.normY * 0.09;

  // 3. Eye Blinking Cycle
  if (elapsedTime - lastBlinkTime > 3.6) {
    isBlinking = true;
    blinkProgress = 0;
    lastBlinkTime = elapsedTime;
  }

  if (isBlinking) {
    blinkProgress += 0.18;
    const blinkScale = Math.max(0.08, Math.sin(blinkProgress * Math.PI));
    leftEye.scale.y = 1 - blinkScale * 0.92;
    rightEye.scale.y = 1 - blinkScale * 0.92;
    leftHalo.scale.y = leftEye.scale.y;
    rightHalo.scale.y = rightEye.scale.y;

    if (blinkProgress >= 1) {
      isBlinking = false;
      leftEye.scale.y = 1;
      rightEye.scale.y = 1;
      leftHalo.scale.y = 1;
      rightHalo.scale.y = 1;
    }
  }

  // 4. Pulse beacon & rotate orbit ring
  beacon.scale.setScalar(1 + Math.sin(elapsedTime * 5) * 0.18);
  orbitRing.rotation.z = elapsedTime * 0.5;

  // 5. Update Ambient Particle Wave
  const positionAttribute = waveGeometry.attributes.position;
  let pIdx = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      const waveY =
        Math.sin((ix + count) * 0.3) * 0.5 +
        Math.sin((iy + count) * 0.4) * 0.5 +
        Math.sin((ix + iy + count) * 0.2) * 0.3;

      positionAttribute.array[pIdx + 1] = waveY;
      pIdx += 3;
    }
  }

  positionAttribute.needsUpdate = true;
  count += 0.025;

  waveParticles.rotation.z = mouse.normX * 0.1;
  waveParticles.rotation.y = mouse.normX * 0.15 + scrollOffset * 0.15;
  waveParticles.position.y = -4 - scrollOffset * 1.5;

  renderer.render(scene, camera);
}
animateScene();

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  updateRobotPose();
});
