/* ========================================================
   ALA'S CV & PORTFOLIO DATA CONFIGURATION
   Easily update your bio, education, skills, and projects!
   ======================================================== */

const CV_DATA = {
  personal: {
    name: "Ala",
    title: "First-Year IT Student & AI Enthusiast",
    status: "OPEN TO COLLABORATIONS & INTERNSHIPS",
    location: "Computer Engineering Student",
    bio: "I'm a first-year IT student deeply passionate about artificial intelligence, computer engineering, and building dynamic software. I balance academic rigor with daily coding practice, algorithmic experimentation, and creative exploration in music and nature."
  },

  socials: [
    { name: "GitHub", url: "https://github.com/benabdelhafidhala", icon: "🐙", handle: "@benabdelhafidhala" },
    { name: "LinkedIn", url: "https://linkedin.com/", icon: "💼", handle: "Ala" },
    { name: "Email", url: "mailto:ala.portfolio@gmail.com", icon: "✉️", handle: "ala.portfolio@gmail.com" }
  ],

  education: [
    {
      period: "2026 — Present",
      institution: "Higher Institute of Computer Science / IT Studies",
      degree: "First-Year Computer Science & Information Technology",
      details: "Focusing on core algorithmic problem-solving, discrete mathematics, computer architecture, data structures, and procedural programming."
    }
  ],

  skills: {
    "AI & Data Science": ["Machine Learning", "Neural Networks", "Computer Vision", "Python"],
    "Web & Interactive": ["JavaScript (ES6+)", "Three.js / WebGL", "HTML5 & Modern CSS", "Responsive UI"],
    "Systems & Engineering": ["Algorithms & Data Structures", "Git & GitHub", "Linux Environment", "Object-Oriented Design"]
  },

  projects: [
    {
      title: "Interactive 3D Portfolio & CV",
      category: "Creative WebGL",
      year: "2026",
      description: "A dynamic, non-boxy digital resume with ambient 3D physics, real-time cursor interactions, and responsive typography.",
      tags: ["Three.js", "WebGL", "JavaScript", "CSS3"],
      github: "https://github.com/benabdelhafidhala/My_First_Project",
      demo: "https://benabdelhafidhala.github.io/My_First_Project/"
    },
    {
      title: "Neural Vision Playground",
      category: "Artificial Intelligence",
      year: "2026",
      description: "Experiments in computer vision pipelines, image feature extraction, and real-time facial feature tracking.",
      tags: ["Python", "OpenCV", "Machine Learning"],
      github: "https://github.com/benabdelhafidhala",
      demo: "https://github.com/benabdelhafidhala"
    },
    {
      title: "Algorithmic Sound & Melody Synthesizer",
      category: "Audio & Code",
      year: "2026",
      description: "Generative ambient audio experiments connecting mathematical sequences with digital audio frequencies.",
      tags: ["Web Audio API", "Algorithms", "Synthesizer"],
      github: "https://github.com/benabdelhafidhala",
      demo: "https://github.com/benabdelhafidhala"
    }
  ],

  interests: [
    { name: "Artificial Intelligence", desc: "Autonomous reasoning, neural networks, and computer vision." },
    { name: "Music & Rhythms", desc: "Exploring sound synthesis and lo-fi melodies while coding." },
    { name: "Nature & Hiking", desc: "Finding perspective, mental clarity, and inspiration outdoors." }
  ]
};
