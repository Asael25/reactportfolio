import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Code, Briefcase, User, BookOpen, Award, ExternalLink, Download, MapPin, Calendar, GraduationCap } from 'lucide-react';


import ProfilePicture from './assets/sael.jpg'; 


const SpotlightCard = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// Tilted Card Component (inspired by ReactBits)
const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("");
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

// Profile Card Component (inspired by ReactBits)
const ProfileCard = () => {
  return (
    <TiltCard>
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-3xl" />
        <div className="relative pt-16">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 -mt-24 shadow-xl">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
              <img 
                src={ProfilePicture} 
                alt="Surya Asael Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <div className="text-center mt-6 space-y-3">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Surya Asael
            </h3>
            <p className="text-cyan-400 font-semibold">Mahasiswa Teknik Informatika</p>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} />
              <span>Surabaya, Indonesia</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mt-4">
              Full Stack Developer passionate about creating innovative solutions and beautiful user interfaces
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <a href="https://github.com/Asael25" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-xl hover:bg-cyan-600 transition-all duration-300 hover:scale-110 group">
              <Github size={20} className="group-hover:rotate-12 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/surya-asael-929926243/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-xl hover:bg-cyan-600 transition-all duration-300 hover:scale-110 group">
              <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
            </a>
            <a href="mailto:suryaasael6@email.com" className="p-3 bg-gray-800 rounded-xl hover:bg-cyan-600 transition-all duration-300 hover:scale-110 group">
              <Mail size={20} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

// Animated Skill Bar Component
const SkillBar = ({ name, level, color, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-200">{name}</span>
        <span className="text-cyan-400 font-bold">{level}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

// Pixel Card for Projects
const PixelCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SpotlightCard className="group">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full"
      >
        <div className={`h-64 ${project.image} relative overflow-hidden transition-all duration-500`}>
          <div className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-70' : 'opacity-0'}`}>
            <div className="transform transition-all duration-500" style={{ transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)' }}>
              <ExternalLink className="text-cyan-400" size={48} />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full">
              PROJECT {index + 1}
            </span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-800 text-cyan-400 text-sm rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const skills = [
    { name: 'JavaScript', level: 90, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
    { name: 'React.js', level: 85, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 80, color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { name: 'Python', level: 75, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { name: 'Java', level: 70, color: 'bg-gradient-to-r from-red-400 to-red-600' },
    { name: 'SQL Database', level: 80, color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    { name: 'Git & GitHub', level: 85, color: 'bg-gradient-to-r from-orange-400 to-orange-600' },
    { name: 'TailwindCSS', level: 90, color: 'bg-gradient-to-r from-cyan-400 to-cyan-600' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Platform e-commerce modern dengan fitur keranjang belanja, sistem pembayaran terintegrasi, dan dashboard admin untuk manajemen produk',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      image: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600'
    },
    {
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas kolaboratif dengan fitur real-time updates, assignment tracking, dan integrasi dengan calendar',
      tech: ['React', 'Firebase', 'Tailwind', 'Framer Motion'],
      image: 'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600'
    },
    {
      title: 'Weather Dashboard',
      description: 'Dashboard cuaca interaktif dengan visualisasi data real-time, prediksi 7 hari, dan maps integration menggunakan multiple APIs',
      tech: ['JavaScript', 'OpenWeather API', 'Chart.js', 'Mapbox'],
      image: 'bg-gradient-to-br from-orange-600 via-yellow-500 to-amber-600'
    },
    {
      title: 'Social Media Clone',
      description: 'Clone platform media sosial dengan fitur posting, komentar, sistem pertemanan, dan real-time notifications',
      tech: ['React', 'Redux', 'PostgreSQL', 'Socket.io'],
      image: 'bg-gradient-to-br from-green-600 via-teal-600 to-emerald-600'
    }
  ];

  const certifications = [
    { name: 'Full Stack Web Development', issuer: 'Coursera', year: '2024' },
    { name: 'React - The Complete Guide', issuer: 'Udemy', year: '2024' },
    { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2023' },
    { name: 'Python for Data Science', issuer: 'DataCamp', year: '2023' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 border-2 border-cyan-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                SA.
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="flex space-x-1">
                {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-5 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item 
                        ? 'text-cyan-400 bg-cyan-400/10 font-semibold' 
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-cyan-400 p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-3 capitalize text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-950 to-gray-950" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-12 animate-float">
            <ProfileCard />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight animate-slide-up">
            Building Digital
            <br />
            Experiences
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Transforming ideas into elegant, functional, and user-centric web applications
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/50 flex items-center gap-2"
            >
              <Briefcase size={20} />
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-cyan-600 hover:bg-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Mail size={20} />
              Get In Touch
            </button>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="mt-16 animate-bounce-slow"
          >
            <ChevronDown size={40} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gray-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SpotlightCard>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">Hi, I'm Surya Asael 👋</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Saya adalah mahasiswa Teknik Informatika yang passionate dalam dunia pemrograman dan teknologi. 
                    Dengan fokus pada pengembangan web full-stack, saya terus mengasah kemampuan untuk menciptakan 
                    solusi digital yang inovatif dan user-friendly.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Saya percaya bahwa teknologi memiliki kekuatan untuk mengubah dunia menjadi lebih baik. 
                    Setiap proyek adalah kesempatan untuk belajar, berkembang, dan memberikan dampak positif 
                    melalui kode yang saya tulis.
                  </p>
                </div>
              </SpotlightCard>

              {/* --- PERUBAHAN DI SINI --- */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Code size={28} />, title: 'Clean Code', desc: 'Menulis kode yang maintainable & scalable', color: 'from-cyan-500 to-blue-500' },
                  { icon: <Briefcase size={28} />, title: '15+ Projects', desc: 'Berbagai proyek berhasil diselesaikan', color: 'from-purple-500 to-pink-500' },
                  { icon: <Award size={28} />, title: 'Certifications', desc: '10+ sertifikasi profesional', color: 'from-green-500 to-teal-500' },
                  { icon: <BookOpen size={28} />, title: 'Continuous Learning', desc: 'Selalu update dengan teknologi terbaru', color: 'from-orange-500 to-red-500' }
                ].map((item, index) => (
                  <TiltCard key={index}>
                    <SpotlightCard>
                      <div className="p-6 h-full flex flex-col">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SpotlightCard>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-4 text-cyan-400">Quick Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-cyan-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-semibold">Surabaya, Indonesia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap size={20} className="text-cyan-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Education</p>
                        <p className="font-semibold">Teknik Informatika</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-cyan-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400">Experience</p>
                        <p className="font-semibold">3+ Years Coding</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              <button className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2">
                <Download size={20} />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          
          <SpotlightCard>
            <div className="p-10">
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <SkillBar 
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* --- PERUBAHAN DI SINI --- */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['React', 'Node.js', 'Python', 'SQL'].map((tech, i) => (
              <SpotlightCard key={i}>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {skills.find(s => s.name.includes(tech.split('.')[0]))?.level || 80}%
                  </div>
                  <div className="text-sm text-gray-400">{tech}</div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-gray-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          {/* --- PERUBAHAN DI SINI --- */}
          <div className="grid grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <PixelCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          
          <div className="space-y-12">
            {/* Education Card */}
            <SpotlightCard>
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-xl">
                      <GraduationCap size={32} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-cyan-400 mb-2">S1 Teknik Informatika</h3>
                    <p className="text-xl text-gray-300 mb-4">Universitas 17 Agustus 1945 Surabaya</p>
                    <p className="text-gray-400 leading-relaxed">
                      Fokus pada Software Engineering, Artificial Intelligence. Junior
                    </p>
                    <div className="mt-6 inline-block px-6 py-2 bg-cyan-600/20 border border-cyan-500 rounded-lg">
                      <span className="text-cyan-400 font-bold text-lg">IPK: 3.8/4.0</span>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="inline-block px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
                      <Calendar size={20} className="text-cyan-400 mx-auto mb-2" />
                      <span className="text-gray-400 block">2022 - Sekarang</span>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Certifications Grid */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center text-white">Certifications</h3>
              {/* --- PERUBAHAN DI SINI --- */}
              <div className="grid grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <TiltCard key={index}>
                    <SpotlightCard>
                      <div className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Award size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1 text-white">{cert.name}</h4>
                          <p className="text-sm text-gray-400">{cert.issuer}</p>
                          <span className="inline-block mt-2 px-3 py-1 bg-cyan-600/20 text-cyan-400 text-xs font-semibold rounded-full">
                            {cert.year}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Tertarik untuk berkolaborasi atau punya proyek menarik? Mari kita wujudkan ide Anda!
          </p>
          
          {/* --- PERUBAHAN DI SINI --- */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Mail size={28} />, title: 'Email', value: 'suryaasael6@email.com', href: 'mailto:ssuryaasael6@email.com', color: 'from-cyan-500 to-blue-500' },
              { icon: <Linkedin size={28} />, title: 'LinkedIn', value: '/suryaasael', href: 'https://www.linkedin.com/in/surya-asael-929926243/', color: 'from-blue-500 to-purple-500' },
              { icon: <Github size={28} />, title: 'GitHub', value: '/Asael25', href: 'https://github.com/Asael25', color: 'from-purple-500 to-pink-500' }
            ].map((contact, index) => (
              <TiltCard key={index}>
                <a 
                  href={contact.href}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block h-full"
                >
                  <SpotlightCard className="h-full">
                    <div className="p-6">
                      <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-4 shadow-xl`}>
                        <div className="text-white">{contact.icon}</div>
                      </div>
                      <h4 className="font-bold mb-2 text-white">{contact.title}</h4>
                      <p className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">{contact.value}</p>
                    </div>
                  </SpotlightCard>
                </a>
              </TiltCard>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="mailto:surya.asael@email.com" 
              className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/50"
            >
              <Mail size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Send Email</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/suryaasael" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-8 py-4 border-2 border-cyan-600 hover:bg-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Footer TIDAK diubah, tetap 1 kolom di HP, 3 di desktop */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Surya Asael
              </h3>
              <p className="text-gray-400">
                Mahasiswa Teknik Informatika yang passionate dalam menciptakan solusi digital inovatif.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/suryaasael" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gray-800 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                  <Github size={20} className="group-hover:rotate-12 transition-transform" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/suryaasael" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gray-800 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                  <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
                </a>
                <a 
                  href="mailto:surya.asael@email.com" 
                  className="w-12 h-12 bg-gray-800 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                  <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Surya Asael. Crafted with 💙 and React</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}