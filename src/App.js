import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Light mode colors
  const lightBg = "bg-[#f8fafc]";
  const lightText = "text-[#123524]";
  const lightCard = "bg-white";
  
  // Dark mode colors
  const darkBg = "bg-[#123524]";
  const darkText = "text-white";
  const darkCard = "bg-[#1c4b32]";

  // Current theme colors
  const bgColor = darkMode ? darkBg : lightBg;
  const textColor = darkMode ? darkText : lightText;
  const cardColor = darkMode ? darkCard : lightCard;
  const secondaryText = darkMode ? "text-green-100" : "text-green-800";

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
      const sections = ["home", "about", "projects", "skills", "certifications", "contact"];
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

  const skills = [
    { name: "JavaScript", level: 90, icon: "javascript" }, 
    { name: "React.js", level: 85, icon: "react" },
    { name: "Tailwind CSS", level: 80, icon: "tailwindcss" },
    { name: "Python", level: 75, icon: "python" }, 
    { name: "SQL", level: 70, icon: "postgresql" }, 
    { name: "HTML5", level: 95, icon: "html5" },
    { name: "CSS3", level: 85, icon: "css3" },
    { name: "Redux", level: 75, icon: "redux" }, 
    { name: "Bootstrap", level: 80, icon: "bootstrap" },
    { name: "REST APIs", level: 75, icon: "rest" },
    { name: "Git & GitHub", level: 85, icon: "github" }, 
    { name: "Figma", level: 70, icon: "figma" },
    { name: "PyTorch", level: 65, icon: "pytorch" },
    { name: "Pandas", level: 75, icon: "pandas" }, 
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

      {/* Navigation with aligned items */}
      <nav className={`fixed top-0 left-0 w-full ${darkMode ? "bg-black" : "bg-white shadow-sm"} py-4 px-6 flex justify-between items-center z-50`}>
        <div className="flex items-center gap-6">
          <motion.div 
            className="text-2xl font-extrabold flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text">Nayan</span> <span className={darkMode ? "text-white" : "text-gray-800"}>Das</span>
          </motion.div>

          {/* Desktop Navigation - aligned with name */}
          <ul className="hidden md:flex space-x-6 text-sm items-center">
            {["home", "about", "projects", "skills", "certifications", "contact"].map((item) => (
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
        <section id="home" className={`py-20 px-8 min-h-screen flex items-center justify-center ${darkMode ? "bg-[#1c4b32]" : "bg-green-50"} relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-6xl z-10">
            <motion.div 
              className="space-y-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>
                👋 Hey, I'm <span className="gradient-text">Nayan</span> <br />
                <Typewriter
                  options={{
                    strings: ['Frontend Developer', 'React Specialist', 'UI Enthusiast', 'Problem Solver'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </h1>
              <p className={`text-lg ${darkMode ? "text-green-100" : "text-green-800"} max-w-xl`}>
                I specialize in React.js, Tailwind CSS, and building user-focused, responsive interfaces. Experienced with data-driven applications and research-based engineering.
              </p>
              <motion.button
                onClick={handleHireMeClick}
                id="hire-button"
                className={`${darkMode ? "bg-yellow-300 hover:bg-yellow-400" : "bg-green-600 hover:bg-green-700"} text-white px-6 py-2 rounded font-semibold shadow-lg relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">HIRE ME</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
              </motion.button>
              
              {/* Social Icons */}
              <motion.div 
                className="flex space-x-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {[
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/thenayandas/", icon: "linkedin" },
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
                    className={`w-10 h-10 flex items-center justify-center ${darkMode ? "bg-green-800 hover:bg-green-700" : "bg-green-100 hover:bg-green-200"} rounded-full transition`}
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
            
            {/* Profile Image with Signature Overlay */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center relative"
            >
              <div className="relative">
                <img
                  src={`${process.env.PUBLIC_URL}/profile.png`}
                  alt="Nayan Das"
                  className="w-64 h-auto rounded-lg"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/signature.png`}
                  alt="Signature"
                  className="absolute w-80 lg:w-96 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-95 rotate-[-3deg] drop-shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
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
                className={`p-6 rounded-xl ${darkMode ? "bg-green-800" : "bg-green-100"}`}
                whileHover={{ y: -5 }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`text-3xl font-bold ${darkMode ? "text-yellow-300" : "text-green-600"}`}>
                  <AnimatedCounter from={0} to={stat.value} />
                </div>
                <div className={`mt-2 ${darkMode ? "text-green-100" : "text-green-700"}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Timeline - Single Item */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">My Journey</h3>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-1/2 w-0.5 h-full bg-green-500 transform -translate-x-1/2"></div>
              {experiences.map((exp, i) => (
                <motion.div 
                  key={i}
                  className="relative mb-8 pl-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <div className="absolute top-0 w-4 h-4 rounded-full bg-green-500 -left-2"></div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                    <h3 className="font-bold">{exp.title}</h3>
                    <p className="text-sm">{exp.company} • {exp.year}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className={`py-16 px-8 ${darkMode ? darkCard : "bg-green-50"}`}>
          <motion.h2 
            className="text-4xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Projects
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
                className={`p-6 rounded-xl shadow-md relative overflow-hidden group ${darkMode ? "bg-green-900" : "bg-white"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5
                }}
              >
                <div className={`absolute inset-0 ${darkMode ? "from-green-700 to-green-900" : "from-green-100 to-green-200"} bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{project.title}</h3>
                  <p className={`mb-4 ${darkMode ? "text-green-100" : "text-gray-600"}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"}`}>
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

        {/* Skills with Icons */}
        <section id="skills" className={`py-16 px-8 ${darkMode ? darkBg : lightBg}`}>
          <motion.h2 
            className="text-4xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <img 
                    src={`https://cdn.simpleicons.org/${skill.icon}/${darkMode ? 'white' : '1c4b32'}`} 
                    alt={skill.name}
                    className="w-4 h-4"
                  />
                  <span className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{skill.name}</span>
                  <span className={`ml-auto ${darkMode ? "text-green-100" : "text-green-800"}`}>{skill.level}%</span>
                </div>
                <div className={`w-full rounded-full h-2.5 ${darkMode ? "bg-green-900" : "bg-green-200"}`}>
                  <div 
                    className="skill-bar-fill h-2.5 rounded-full" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: darkMode ? "#facc15" : "#1c4b32"
                    }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className={`py-16 px-8 ${darkMode ? darkCard : "bg-green-50"}`}>
          <motion.h2 
            className="text-4xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Certifications
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
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${darkMode ? "bg-green-900" : "bg-white"}`}
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
            className="text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact Me
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

// Helper component for animated counters
const AnimatedCounter = ({ from, to }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
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