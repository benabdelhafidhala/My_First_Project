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
// 3. AMBIENT THREE.JS 3D PARTICLE WAVE
// ========================================================
const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Generate Ambient Particle Grid Wave
const SEPARATION = 1.2;
const AMOUNTX = 45;
const AMOUNTY = 45;
const numParticles = AMOUNTX * AMOUNTY;

const positions = new Float32Array(numParticles * 3);
const scales = new Float32Array(numParticles);

let i = 0, j = 0;
for (let ix = 0; ix < AMOUNTX; ix++) {
  for (let iy = 0; iy < AMOUNTY; iy++) {
    positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
    positions[i + 1] = 0; // y (animated)
    positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
    scales[j] = 1;
    i += 3;
    j++;
  }
}

const waveGeometry = new THREE.BufferGeometry();
waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
waveGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

const waveMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.45
});

const waveParticles = new THREE.Points(waveGeometry, waveMaterial);
waveParticles.position.set(0, -3, 0);
waveParticles.rotation.x = Math.PI / 6;
scene.add(waveParticles);

// Scroll tracking
let scrollOffset = 0;
window.addEventListener('scroll', () => {
  scrollOffset = window.scrollY * 0.003;
});

// Animation loop
let count = 0;
function animateWave() {
  requestAnimationFrame(animateWave);

  // Smooth mouse lerp
  mouse.normX += (mouse.targetX - mouse.normX) * 0.05;
  mouse.normY += (mouse.targetY - mouse.normY) * 0.05;

  const positionAttribute = waveGeometry.attributes.position;
  let pIdx = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      // Dynamic mathematical wave formula
      const waveY =
        Math.sin((ix + count) * 0.3) * 0.6 +
        Math.sin((iy + count) * 0.4) * 0.6 +
        Math.sin((ix + iy + count) * 0.2) * 0.4;

      positionAttribute.array[pIdx + 1] = waveY;
      pIdx += 3;
    }
  }

  positionAttribute.needsUpdate = true;
  count += 0.03;

  // Gentle wave rotation based on mouse & scroll
  waveParticles.rotation.z = mouse.normX * 0.15;
  waveParticles.rotation.y = mouse.normX * 0.2 + scrollOffset * 0.2;
  waveParticles.position.y = -3 - scrollOffset * 1.5;

  renderer.render(scene, camera);
}
animateWave();

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
