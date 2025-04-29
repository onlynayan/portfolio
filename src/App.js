import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Home, User, Book, Wrench, FileText, Mail } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

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
    { name: "JavaScript" }, { name: "React.js" }, { name: "Tailwind CSS" },
    { name: "Python" }, { name: "SQL" }, { name: "HTML5" }, { name: "CSS3" },
    { name: "Redux" }, { name: "Bootstrap" }, { name: "REST APIs" },
    { name: "Git & GitHub" }, { name: "Figma" }, { name: "PyTorch" },
    { name: "Pandas" }, { name: "TensorFlow" }
  ];

  const bgDark = "bg-[#123524]";
  const bgLight = "bg-[#1c4b32]";
  const bgTone = darkMode ? bgDark : bgLight;

  return (
    <div className={`min-h-screen font-sans text-white scroll-smooth transition-colors duration-500 ${bgDark}`}>
      <audio src="https://assets.codepen.io/1256430/whistle.mp3" id="sound" preload="auto" hidden></audio>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white py-4 px-6 flex justify-between items-center z-50">
        <div className="text-2xl font-extrabold">
          <span className="text-[#1c4b32]">Nayan</span> <span className="text-white">Das</span>
        </div>
        <ul className="flex space-x-6 text-sm">
          <li><a href="#home" className="hover:text-green-400">Home</a></li>
          <li><a href="#about" className="hover:text-green-400">About</a></li>
          <li><a href="#projects" className="hover:text-green-400">Projects</a></li>
          <li><a href="#skills" className="hover:text-green-400">Skills</a></li>
          <li><a href="#certifications" className="hover:text-green-400">Certifications</a></li>
          <li><a href="#contact" className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">Contact</a></li>
        </ul>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className={`${bgLight} py-20 px-8 min-h-screen flex items-center justify-center`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-6xl">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-white">
                👋 Hey, I’m Nayan <br /> Frontend Developer
              </h1>
              <p className="text-lg text-green-100 max-w-xl">
                I specialize in React.js, Tailwind CSS, and building user-focused, responsive interfaces. Experienced with data-driven applications and research-based engineering.
              </p>
              <button
                onClick={handleHireMeClick}
                id="hire-button"
                className="bg-yellow-300 hover:bg-yellow-500 text-black px-6 py-2 rounded font-semibold shadow-lg"
              >
                HIRE ME
              </button>
              {/* Social Icons */}
              <div className="flex space-x-6 mt-6">
                <a href="https://www.linkedin.com/in/thenayandas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className="w-6 h-6 text-white hover:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 24h5V7H0v17zM7.5 7H12v2.44h.07c.63-1.2 2.18-2.45 4.48-2.45 4.8 0 5.7 3.16 5.7 7.26V24h-5v-6.83c0-1.63-.03-3.74-2.28-3.74-2.29 0-2.64 1.8-2.64 3.63V24h-5V7z" />
                  </svg>
                </a>
                <a href="https://github.com/onlynayan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg className="w-6 h-6 text-white hover:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.4 0 12.08c0 5.34 3.44 9.86 8.2 11.46.6.12.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.63-4.04-1.63-.55-1.4-1.34-1.77-1.34-1.77-1.1-.77.08-.75.08-.75 1.2.09 1.84 1.26 1.84 1.26 1.08 1.88 2.82 1.34 3.5 1.03.11-.8.42-1.34.76-1.65-2.67-.31-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.13-.3-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.24a11.3 11.3 0 013.01-.41c1.02 0 2.05.14 3.01.41 2.28-1.57 3.29-1.24 3.29-1.24.66 1.66.25 2.9.12 3.2.77.85 1.23 1.93 1.23 3.25 0 4.63-2.8 5.64-5.48 5.94.43.37.81 1.11.81 2.24 0 1.62-.01 2.93-.01 3.33 0 .32.22.7.83.58C20.56 21.94 24 17.42 24 12.08 24 5.4 18.63 0 12 0z" />
                  </svg>
                </a>
                <a href="https://www.researchgate.net/profile/Nayan-Das-10" target="_blank" rel="noopener noreferrer" aria-label="ResearchGate">
                  <svg className="w-6 h-6 text-white hover:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 0v24h24V0H0zm13.1 13.8h-2.3V10h-1.6v7.7H12c.8 0 1.3-.2 1.6-.6.3-.4.5-.9.5-1.5 0-.8-.3-1.4-.9-1.8zM21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
                  </svg>
                </a>
                <a href="https://leetcode.com/u/thenayandas/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                  <svg className="w-6 h-6 text-white hover:text-green-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.8 15.6l-1.2 1.2-6.6-6.6L16.6 3l1.2 1.2-5.4 5.4 5.4 5.4zm3.2-3.6c0 .5-.2.9-.5 1.3l-7.1 7.1c-.4.4-.8.6-1.3.6s-.9-.2-1.3-.5L2.9 12.9c-.4-.4-.5-.8-.5-1.3s.2-.9.5-1.3L11 2.9c.4-.4.8-.5 1.3-.5s.9.2 1.3.5l1.1 1.1-1.2 1.2-1.1-1.1L4.1 12l7.2 7.2 7.2-7.2L17.8 10l1.2-1.2 1.1 1.1c.3.4.5.8.5 1.3z" />
                  </svg>
                </a>
              </div>
            </div>
            <img
              src="/profile.png"
              alt="Nayan Das"
              className="w-64 h-auto rounded-xl transition duration-300 ease-in-out transform hover:scale-150"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-16 px-8 ${bgDark} text-center`}>
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="max-w-3xl mx-auto text-green-100">
            I'm a passionate Frontend Developer with a strong base in Computer Science and a drive for building user-friendly, clean, and responsive digital products. I'm always exploring modern frameworks like React.js and love applying design thinking to frontend engineering.
          </p>
        </section>

        {/* Projects */}
        <section id="projects" className={`py-16 px-8 ${bgLight}`}>
          <h2 className="text-4xl font-bold text-center mb-10">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
              <p className="text-green-100 mb-2">React.js and Tailwind CSS portfolio with smooth design and routing.</p>
              <a href="#" className="text-yellow-200 hover:underline">View Code</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">IMDB Sentiment Analysis</h3>
              <p className="text-green-100 mb-2">Built with LSTM and Keras for sentiment classification.</p>
              <a href="#" className="text-yellow-200 hover:underline">View Project</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">IoT Air Quality Monitoring</h3>
              <p className="text-green-100 mb-2">Built IoT-based system for air quality tracking and analysis.</p>
              <a href="https://ieeexplore.ieee.org/document/9392739" className="text-yellow-200 hover:underline">View IEEE Paper</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Blood Donor Finder</h3>
              <p className="text-green-100 mb-2">Used ML clustering and graph-based techniques for donor search optimization.</p>
              <div className="space-x-4">
                <a href="https://ieeexplore.ieee.org/document/9392739" className="text-yellow-200 hover:underline">View IEEE Paper</a>
                <a href="https://journal.unika.ac.id/index.php/sisforma/article/view/1709" className="text-yellow-200 hover:underline">View Journal</a>
              </div>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Breast Cancer Classification</h3>
              <p className="text-green-100 mb-2">Built a machine learning model using SVM and KNN to classify breast cancer as malignant or benign based on clinical features.</p>
              <a href="https://github.com/onlynayan/breast-cancer-classification-ml" className="text-yellow-200 hover:underline">View Project</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Data Analysis Capstone Project</h3>
              <p className="text-green-100 mb-2">Conducted exploratory data analysis and visualization on a large-scale dataset to uncover business insights and trends.</p>
              <a href="https://github.com/onlynayan/data-analysis-capstone-project" className="text-yellow-200 hover:underline">View Project</a>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={`py-16 px-8 ${bgDark}`}>
          <h2 className="text-4xl font-bold text-center mb-10">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <span key={i} className="bg-yellow-300 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-medium shadow">
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className={`py-16 px-8 ${bgLight}`}>
          <h2 className="text-4xl font-bold text-center mb-10">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Neural Networks - DeepLearning.AI</h3>
              <a href="https://www.coursera.org/account/accomplishments/verify/4039L2NWWVZR" className="text-yellow-200 hover:underline">View License</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Computer Vision - IBM</h3>
              <a href="https://www.coursera.org/account/accomplishments/verify/6K4HX2VYG6CF" className="text-yellow-200 hover:underline">View License</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Machine Learning - Stanford</h3>
              <a href="https://www.coursera.org/account/accomplishments/verify/L3YE7P0KXYNU" className="text-yellow-200 hover:underline">View License</a>
            </div>
            <div className="bg-green-900 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Python for Data Science - Dataquest.io</h3>
              <a href="https://app.dataquest.io/verify_cert/6E5M49W0XCIP0EPR2MYD/" className="text-yellow-200 hover:underline">View License</a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`py-16 px-8 ${bgDark}`}>
          <h2 className="text-4xl font-bold text-center mb-6">Contact Me</h2>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-green-100 mb-6">Feel free to reach out if you'd like to collaborate or have any questions.</p>
            <a href="mailto:example@example.com" className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition">Email Me</a>
          </div>
        </section>

        <footer className="text-center py-4 bg-black text-xs text-gray-400">
          Built with React.js and Tailwind CSS — © 2025 Nayan Das
        </footer>
      </main>
    </div>
  );
}
