import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  // Background colors with gradient shades
  const lightBg = "bg-gradient-to-br from-green-50 to-blue-50";
  const darkBg = "bg-gradient-to-br from-gray-800 to-gray-900";
  
  // Text colors
  const lightText = "text-gray-800";
  const darkText = "text-white";
  
  // Card colors
  const lightCard = "bg-white";
  const darkCard = "bg-gray-800/70 border border-gray-700";

  // Current theme colors
  const bgColor = darkMode ? darkBg : lightBg;
  const textColor = darkMode ? darkText : lightText;
  const cardColor = darkMode ? darkCard : lightCard;
  const secondaryText = darkMode ? "text-gray-300" : "text-gray-600";

  // Section header gradient colors (used for section titles)
  const sectionGradient = "bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent";

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "journey", "projects", "skills", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHireMeClick = () => {
    const sound = document.getElementById("sound");
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }

    const rect = document.getElementById("hire-button").getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    const origin = {
      x: center.x / window.innerWidth,
      y: center.y / window.innerHeight
    };

    fireConfetti(origin);
    
    // Floating emoji effect
    const emojis = ["🚀", "💻", "✨", "👨‍💻", "🔥"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const floatingEmoji = document.createElement("div");
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.position = "absolute";
    floatingEmoji.style.left = `${center.x}px`;
    floatingEmoji.style.top = `${center.y}px`;
    floatingEmoji.style.fontSize = "24px";
    floatingEmoji.style.pointerEvents = "none";
    floatingEmoji.style.zIndex = "1000";
    floatingEmoji.style.animation = "floatUp 1.5s ease-out forwards";
    
    document.body.appendChild(floatingEmoji);
    setTimeout(() => floatingEmoji.remove(), 1500);
  };

  const fireConfetti = (origin) => {
    const fire = (particleRatio, opts) => {
      confetti(
        Object.assign({}, {
          disableForReducedMotion: true,
          particleCount: Math.floor(200 * particleRatio),
          origin
        }, opts)
      );
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handlePuzzleComplete = () => {
    setPuzzleCompleted(true);
    setTimeout(() => setShowProfile(true), 1000);
  };

  // Puzzle game component with random initial order
  const PuzzleGame = () => {
    const [pieces, setPieces] = useState(() => {
      const initialPieces = [
        { id: 1, content: "P", correct: false },
        { id: 2, content: "R", correct: false },
        { id: 3, content: "O", correct: false },
        { id: 4, content: "F", correct: false },
        { id: 5, content: "I", correct: false },
        { id: 6, content: "L", correct: false },
        { id: 7, content: "E", correct: false }
      ];
      // Shuffle pieces randomly on mount
      for (let i = initialPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialPieces[i], initialPieces[j]] = [initialPieces[j], initialPieces[i]];
      }
      return initialPieces;
    });
    const [selectedPiece, setSelectedPiece] = useState(null);

    const handlePieceClick = (id) => {
      if (selectedPiece === id) {
        setSelectedPiece(null);
        return;
      }

      if (selectedPiece) {
        // Swap pieces
        const newPieces = [...pieces];
        const firstIndex = newPieces.findIndex(p => p.id === selectedPiece);
        const secondIndex = newPieces.findIndex(p => p.id === id);
        [newPieces[firstIndex], newPieces[secondIndex]] = [newPieces[secondIndex], newPieces[firstIndex]];
        setPieces(newPieces);
        setSelectedPiece(null);

        // Check if puzzle is solved
        const correctOrder = "PROFILE";
        const currentOrder = newPieces.map(p => p.content).join("");
        if (currentOrder === correctOrder) {
          handlePuzzleComplete();
        }
      } else {
        setSelectedPiece(id);
      }
    };

    return (
      <div className="relative">
        {!showProfile && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Solve the puzzle to reveal my Profile</h3>
            <div className="flex gap-2 justify-center">
              {pieces.map(piece => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg transition-all
                    ${selectedPiece === piece.id ? 
                      "bg-yellow-400 scale-110" : 
                      puzzleCompleted ? 
                      "bg-green-400" : 
                      "bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600"}
                  `}
                >
                  {piece.content}
                </button>
              ))}
            </div>
            {puzzleCompleted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 dark:text-green-400 text-center mt-4"
              >
                Puzzle solved! Revealing profile...
              </motion.p>
            )}
          </div>
        )}
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.img
              src={`${process.env.PUBLIC_URL}/profile.png`}
              alt="Nayan Das"
              className="w-72 h-auto rounded-xl shadow-xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/${darkMode ? "signature_dark.png" : "signature_light.png"}`}
              alt="Signature"
              className="absolute w-64 h-auto -bottom-8 -right-8 opacity-90 rotate-[-5deg]"
            />
          </motion.div>
        )}
      </div>
    );
  };

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript" }, 
    { name: "React.js", level: 85, icon: "react" },
    { name: "Tailwind CSS", level: 80, icon: "tailwindcss" },
    { name: "Python", level: 75, icon: "python" }, 
    { name: "SQL", level: 70, icon: "postgresql" }, 
    { name: "CSS3", level: 85, icon: "css3" },
    { name: "Redux", level: 75, icon: "redux" }, 
    { name: "Bootstrap", level: 80, icon: "bootstrap" },
    { name: "Git & GitHub", level: 85, icon: "github" }, 
    { name: "Figma", level: 70, icon: "figma" },
    { name: "PyTorch", level: 65, icon: "pytorch" },
    { name: "TensorFlow", level: 60, icon: "tensorflow" }
  ];

  const experiences = [
    { 
      year: "Aug 2019 – Sep 2019", 
      title: "Industrial Attachment", 
      company: "Summit Alliance Port Limited (SAPL)", 
      description: "Developed inventory management modules using Angular and C#. Completed assigned modules within a tight 2-week period."
    }
  ];

  const Terminal = () => {
    const commands = [
      { cmd: "nayan --skills", output: "JavaScript, React, Python, SQL, HTML5, CSS3, Redux, Bootstrap..." },
      { cmd: "nayan --contact", output: "Email: hello@nayandas.com | LinkedIn: linkedin.com/in/thenayandas" },
      { cmd: "nayan --hire", output: "Available for freelance work and full-time opportunities!" }
    ];
    
    return (
      <div className={`p-4 rounded-lg font-mono ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {commands.map((cmd, i) => (
          <div key={i} className="mb-2">
            <span className="text-green-400">$ </span>
            <span className={darkMode ? "text-white" : "text-gray-800"}>{cmd.cmd}</span>
            <div className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{cmd.output}</div>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-400">$ </span>
          <div className={`ml-1 border-r-2 border-green-400 h-6 animate-blink ${darkMode ? "opacity-80" : "opacity-100"}`}></div>
        </div>
      </div>
    );
  };

  const styles = `
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
    }
    @keyframes gradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .skill-bar-fill {
      transition: width 1.5s ease-in-out;
    }
    .nav-link {
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${darkMode ? "#4ade80" : "#1c4b32"};
      transition: width 0.3s ease;
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .active-nav::after {
      width: 100%;
    }
    .gradient-text {
      background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b);
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: gradient 3s linear infinite;
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    @media (max-width: 768px) {
      .mobile-nav {
        display: none;
      }
      .mobile-menu-button {
        display: block;
      }
    }
  `;

  return (
    <div className={`min-h-screen font-sans scroll-smooth transition-colors duration-500 ${bgColor} ${textColor}`}>
      <style>{styles}</style>
      
      <audio src="https://assets.codepen.io/1256430/whistle.mp3" id="sound" preload="auto" hidden></audio>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full ${darkMode ? "bg-gray-900" : "bg-white shadow-sm"} py-4 px-6 flex justify-between items-center z-50`}>
        <div className="flex items-center gap-6">
          <motion.div 
            className="text-2xl font-extrabold flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text">Nayan Das</span>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 text-sm items-center">
            {["home", "about", "journey", "projects", "skills", "certifications", "contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className={`nav-link ${darkMode ? "hover:text-green-400" : "hover:text-green-600"} ${activeSection === item ? `active-nav ${darkMode ? "text-green-400" : "text-green-600"}` : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full flex items-center"
          aria-label="Toggle dark mode"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={darkMode ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? (
              <span className="text-yellow-300 text-xl">☀️</span>
            ) : (
              <span className="text-gray-600 text-xl">🌙</span>
            )}
          </motion.div>
        </motion.button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 dark:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div 
          className="absolute bottom-0 left-0 h-1 bg-green-500"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className={`py-20 px-8 min-h-screen flex items-center justify-center relative overflow-hidden`}>
          {/* Floating decorative elements */}
          {!darkMode && (
            <>
              <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
              <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full bg-green-100 opacity-20 blur-xl"></div>
            </>
          )}

          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl z-10">
            {/* Text Content */}
            <motion.div 
              className="space-y-6 md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl"
                >
                  👋
                </motion.div>
                <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Hey, I'm <span className="gradient-text">Nayan</span>
                </h1>
              </div>

              <Typewriter
                options={{
                  strings: ['Frontend Developer', 'React Specialist', 'UI Enthusiast', 'Problem Solver'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                  wrapperClassName: `text-4xl md:text-5xl font-bold ${darkMode ? "text-green-300" : "text-green-600"}`,
                  cursorClassName: `text-4xl md:text-5xl ${darkMode ? "text-green-300" : "text-green-600"}`
                }}
              />

              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-xl leading-relaxed`}>
                I specialize in React.js, Tailwind CSS, and building user-focused, responsive interfaces. Experienced with data-driven applications and research-based engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  onClick={handleHireMeClick}
                  id="hire-button"
                  className={`px-8 py-3 rounded-lg font-semibold shadow-lg relative overflow-hidden ${darkMode ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900" : "bg-gradient-to-r from-green-600 to-green-700 text-white"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">HIRE ME</span>
                  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </motion.button>
                <motion.a
                  href="https://www.linkedin.com/in/thenayandas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 rounded-lg font-semibold shadow-lg relative overflow-hidden flex items-center justify-center gap-2 ${
                    darkMode ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 ${darkMode ? "fill-white" : "fill-[#1c4b32]"}`}
                    aria-label="LinkedIn"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.85 0-2.132 1.444-2.132 2.936v5.67H9.357V9.04h3.414v1.555h.048c.475-.897 1.635-1.844 3.365-1.844 3.598 0 4.263 2.368 4.263 5.448v6.253zM5.337 7.433c-1.144 0-2.063-.93-2.063-2.077 0-1.148.919-2.078 2.063-2.078 1.143 0 2.063.93 2.063 2.078 0 1.147-.92 2.077-2.063 2.077zm1.777 13.019H3.56V9.04h3.554v11.412zM22.225 0H1.771C.792 0 0 .792 0 1.771v20.452C0 23.208.792 24 1.771 24h20.452c.979 0 1.771-.792 1.771-1.771V1.771C24 .792 23.208 0 22.225 0z" />
                  </svg>
                  <span className="relative z-10">LinkedIn</span>
                  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </motion.a>
              </div>
              
              {/* Social Icons (Removed LinkedIn) */}
              <motion.div 
                className="flex space-x-6 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {[
                  { name: "GitHub", url: "https://github.com/onlynayan", icon: "github" },
                  { name: "ResearchGate", url: "https://www.researchgate.net/profile/Nayan-Das-10", icon: "researchgate" },
                  { name: "LeetCode", url: "https://leetcode.com/u/thenayandas/", icon: "leetcode" }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 flex items-center justify-center ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-100 text-gray-800"} rounded-full transition shadow-md`}
                  >
                    <img 
                      src={`https://cdn.simpleicons.org/${social.icon}/${darkMode ? "white" : "1c4b32"}`} 
                      alt={social.name}
                      className="w-5 h-5"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Profile Image with Puzzle Game */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative md:w-1/2 flex justify-center mt-12 md:mt-0"
            >
              <PuzzleGame />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className={`text-4xl font-bold mb-4 text-center ${sectionGradient}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>
          <motion.p 
            className={`max-w-3xl mx-auto text-center ${secondaryText}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm a passionate Frontend Developer with a strong base in Computer Science and a drive for building user-friendly, clean, and responsive digital products. I'm always exploring modern frameworks like React.js and love applying design thinking to frontend engineering.
          </motion.p>
          
          {/* Terminal Component */}
          <motion.div
            className="max-w-3xl mx-auto mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Terminal />
          </motion.div>
          
          {/* Animated Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[
              { value: 15, label: "Projects" },
              { value: 8, label: "Technologies" },
              { value: 5, label: "Certifications" },
              { value: 3, label: "Research Papers" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`p-6 rounded-xl ${darkMode ? "bg-gray-800/70 border border-gray-700" : "bg-white"} shadow-md`}
                whileHover={{ y: -5 }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`text-3xl font-bold ${darkMode ? "text-yellow-300" : "text-green-600"}`}>
                  <AnimatedCounter from={0} to={stat.value} />
                </div>
                <div className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* My Journey Section */}
        <section id="journey" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
  <motion.h2 
    className={`text-4xl font-bold text-center mb-10 ${sectionGradient}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <span className="gradient-text">My Journey</span>
  </motion.h2>
  <div className="relative max-w-2xl mx-auto">
    {/* Conditionally render the vertical line only in light mode */}
    {!darkMode && (
      <div className="absolute left-1/2 w-0.5 h-full bg-green-500 transform -translate-x-1/2"></div>
    )}
    {experiences.map((exp, i) => (
      <motion.div 
        key={i}
        className="relative mb-8 pl-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={`absolute top-0 ${darkMode ? 'w-3 h-3' : 'w-4 h-4'} rounded-full ${darkMode ? 'bg-gray-500/70' : 'bg-green-500'} -left-2`}></div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white'} shadow-md`}>
          <h3 className="font-bold">{exp.title}</h3>
          <p className="text-sm">{exp.company} • {exp.year}</p>
          <p className="mt-2">{exp.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

        {/* Projects */}
        <section id="projects" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className={`text-4xl font-bold text-center mb-10 ${sectionGradient}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Portfolio Website",
                description: "React.js and Tailwind CSS portfolio with smooth design and routing.",
                links: [{ text: "View Code", url: "https://github.com/onlynayan/portfolio" }],
                tags: ["React", "Tailwind"]
              },
              {
                title: "IMDB Sentiment Analysis",
                description: "Built with LSTM and Keras for sentiment classification.",
                links: [{ text: "View Project", url: "https://github.com/onlynayan/imdb-sentiment-lstm" }],
                tags: ["Python", "ML", "NLP"]
              },
              {
                title: "IoT Air Quality Monitoring",
                description: "Built IoT-based system for air quality tracking and analysis.",
                links: [{ text: "View IEEE Paper", url: "https://ieeexplore.ieee.org/document/9667912" }],
                tags: ["IoT", "Python"]
              },
              {
                title: "Blood Donor Finder",
                description: "Used ML clustering and graph-based techniques for donor search optimization.",
                links: [
                  { text: "View IEEE Paper", url: "https://ieeexplore.ieee.org/document/9392739" },
                  { text: "View Journal", url: "https://journal.unika.ac.id/index.php/sisforma/article/view/1709" }
                ],
                tags: ["ML", "Graph Theory"]
              },
              {
                title: "Breast Cancer Classification",
                description: "Built a machine learning model using SVM and KNN to classify breast cancer.",
                links: [{ text: "View Project", url: "https://github.com/onlynayan/breast-cancer-classification-ml" }],
                tags: ["ML", "Healthcare"]
              },
              {
                title: "Data Analysis Capstone Project",
                description: "Conducted exploratory data analysis and visualization on a large-scale dataset.",
                links: [{ text: "View Project", url: "https://github.com/onlynayan/data-analysis-capstone-project" }],
                tags: ["Data Analysis", "Visualization"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl shadow-md relative overflow-hidden group ${darkMode ? "bg-gray-800/70 border border-gray-700" : "bg-white"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5
                }}
              >
                <div className={`absolute inset-0 ${darkMode ? "from-gray-700 to-gray-900" : "from-green-100 to-green-200"} bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{project.title}</h3>
                  <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-gray-700 text-gray-100" : "bg-green-100 text-green-800"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-sm ${darkMode ? "text-yellow-200 hover:text-yellow-300" : "text-green-600 hover:text-green-700"} hover:underline`}
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={`py-16 px-8 relative ${darkMode ? darkBg : lightBg}`}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at center, ${
                darkMode ? "#4ade80" : "#1c4b32"
              } 0%, transparent 70%)`
            }}
          ></div>

          <motion.h2
            className={`text-4xl font-bold text-center mb-12 ${sectionGradient}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Skills</span>
          </motion.h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className={`p-4 rounded-2xl group relative ${
                  darkMode
                    ? "bg-gray-800/70 border border-gray-700"
                    : "bg-white/80 border border-green-200"
                } shadow-md hover:shadow-lg transitioned-all duration-300 backdrop-blur-sm flex flex-col`}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                  {skill.name} Expertise
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <motion.img
                    src={`https://cdn.simpleicons.org/${skill.icon}/${
                      darkMode ? "white" : "1c4b32"
                    }`}
                    alt={skill.name}
                    className="w-5 h-5"
                    whileHover={{ scale: 1.3, y: -2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-gray-800"
                    } text-sm`}
                  >
                    {skill.name}
                  </span>
                  <span
                    className={`ml-auto font-medium ${
                      darkMode ? "text-green-300" : "text-green-700"
                    } text-sm`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className={`w-full rounded-full h-3 ${
                    darkMode ? "bg-gray-600" : "bg-green-100"
                  } overflow-hidden mt-auto`}
                >
                  <motion.div
                    className="skill-bar-fill h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      background: darkMode
                        ? "linear-gradient(90deg, #facc15, #4ade80)"
                        : "linear-gradient(90deg, #1c4b32, #10b981)"
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <style jsx>{`
            .skill-bar-fill {
              position: relative;
              overflow: hidden;
            }
            .skill-bar-fill::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.3),
                transparent
              );
              animation: shimmer 2s infinite;
            }
            .group:hover .skill-bar-fill {
              filter: brightness(1.15);
            }
            @keyframes shimmer {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(200%);
              }
            }
          `}</style>
        </section>

        {/* Certifications */}
        <section id="certifications" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className={`text-4xl font-bold text-center mb-10 ${sectionGradient}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Certifications</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Neural Networks - DeepLearning.AI",
                link: "https://www.coursera.org/account/accomplishments/verify/4039L2NWWVZR"
              },
              {
                title: "Computer Vision - IBM",
                link: "https://www.coursera.org/account/accomplishments/verify/6K4HX2VYG6CF"
              },
              {
                title: "Machine Learning - Stanford",
                link: "https://www.coursera.org/account/accomplishments/verify/L3YE7P0KXYNU"
              },
              {
                title: "Python for Data Science - Dataquest.io",
                link: "https://app.dataquest.io/verify_cert/6E5M49W0XCIP0EPR2MYD/"
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${darkMode ? "bg-gray-800/70 border border-gray-700" : "bg-white"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{cert.title}</h3>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${darkMode ? "text-yellow-200 hover:text-yellow-300" : "text-green-600 hover:text-green-700"} hover:underline`}
                >
                  View License
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className={`text-4xl font-bold text-center mb-6 ${sectionGradient}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Contact Me</span>
          </motion.h2>
          <motion.div 
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`mb-6 ${secondaryText}`}>Feel free to reach out if you'd like to collaborate or have any questions.</p>
            <motion.a
              href="mailto:nayan@example.com"
              className={`inline-block ${darkMode ? "bg-yellow-400 hover:bg-yellow-500" : "bg-green-600 hover:bg-green-700"} text-white font-semibold px-6 py-3 rounded transition relative overflow-hidden group`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Email Me</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </motion.a>
          </motion.div>
        </section>

        <footer className={`text-center py-4 ${darkMode ? "bg-black" : "bg-white border-t"} text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Built with React.js and Tailwind CSS — © {new Date().getFullYear()} Nayan Das
        </footer>
      </main>
    </div>
  );
}

const AnimatedCounter = ({ from, to }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * (to - from) + from);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [from, to]);
  
  return <>{count}+</>;
};