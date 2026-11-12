/* ========================================================
   ALA'S PORTFOLIO DATA CONFIGURATION
   Edit your links, projects, and info here easily!
   ======================================================== */

const PORTFOLIO_DATA = {
  // Personal Info
  personal: {
    name: "Ala",
    tagline: "First-Year IT Student & AI Engineering Enthusiast",
    status: "AVAILABLE FOR COLLABORATIONS",
    location: "Global",
    bio: "Passionate about machine learning, computer engineering, and crafting immersive 3D digital experiences. Exploring code, melody, and nature daily."
  },

  // Social & Professional Profiles
  socials: [
    {
      name: "GitHub",
      username: "@AlaDev",
      url: "https://github.com/",
      icon: "🐙",
      badge: "Code & Repos",
      primary: true
    },
    {
      name: "LinkedIn",
      username: "Ala - IT Student",
      url: "https://linkedin.com/",
      icon: "💼",
      badge: "Network",
      primary: false
    },
    {
      name: "Twitter / X",
      username: "@ala_codes",
      url: "https://x.com/",
      icon: "🐦",
      badge: "Updates",
      primary: false
    },
    {
      name: "Instagram",
      username: "@ala.vibes",
      url: "https://instagram.com/",
      icon: "📸",
      badge: "Creative",
      primary: false
    },
    {
      name: "Email Me",
      username: "ala.portfolio@gmail.com",
      url: "mailto:ala.portfolio@gmail.com",
      icon: "✉️",
      badge: "Direct Contact",
      primary: true
    }
  ],

  // Featured Projects & Works
  projects: [
    {
      id: 1,
      title: "Interactive 3D AI Portfolio",
      category: "Creative WebGL / 3D",
      description: "My personal 3D interactive portfolio featuring real-time Three.js robot animations, physics-based mouse tracking, and smooth scroll choreography.",
      tags: ["Three.js", "WebGL", "JavaScript", "CSS3"],
      status: "Active",
      github: "https://github.com/",
      demo: "#hero"
    },
    {
      id: 2,
      title: "AI Vision & Neural Playground",
      category: "Artificial Intelligence",
      description: "Experiments with computer vision and neural network pipelines. Exploring real-time face tracking and object detection models.",
      tags: ["Python", "OpenCV", "TensorFlow", "Math"],
      status: "In Development",
      github: "https://github.com/",
      demo: "https://github.com/"
    },
    {
      id: 3,
      title: "Algorithmic Sound & Melody Synth",
      category: "Audio & Code",
      description: "Generative ambient music visualizer that translates code rhythms and Fibonacci sequences into soothing lo-fi soundscapes.",
      tags: ["Web Audio API", "Algorithms", "Synthesizer"],
      status: "Prototype",
      github: "https://github.com/",
      demo: "https://github.com/"
    },
    {
      id: 4,
      title: "Nature Explorer & Trails Tracker",
      category: "Full-Stack Concept",
      description: "Minimalist hiking and outdoor sanctuary locator helping developers disconnect from screens and find tranquility in nature.",
      tags: ["Geolocation", "JavaScript", "Leaflet", "UX"],
      status: "Concept",
      github: "https://github.com/",
      demo: "https://github.com/"
    }
  ],

  // Core Tech Skills
  skills: [
    { name: "Artificial Intelligence", level: "Exploring Daily", icon: "🧠" },
    { name: "Three.js / WebGL", level: "Interactive 3D", icon: "🌐" },
    { name: "JavaScript / ES6+", level: "Core Architecture", icon: "⚡" },
    { name: "Python", level: "Scripting & AI", icon: "🐍" },
    { name: "HTML5 / Modern CSS", level: "Clean Aesthetics", icon: "🎨" },
    { name: "Computer Systems", level: "First-Year Studies", icon: "💻" }
  ]
};
