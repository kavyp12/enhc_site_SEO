"use client";
import projectData from '@/data/projectData';
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Link from "next/link";
import { ResponsiveBump } from '@nivo/bump';
import { ResponsiveLine } from '@nivo/line';


const fontStyles = `
  
  .product-sans {
    font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  }

  :root {
    --bg-main: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-card: #ffffff;
    --bg-card-secondary: #f3f4f6;
    --bg-overlay: rgba(0, 0, 0, 0.5);
    --text-main: #111827;
    --text-muted: #6b7280;
    --text-inverted: #ffffff;
    --border-main: #e5e7eb;
    --border-secondary: #d1d5db;
    --brand-primary: #102d4d;
    --brand-primary-hover: #0d2640;
  }

  .dark {
    --bg-main: #000000;
    --bg-secondary: #111111;
    --bg-card: #1C1C1C;
    --bg-card-secondary: #222222;
    --bg-overlay: rgba(0, 0, 0, 0.7);
    --text-main: #ffffff;
    --text-muted: #9ca3af;
    --text-inverted: #000000;
    --border-main: #374151;
    --border-secondary: #4b5563;
    --brand-primary: #102d4d;
    --brand-primary-hover: #1a3b5f;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

// Icon Components
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="4"></circle>
    <line x1="10" y1="1" x2="10" y2="3"></line>
    <line x1="10" y1="17" x2="10" y2="19"></line>
    <line x1="3.22" y1="3.22" x2="4.64" y2="4.64"></line>
    <line x1="15.36" y1="15.36" x2="16.78" y2="16.78"></line>
    <line x1="1" y1="10" x2="3" y2="10"></line>
    <line x1="17" y1="10" x2="19" y2="10"></line>
    <line x1="3.22" y1="16.78" x2="4.64" y2="15.36"></line>
    <line x1="15.36" y1="4.64" x2="16.78" y2="3.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 12.79A7 7 0 1 1 9.21 5 5.5 5.5 0 0 0 17 12.79z"></path>
  </svg>
);

// Navbar Component with Tab Switching
const Navbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark';
    setTheme(savedTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };
  

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'company', label: 'Company Details' },
    { id: 'clients', label: 'Our Clients' },
    { id: 'industries', label: 'Industries' },
    { id: 'capabilities', label: 'Our Capabilities' },
    { id: 'analytics', label: 'Analytics' },
    // { id: 'whyus', label: 'Why us?' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-out ${
      isScrolled ? 'pt-0 md:pt-6' : 'pt-0'
    }`}>
      <nav className={`flex items-center justify-between pointer-events-auto transition-all duration-500 ease-out ${
        isScrolled
          ? 'w-full md:w-[95%] md:max-w-6xl bg-[var(--bg-secondary)]/60 md:bg-[var(--bg-secondary)]/20 backdrop-blur-xl md:border md:border-[var(--border-main)] rounded-none md:rounded-full px-6 py-4 md:py-3 shadow-2xl shadow-black/20'
          : 'w-full bg-[var(--bg-secondary)]/60 md:bg-transparent md:backdrop-blur-sm px-8 py-4 rounded-none'
      }`}>
        <div className="flex items-center">
          <span className={`font-bold text-[var(--text-main)] transition-all duration-500 ease-out origin-center ${
            isScrolled ? 'text-3xl' : 'text-4xl'
          }`}>enhc</span>
        </div>
        
        <div className={`flex items-center text-[var(--text-main)] transition-all duration-500 ease-out origin-center overflow-x-auto ${
          isScrolled ? 'space-x-4' : 'space-x-6'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative group transition-all duration-500 ease-out origin-center whitespace-nowrap ${
                isScrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'
              } ${
                activeTab === item.id
                  ? 'text-[var(--brand-primary)] font-semibold'
                  : 'text-[var(--text-main)]'
              }`}
            >
              <span>{item.label}</span>
              <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 bg-[var(--brand-primary)] transition-all duration-300 ease-out ${
                activeTab === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-[var(--text-main)] transition-colors duration-300 hover:bg-[var(--bg-card-secondary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
};


// Password Protection Component
const PasswordProtection = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Verify server-side so the password is never embedded in the client bundle.
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        onUnlock();
      } else if (res.status === 429) {
        setError('Too many attempts. Please wait a moment and try again.');
        setPassword('');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch {
      setError('Could not verify password. Please try again.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] flex items-center justify-center p-4">
      <div className="bg-[var(--bg-card)] rounded-2xl p-8 max-w-md w-full border border-[var(--border-main)] shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2 product-sans">
            Protected Content
          </h2>
          <p className="text-[var(--text-muted)] product-sans">
            Please enter the password to access this page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-main)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] product-sans"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-500 text-sm product-sans">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-[var(--brand-primary)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed product-sans"
          >
            {isLoading ? 'Checking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
};

// HOME TAB CONTENT
const HomeContent = () => {
  return (
    <>
      {/* Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-main)]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-pink-400 mb-4 product-sans">Vision</h2>
            <p className="text-[var(--text-main)] text-lg leading-relaxed product-sans">
              To be a global leader in artificial intelligence, creating transformative solutions that solve humanity's most complex challenges and drive a new era of innovation.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="https://img.icons8.com/plasticine/200/organization.png" 
              alt="Vision illustration" 
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>

        <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-main)]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4 product-sans">Mission</h2>
            <p className="text-[var(--text-main)] text-lg leading-relaxed product-sans">
              To build and deploy cutting-edge, ethical, and scalable AI systems that empower businesses, augment human potential, and drive global progress.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="https://img.icons8.com/plasticine/200/goal.png"
              alt="Mission illustration" 
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center mb-12">
        {[
          { label: 'AI Models Deployed', value: '136' },
          { label: 'AI/ML Engineers', value: '11+' },
          { label: 'Research Papers', value: '7' },
          { label: 'Petabytes Processed', value: '0.5PB' },
          { label: 'Active Deployments', value: '42+' }
        ].map((stat, index) => (
          <div key={index}>
            <p className="text-5xl font-bold text-white product-sans">{stat.value}</p>
            <p className="text-base text-gray-300 mt-2 product-sans">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Initiatives & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-[var(--brand-primary)] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 product-sans">Our Initiatives</h2>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed product-sans">
              <li>Pioneering research through AI Hackathons and R&D sprints.</li>
              <li>Publishing cutting-edge research in leading AI journals.</li>
              <li>Hosting AI & ML Tech Talks and workshops for the community.</li>
              <li>Championing ethical AI and open-source contributions.</li>
              <li>Enhancing skills with specialized AI & MLOps training.</li>
              <li>Applying AI for social good through dedicated impact projects.</li>
            </ul>
          </div>
           <div className="flex-shrink-0">
            <img 
              src="https://img.icons8.com/plasticine/200/puzzle.png"
              alt="Initiatives illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>

        <div className="bg-[var(--brand-primary)] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 product-sans">Goals of 2025</h2>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed product-sans">
              <li>Launch a proprietary Large Language Model (LLM).</li>
              <li>Expand our team of AI specialists to 200+.</li>
              <li>Secure 5 new patents in generative AI and computer vision.</li>
              <li>Train 500+ students through our AI internship program.</li>
              <li>Establish a new AI research lab in the Gift city.</li>
            </ul>
          </div>
           <div className="flex-shrink-0">
            <img 
              src="https://img.icons8.com/plasticine/200/trophy.png"
              alt="Goals of 2025 illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Recognitions */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-6 product-sans">Recognitions & Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Microsoft */}
          <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-main)]/50 hover:border-[var(--brand-primary)] transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] group">
            <div className="mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
              <svg className="w-16 h-16" viewBox="0 0 23 23" fill="none">
                <path d="M0 0h11v11H0z" fill="#f25022"/>
                <path d="M12 0h11v11H12z" fill="#7fba00"/>
                <path d="M0 12h11v11H0z" fill="#00a4ef"/>
                <path d="M12 12h11v11H12z" fill="#ffb900"/>
              </svg>
            </div>
            <p className="font-bold text-[var(--text-main)] text-base text-center product-sans">Microsoft</p>
            <p className="text-sm text-[var(--text-muted)] mt-1 text-center product-sans">AI Solutions Partner</p>
          </div>

          {/* Google */}
          <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-main)]/50 hover:border-[var(--brand-primary)] transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] group">
            <div className="mb-4">
              <svg className="w-16 h-16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.910 11.910 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </div>
            <p className="font-bold text-[var(--text-main)] text-base text-center product-sans">Google Cloud</p>
            <p className="text-sm text-[var(--text-muted)] mt-1 text-center product-sans">AI & ML Partner</p>
          </div>

          {/* Clutch */}
          <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-main)]/50 hover:border-[var(--brand-primary)] transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] group">
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => <span key={i} className="text-xl">★</span>)}
            </div>
            <p className="font-bold text-[var(--text-main)] text-xl text-center product-sans">Clutch</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2 product-sans">5.0</p>
            <p className="text-sm text-[var(--text-muted)] mt-1 text-center product-sans">Top AI Developer</p>
          </div>

          {/* GoodFirms */}
          <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-main)]/50 hover:border-[var(--brand-primary)] transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] group">
            <div className="mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">GF</span>
              </div>
            </div>
            <p className="font-bold text-[var(--text-main)] text-base text-center product-sans">GoodFirms</p>
            <p className="text-sm text-[var(--brand-primary)] font-bold mt-2 text-center product-sans">TOP RATED AI COMPANY</p>
          </div>
        </div>
      </div>
    </>
  );
};  

// COMPANY DETAILS TAB CONTENT
const CompanyDetailsContent = () => {
  // State for managing active tabs
  const [activeTechTab, setActiveTechTab] = React.useState('Backend');
  const [activeIntegrationTab, setActiveIntegrationTab] = React.useState('AI_Platforms');

  // Data for the sections
  const services = [
    'Generative AI Solutions', 'Large Language Models (LLMs)', 'Computer Vision', 'Predictive Analytics', 'Natural Language Processing (NLP)', 'AI Strategy Consulting', 'MLOps & Deployment', 'Data Engineering & Warehousing', 'AI-Powered Automation (RPA)', 'Reinforcement Learning', 'AI Ethics & Governance', 'Custom AI Model Development'
  ];

  const projectLifecycle = [
    'Problem Framing', 'Data Acquisition', 'Data Preparation', 'Model Prototyping', 'Model Training', 'Evaluation & Tuning', 'Deployment', 'Monitoring', 'Continuous Improvement'
  ];

  const technologies = {
    Frontend: [
      { name: 'React JS', logo: 'https://img.icons8.com/officel/48/react.png' },
      { name: 'Next.js', logo: 'https://img.icons8.com/color/48/nextjs.png' },
      { name: 'Typescript', logo: 'https://img.icons8.com/color/48/typescript.png' },
      { name: 'TensorFlow.js', logo: 'https://img.icons8.com/color/48/tensorflow.png' },
      { name: 'Three.js', logo: '/threejsLogo.jpg' },
    ],
    Backend: [
      { name: 'Python', logo: 'https://img.icons8.com/color/48/python--v1.png' },
      { name: 'FastAPI', logo: '/FastAPI_logo.png' },
      { name: 'PyTorch', logo: 'pytorch-logo-dark.png' },
      { name: 'TensorFlow', logo: 'https://img.icons8.com/color/48/tensorflow.png' },
      { name: 'Go', logo: 'https://img.icons8.com/color/48/golang.png' },
      { name: 'Node.js', logo: 'https://img.icons8.com/color/48/nodejs.png' },
      { name: 'CUDA', logo: 'https://img.icons8.com/color/48/nvidia.png' },
      { name: 'LangChain', logo: 'https://img.icons8.com/fluency/48/source-code.png' },
    ],
    Database: [
        { name: 'PostgreSQL', logo: 'https://img.icons8.com/color/48/postgreesql.png' },
        { name: 'MongoDB', logo: 'https://img.icons8.com/color/48/mongodb.png' },
        { name: 'Pinecone', logo: '/pinecone.png' },
        { name: 'Chroma DB', logo: '/chroma.png' },
        { name: 'Redis', logo: 'https://img.icons8.com/color/48/redis.png' },
    ],
    DevOps: [
        { name: 'Docker', logo: 'https://img.icons8.com/color/48/docker.png' },
        { name: 'Kubernetes', logo: '/kubarnatis.svg' },
        { name: 'MLFlow', logo: '/mlflow.svg' },
        { name: 'Jenkins', logo: 'https://img.icons8.com/color/48/jenkins.png' },
        { name: 'AWS', logo: 'https://img.icons8.com/color/48/amazon-web-services.png' },
        { name: 'GCP', logo: 'https://img.icons8.com/color/48/google-cloud.png' },
    ],
  };
  
  const tools = [
      { name: 'Jupyter', logo: '/jupyter.png' },
      { name: 'VS Code', logo: 'https://img.icons8.com/color/48/visual-studio-code-2019.png' },
      { name: 'Github', logo: 'https://img.icons8.com/sf-regular/48/github.png' },
      { name: 'Anaconda', logo: '/anaconda python.webp' },
      { name: 'Hugging Face', logo: '/hugging face.png' },
      { name: 'Notion', logo: 'https://img.icons8.com/color/48/notion.png' },
      { name: 'Slack', logo: 'https://img.icons8.com/color/48/slack-new.png' },
      { name: 'Figma', logo: 'https://img.icons8.com/color/48/figma--v1.png' },
      { name: 'Jira', logo: 'https://img.icons8.com/color/48/jira.png' },
  ];

  const integrations = {
    AI_Platforms: [
        { name: 'AWS SageMaker', logo: '/AWS sagemaker.png' },
        { name: 'Google Vertex AI', logo: '/google vertex AI.jpg' },
        { name: 'Azure ML', logo: 'Azure ML.jpg' },
        { name: 'OpenAI API', logo: '/OpenAI-Logo.png' },
        { name: 'Anthropic', logo: 'https://img.icons8.com/fluency/48/claude-ai.png' },
        { name: 'Databricks', logo: '/databrik.png' },
    ],
    Communication: [
        { name: 'Twilio', logo: '/Twilio-Logo.jpg' },
        { name: 'SendGrid', logo: '/sendgrid-logo.png' },
        { name: 'Slack', logo: 'https://img.icons8.com/color/48/slack-new.png' },
        { name: 'Intercom', logo: 'https://img.icons8.com/color/48/intercom.png' },
    ],
  };

  const TabButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`py-2 px-5 text-lg rounded-lg transition-colors duration-300 product-sans ${
        isActive
          ? 'bg-[var(--bg-card)] text-[var(--text-main)] font-semibold shadow-sm border border-[var(--border-main)]'
          : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-secondary)]'
      }`}
    >
      {label}
    </button>
  );

  const IconCard = ({ name, logo }: { name: string; logo: string }) => (
    <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-main)]/50 flex flex-col items-center justify-center gap-2 h-32 hover:shadow-lg hover:border-[var(--brand-primary-text)] transition-all duration-300">
      <img 
        src={logo} 
        alt={name} 
        className="object-contain" 
        style={{ width: '64px', height: '64px', minWidth: '64px', minHeight: '64px' }}
      />
      <p className="text-base text-center text-[var(--text-main)] font-medium product-sans">{name}</p>
    </div>
  );


  return (
    <>
      {/* Services Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6 product-sans">Our AI Services</h2>
        <div className="flex flex-wrap gap-4">
          {services.map((service, index) => (
            <span key={index} className="bg-[var(--bg-card-secondary)] text-[var(--text-main)] text-lg text-center rounded-lg py-3 px-5 product-sans border border-[var(--border-main)]/50">
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Project Lifecycle Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-8 product-sans">AI Project Lifecycle</h2>
        <div className="relative flex items-center justify-between overflow-x-auto pb-4">
            {projectLifecycle.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center flex-shrink-0 mx-4">
                        <div className="w-12 h-12 bg-[var(--brand-primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-2">{index + 1}</div>
                        <p className="text-base w-28 text-[var(--text-main)] product-sans">{step}</p>
                    </div>
                    {index < projectLifecycle.length - 1 && (
                        <div className="flex-grow h-0.5 bg-[var(--border-main)] hidden sm:block"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6 product-sans">Core Technologies</h2>
        <div className="bg-[var(--bg-card-secondary)] p-2 rounded-xl inline-flex flex-wrap gap-2 mb-6">
          <TabButton label="Backend & AI/ML" isActive={activeTechTab === 'Backend'} onClick={() => setActiveTechTab('Backend')} />
          <TabButton label="DevOps & MLOps" isActive={activeTechTab === 'DevOps'} onClick={() => setActiveTechTab('DevOps')} />
          <TabButton label="Database" isActive={activeTechTab === 'Database'} onClick={() => setActiveTechTab('Database')} />
          <TabButton label="Frontend" isActive={activeTechTab === 'Frontend'} onClick={() => setActiveTechTab('Frontend')} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {activeTechTab === 'Frontend' && technologies.Frontend.map(tech => <IconCard key={tech.name} {...tech} />)}
          {activeTechTab === 'Backend' && technologies.Backend.map(tech => <IconCard key={tech.name} {...tech} />)}
          {activeTechTab === 'Database' && technologies.Database.map(tech => <IconCard key={tech.name} {...tech} />)}
          {activeTechTab === 'DevOps' && technologies.DevOps.map(tech => <IconCard key={tech.name} {...tech} />)}
        </div>
      </div>

      {/* Tools Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6 product-sans">Development Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {tools.map(tool => <IconCard key={tool.name} {...tool} />)}
        </div>
      </div>
      
      {/* Third Party Integrations Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6 product-sans">Platform Integrations</h2>
        <div className="bg-[var(--bg-card-secondary)] p-2 rounded-xl inline-flex flex-wrap gap-2 mb-6">
          <TabButton label="AI Platforms" isActive={activeIntegrationTab === 'AI_Platforms'} onClick={() => setActiveIntegrationTab('AI_Platforms')} />
          <TabButton label="Communication" isActive={activeIntegrationTab === 'Communication'} onClick={() => setActiveIntegrationTab('Communication')} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
           {activeIntegrationTab === 'AI_Platforms' && integrations.AI_Platforms.map(int => <IconCard key={int.name} {...int} />)}
           {activeIntegrationTab === 'Communication' && integrations.Communication.map(int => <IconCard key={int.name} {...int} />)}
        </div>
      </div>
    </>
  );
};

// AI Innovations Product Data (Your Original)
const aiInnovationsData = [
  // Add your original AI innovations data here
  {
    id: 1,
    platform: "AI Platform",
    title: "AI Innovation Product 1",
    category: "Artificial Intelligence",
    development: "3-6 months",
    year: "2024",
    client: "Enterprise",
    description: "Your original AI innovation product description goes here.",
    images: {
      main: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "Feature 1 of your AI product" },
      { title: "Feature 2 of your AI product" },
      { title: "Feature 3 of your AI product" }
    ]
  }
];

// Custom Software Services Data
const customSoftwareData = [
  {
    id: 1,
    platform: "Management Systems",
    title: "Enterprise Management Solutions",
    category: "Custom Software Service",
    development: "3-6 months",
    year: "2024",
    client: "Enterprise",
    description: "Comprehensive management systems designed to streamline business operations across lead management, sales, CRM, ERP, learning platforms, and analytics. Our solutions provide real-time visibility, automation, and data-driven insights to boost efficiency and drive growth.",
    images: {
      main: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "Lead Management: Capture, organize, and track leads from multiple channels with tagging, scoring, assignment, and automated reminders." },
      { title: "Sales & CRM: Gain a 360° customer view with deal tracking, communication history, and workflow automation to boost conversions." },
      { title: "ERP & Operations: Manage billing, inventory, procurement, and finance in one platform with real-time visibility and efficiency." },
      { title: "Learning & Training: Create multimedia-rich courses with modules, quizzes, certifications, and mobile-friendly access for compliance and growth." },
      { title: "Analytics & Insights: Access real-time dashboards for leads, pipelines, finances, and forecasts to support data-driven decisions." },
      { title: "Collaboration & Scalability: Enable cross-team collaboration with secure, scalable architecture that replaces spreadsheets and siloed tools." }
    ]
  },
  {
    id: 2,
    platform: "AI & Automations",
    title: "Intelligent Automation Solutions",
    category: "Custom Software Service",
    development: "2-4 months",
    year: "2024",
    client: "Enterprise",
    description: "Advanced AI-powered automation solutions that deliver 24/7 support, intelligent task management, and personalized customer interactions. Our platform combines machine learning, natural language processing, and smart automation to enhance productivity and drive conversions.",
    images: {
      main: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "24/7 AI Support: Deliver assistance across websites, WhatsApp, Messenger, and more." },
      { title: "Task Automation: Manage queries, orders, feedback, and lead generation automatically." },
      { title: "No-Code Chatbots: Build custom bots with a drag-and-drop interface." },
      { title: "Personalized Responses: Use machine learning and CRM data for accuracy." },
      { title: "Conversion Boost: Recover abandoned carts and increase sales with smart triggers." },
      { title: "Human Handoff: Escalate complex issues to live agents smoothly." },
      { title: "Multilingual Scaling: Support multiple languages while reducing manual costs." }
    ]
  },
  {
    id: 3,
    platform: "SEO, GEO & AEO",
    title: "Search Optimization Suite",
    category: "Custom Software Service",
    development: "2-3 months",
    year: "2024",
    client: "Marketing Teams",
    description: "Comprehensive search engine optimization platform that centralizes SEO management across all digital touchpoints. Our solution provides smart guidance, technical configuration, performance tracking, and mobile optimization to boost search visibility and drive organic traffic.",
    images: {
      main: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "Centralized Optimization: Manage titles, URLs, images, and metadata in one dashboard." },
      { title: "Smart SEO Guidance: Get live previews, suggestions, and bulk editing options." },
      { title: "Technical SEO: Configure schema markup, sitemaps, robots.txt, and crawl settings." },
      { title: "Performance Tracking: Monitor keywords, backlinks, authority, and visibility." },
      { title: "Mobile & Global SEO: Optimize for mobile, multi-language, and geo-specific content." },
      { title: "Seamless Integration: Apply SEO across blogs, products, and landing pages." },
      { title: "Growth Insights: Use scorecards and tips to boost SEO health and drive traffic." }
    ]
  },
  {
    id: 4,
    platform: "Product / SaaS Development",
    title: "Rapid Product Development Platform",
    category: "Custom Software Service",
    development: "1-3 months",
    year: "2024",
    client: "Product Teams",
    description: "Comprehensive product and SaaS development platform featuring 3D mockup tools, pre-built templates, and collaborative workflow features. Our solution enables rapid prototyping, brand consistency, and seamless approval processes for modern product teams.",
    images: {
      main: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "3D Mockups: Upload designs and apply them instantly to realistic visuals." },
      { title: "Pre-Built Templates: Choose from options for apparel, gadgets, packaging, and more." },
      { title: "Customization: Adjust placement, rotation, and zoom in real time." },
      { title: "High-Resolution Output: Export mockups for marketing, presentations, or listings." },
      { title: "Easy Editing: Use a drag-and-drop editor built for non-designers and teams." },
      { title: "Brand Consistency: Maintain standards with templates and version control." },
      { title: "Fast Approvals: Share previews with feedback notes for quick sign-offs." },
      { title: "Prototyping Support: Ideal for concept testing, social content, and reducing design costs." }
    ]
  },
  {
    id: 5,
    platform: "Structured Planning",
    title: "Project Management & Collaboration Suite",
    category: "Custom Software Service",
    development: "2-4 months",
    year: "2024",
    client: "Project Teams",
    description: "Advanced project management platform that combines task structuring, visual tracking, collaboration tools, and resource management. Our solution provides comprehensive project oversight with Kanban boards, Gantt charts, risk management, and design consultation support.",
    images: {
      main: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
    },
    showcaseSlides: [
      { title: "Task Structuring: Define tasks, subtasks, milestones, and dependencies clearly." },
      { title: "Visual Tracking: Monitor progress via Kanban boards, Gantt charts, and calendars." },
      { title: "Collaboration Hub: Assign owners, deadlines, and centralize files and discussions." },
      { title: "Resource & Risk Management: Track budgets, workloads, and timelines with alerts." },
      { title: "Templates: Use ready-to-go project templates to save time and standardize processes." },
      { title: "Design Consultation: Provide UI wireframes or design deliverables with expert support." }
    ]
  }
];

const CapabilitiesContent = ({ projectData }: { projectData: any[] }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const currentData = activeTab === 'products' ? projectData : customSoftwareData;

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex justify-center gap-8 mb-12 border-b border-[var(--bg-secondary)]">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 px-6 text-xl font-semibold transition-all product-sans relative ${
            activeTab === 'products'
              ? 'text-[#0066CC]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
        >
          Our Products
          {activeTab === 'products' && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0066CC] rounded-t-full"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-4 px-6 text-xl font-semibold transition-all product-sans relative ${
            activeTab === 'services'
              ? 'text-[#0066CC]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
        >
          Our Custom Software Service
          {activeTab === 'services' && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0066CC] rounded-t-full"></span>
          )}
        </button>
      </div>

      <div className="mb-10 sm:mb-16">
        <p className="text-base text-[var(--text-muted)] mb-4 product-sans">
          • {activeTab === 'products' ? 'Our Capabilities' : 'Our Services'}
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold text-[var(--text-main)] leading-tight product-sans">
          {activeTab === 'products' ? (
            <>Discover our<br />AI innovations</>
          ) : (
            <>Custom Software<br />Solutions</>
          )}
        </h1>
      </div>

      {/* Projects with Alternating Layout */}
      <div className="space-y-12">
        {currentData.map((project, index) => (
          <div 
            key={project.id} 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ${
              index % 2 === 0 ? '' : 'lg:grid-flow-dense'
            }`}
          >
            {/* Image */}
            <div className={`${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card-secondary)] p-8">
                <img
                  src={project.images.main}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className={`${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-1 lg:row-start-1'}`}>
              <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-4 product-sans">
                {project.platform}
              </h2>
              <h3 className="text-3xl sm:text-4xl font-semibold text-[var(--text-main)] mb-6 product-sans">
                {project.title.replace(/\|/g, ':')}
              </h3>
              
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6 product-sans line-clamp-4">
                {project.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--brand-primary)] mt-1">●</span>
                  <span className="text-[var(--text-main)] text-lg product-sans">
                    <strong>Platform:</strong> {project.platform}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--brand-primary)] mt-1">●</span>
                  <span className="text-[var(--text-main)] text-lg product-sans">
                    <strong>Category:</strong> {project.category}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--brand-primary)] mt-1">●</span>
                  <span className="text-[var(--text-main)] text-lg product-sans">
                    <strong>Development:</strong> {project.development}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProject(project)}
                className="bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors product-sans text-lg"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[var(--bg-card)] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-[var(--text-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              {/* Logo/Icon placeholder */}
              <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-white text-3xl font-bold product-sans">
                  {selectedProject.platform.charAt(0)}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-6 product-sans">
                {selectedProject.title.replace(/\|/g, ' - ')}
              </h2>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4 product-sans">TechStack:</h3>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-xl mb-2 flex items-center justify-center">
                      <span className="text-3xl">💻</span>
                    </div>
                    <p className="text-base text-[var(--text-main)] product-sans">{selectedProject.platform}</p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4 product-sans">Key Features Include:</h3>
                <ul className="space-y-3">
                  {selectedProject.showcaseSlides.map((slide: { title: string }, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[var(--brand-primary)] mt-1">●</span>
                      <span className="text-[var(--text-main)] text-lg product-sans">{slide.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-[var(--text-muted)] text-lg leading-relaxed product-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-[var(--bg-secondary)] rounded-2xl">
                <div>
                  <p className="text-base text-[var(--text-muted)] mb-1 product-sans">Year</p>
                  <p className="text-xl font-semibold text-[var(--text-main)] product-sans">{selectedProject.year}</p>
                </div>
                <div>
                  <p className="text-base text-[var(--text-muted)] mb-1 product-sans">Client</p>
                  <p className="text-xl font-semibold text-[var(--text-main)] product-sans">{selectedProject.client}</p>
                </div>
                <div>
                  <p className="text-base text-[var(--text-muted)] mb-1 product-sans">Duration</p>
                  <p className="text-xl font-semibold text-[var(--text-main)] product-sans">{selectedProject.development}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 bg-[var(--brand-primary)] rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 product-sans">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-white/90 mb-6 product-sans">
          Let's discuss how our {activeTab === 'products' ? 'AI solutions' : 'custom software services'} can drive your success
        </p>
        <Link href="/contact">
      <button className="bg-white text-[var(--brand-primary)] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors product-sans text-lg">
        Contact Us
      </button>
    </Link>
      </div>
    </>
  );
};

// OUR CLIENTS TAB CONTENT
const ClientsContent = () => {
  // Array of your client data
  const clientsData = [
    { name: 'Adani University', logo: '/logos/adani uni.png' },
    { name: 'Adani Wilmar', logo: '/logos/Adani_wimar.jpg' },
    { name: 'Autotake AI', logo: '/logos/Autotake AI.jpg' },
    { name: 'Beardo', logo: '/logos/beardo logo.jpg' },
    { name: 'DDC', logo: '/logos/DDC.png' },
    { name: 'EV India', logo: '/logos/ev india.png' },
    { name: 'FIRE', logo: '/logos/FIRE.jpg' },
    { name: 'GIPL', logo: '/logos/GIPL.png' },
    { name: 'Gujarat Police', logo: '/logos/gujrat police.png' },
    { name: 'Innovatiq', logo: '/logos/innovatiq.jpg' },
    { name: 'Invest in Lothal', logo: '/logos/invest in lothal.png' },
    { name: 'Kreato', logo: '/logos/kreato.png' },
    { name: 'LOGO design', logo: '/logos/LOGO_design.jpg' },
    { name: 'Vedcool', logo: '/logos/Vedcool_logo.jpg' },
    { name: 'Villion', logo: '/logos/VILLION.jpeg' },
    { name: 'Webito Infotech', logo: '/logos/webito_infotech.jpg' },
    { name: 'Yohan', logo: '/logos/Yohan_logo.jpg' }
  ];

  // Organize logos in staggered rows
  const row1 = clientsData.slice(0, 7);
  const row2 = clientsData.slice(7, 12);
  const row3 = clientsData.slice(12);

  return (
    <div className="w-full min-h-screen bg-[var(--bg-main)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-main)] mb-6">
            Our Valuable Clients
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            We are proud to have partnered with a diverse range of innovative companies and organizations.
          </p>
        </div>

        {/* Diagonal Grid Layout with proper spacing */}
        <div className="relative flex flex-col items-center gap-4 py-8">
          {/* Row 1 */}
          <div className="flex justify-center items-center gap-7 sm:gap-9 md:gap-11 lg:gap-15">
            {row1.map((client, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  width: '140px',
                  height: '140px',
                }}
              >
                <div
                  className="absolute inset-0 bg-[var(--bg-card)] rounded-xl border-2 border-[var(--border-main)] hover:border-[var(--brand-primary)] hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden"
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center p-6"
                    style={{
                      transform: 'rotate(-45deg)',
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://img.icons8.com/plasticine/100/image-not-found.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Offset to the right */}
          <div className="flex justify-center items-center gap-7 sm:gap-9 md:gap-11 lg:gap-15" style={{ marginLeft: '199px', marginTop: '-40px' }}>
            {row2.map((client, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  width: '140px',
                  height: '140px',
                }}
              >
                <div
                  className="absolute inset-0 bg-[var(--bg-card)] rounded-xl border-2 border-[var(--border-main)] hover:border-[var(--brand-primary)] hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden"
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center p-6"
                    style={{
                      transform: 'rotate(-45deg)',
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://img.icons8.com/plasticine/100/image-not-found.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex justify-center items-center gap-7 sm:gap-9 md:gap-11 lg:gap-15" style={{ marginLeft: '-5px', marginTop: '-40px' }}>
            {row3.map((client, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  width: '140px',
                  height: '140px',
                }}
              >
                <div
                  className="absolute inset-0 bg-[var(--bg-card)] rounded-xl border-2 border-[var(--border-main)] hover:border-[var(--brand-primary)] hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden"
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center p-6"
                    style={{
                      transform: 'rotate(-45deg)',
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://img.icons8.com/plasticine/100/image-not-found.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// INDUSTRIES TAB CONTENT
const IndustriesContent = () => {
  const industriesData = [
    {
      id: 1,
      title: 'Banking & Finance',
      description: 'Implementing AI-powered fraud detection, algorithmic trading, and personalized financial chatbots to enhance security and portfolio management.',
      iconUrl: 'https://img.icons8.com/plasticine/100/bank-building.png',
    },
    {
      id: 2,
      title: 'IT Services',
      description: 'Automating IT operations with AIOps, using predictive analytics for network maintenance, and deploying intelligent cybersecurity to preempt threats.',
      iconUrl: 'https://img.icons8.com/plasticine/100/smartphone-tablet.png',
    },
    {
      id: 3,
      title: 'Cafe & Food Court',
      description: 'Optimizing inventory with AI-driven demand forecasting, personalizing customer orders with recommendation engines, and streamlining kitchen operations.',
      iconUrl: 'https://img.icons8.com/plasticine/100/cafe.png',
    },
    {
      id: 4,
      title: 'E-Commerce',
      description: 'Powering online retail with AI-driven product recommendations, personalized shopping experiences, and predictive analytics to optimize supply chains.',
      iconUrl: 'https://img.icons8.com/plasticine/100/shopping-cart-with-money.png',
    },
    {
      id: 5,
      title: 'Health Care',
      description: 'Enhancing diagnostics with AI-powered medical image analysis, personalizing treatment plans, and accelerating drug discovery through machine learning.',
      iconUrl: '/halthcare small logo.png',
    },
    {
      id: 6,
      title: 'CRM',
      description: 'Embedding AI into CRM for predictive lead scoring, customer sentiment analysis, and automating personalized communication to maximize engagement.',
      iconUrl: 'https://img.icons8.com/plasticine/100/user-group-man-man.png',
    },
    {
      id: 7,
      title: 'Education & Training',
      description: 'Creating AI-powered adaptive learning platforms, automated grading systems, and personalized tutoring to enhance educational outcomes.',
      iconUrl: 'https://img.icons8.com/plasticine/100/school.png',
    },
    {
      id: 8,
      title: 'Travel',
      description: 'Using AI for dynamic pricing optimization, personalized travel recommendations, and intelligent chatbots for seamless booking and support.',
      iconUrl: 'https://img.icons8.com/plasticine/100/around-the-globe.png',
    },
    {
      id: 9,
      title: 'SaaS Products',
      description: 'Integrating intelligent features like natural language processing, user behavior prediction, and automated workflows into SaaS platforms.',
      iconUrl: 'https://img.icons8.com/plasticine/100/share-2.png',
    },
    {
      id: 10,
      title: 'Real Estate',
      description: 'Leveraging AI for accurate property valuation models, virtual staging, and intelligent matching of buyers with their ideal properties.',
      iconUrl: 'https://img.icons8.com/plasticine/100/cottage.png',
    },
    {
      id: 11,
      title: 'HRMS',
      description: 'Automating talent acquisition with AI-driven resume screening, predicting employee churn, and personalizing corporate training programs.',
      iconUrl: 'https://img.icons8.com/plasticine/100/server.png',
    },
    {
      id: 12,
      title: 'Event & Entertainment',
      description: 'Utilizing AI to analyze audience data for personalized content delivery and to create immersive, algorithmically generated experiences.',
      iconUrl: 'https://img.icons8.com/plasticine/100/calendar--v2.png',
    },
    {
      id: 13,
      title: 'News & Blogs',
      description: 'Employing AI for automated content summarization, topic generation, sentiment analysis, and personalized news feeds for readers.',
      iconUrl: 'https://img.icons8.com/plasticine/100/news.png',
    },
    {
      id: 14,
      title: 'AI',
      description: 'Developing foundational AI models, including LLMs, computer vision, and predictive engines, to power next-generation intelligent applications.',
      iconUrl: '/AI logo.png',
    },
    {
      id: 15,
      title: 'Social Services',
      description: 'Using predictive analytics to identify at-risk populations and optimize resource allocation for non-profits and community support organizations.',
      iconUrl: 'https://img.icons8.com/plasticine/100/crowd.png',
    },
    {
      id: 16,
      title: 'Government',
      description: 'Building AI solutions for smart city management, public service automation, and data-driven policy making to improve civic operations.',
      iconUrl: 'https://img.icons8.com/plasticine/100/scales.png',
    },
    {
      id: 17,
      title: 'Home Services',
      description: 'Creating AI-powered platforms for intelligent scheduling, route optimization, and matching customers with the best-fit service professionals.',
      iconUrl: 'https://img.icons8.com/plasticine/100/house-with-a-garden.png',
    },
    {
      id: 18,
      title: 'Gaming',
      description: 'Designing advanced AI for realistic NPC behavior, procedural content generation, and adaptive difficulty to create dynamic gaming worlds.',
      iconUrl: 'https://img.icons8.com/plasticine/100/controller.png',
    },
    {
      id: 19,
      title: 'Portfolios',
      description: 'Using generative AI to create visually compelling portfolio layouts and NLP to analyze and suggest improvements for project descriptions.',
      iconUrl: 'https://img.icons8.com/plasticine/100/search-property.png',
    },
    {
      id: 20,
      title: 'Gems & Jewellery',
      description: 'Applying computer vision for automated gemstone grading, AI-powered virtual try-on experiences, and tracking authenticity on the blockchain.',
      iconUrl: 'https://img.icons8.com/plasticine/100/crown.png',
    },
    {
      id: 21,
      title: 'Many More',
      description: 'Our expertise in AI is adaptable. We are eager to explore new frontiers and apply intelligent solutions to unique industry challenges.',
      iconUrl: 'https://img.icons8.com/plasticine/100/plus-math.png',
    },
  ];

  // Shuffle the array randomly on each render
  const shuffledIndustries = React.useMemo(() => 
    [...industriesData].sort(() => Math.random() - 0.5), 
    []
  );

  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-3 product-sans">
          Industries We Serve
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto product-sans">
          We deliver transformative AI solutions across a diverse range of sectors, helping businesses innovate and grow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shuffledIndustries.map((industry) => (
          <div
            key={industry.id}
            className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-main)]/50 hover:border-[var(--brand-primary)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 mb-4">
              <img
                src={industry.iconUrl}
                alt={`${industry.title} icon`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 product-sans">{industry.title}</h3>
            <p className="text-sm text-[var(--text-muted)] flex-grow product-sans">{industry.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};


// ANALYTICS TAB CONTENT
interface StatCard {
  label: string;
  value: string | number;
}

interface EmployeeYear {
  year: string;
  expected: number | null;
  actual: number;
}

interface ColoredItem {
  name: string;
  percentage: number;
  color: string;
}

interface ModelMetric {
  metric: string;
  value: number;
}

interface KPITrend {
  year: string;
  clientRetention: number;
  projectSuccess: number;
  modelAccuracy: number;
  revenueGrowth: number;
  customerSatisfaction: number;
}

interface TeamDepartment {
  name: string;
  percentage: number;
}

interface RankingDataPoint {
  x: string;
  y: number;
}

interface IndustryRanking {
  id: string;
  data: RankingDataPoint[];
  [key: string]: any;
}

interface AnalyticsData {
  statCards: StatCard[];
  employeeVsYear: EmployeeYear[];
  techStack: ColoredItem[];
  workforceRoles: ColoredItem[];
  industryFocus: ColoredItem[];
  modelPerformance: ModelMetric[];
  kpiTrends: KPITrend[];
  teamDepartments: TeamDepartment[];
  industryProjectRankings: IndustryRanking[];
}

const AnalyticsContent = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulated analytics data
    const data: AnalyticsData = {
      statCards: [
        { label: 'AI Models Deployed', value: '136' },
        { label: 'Petabytes Processed', value: '0.5 PB' },
        { label: 'Research Papers Published', value: 7 }
      ],
      employeeVsYear: [
        { year: '2022', expected: 25, actual: 30 },
        { year: '2023', expected: 60, actual: 75 },
        { year: '2024', expected: 120, actual: 135 },
        { year: '2025', expected: 200, actual: 190 },
        { year: '2026', expected: null, actual: 250 }
      ],
      techStack: [
        { name: 'TensorFlow/PyTorch', percentage: 40, color: '#e8c1a0' },
        { name: 'Large Language Models', percentage: 25, color: '#f47560' },
        { name: 'Computer Vision', percentage: 20, color: '#f1e15b' },
        { name: 'Cloud & MLOps', percentage: 10, color: '#e8a838' },
        { name: 'Data Engineering', percentage: 5, color: '#61cdbb' }
      ],
      workforceRoles: [
        { name: 'AI/ML Engineers', percentage: 40, color: '#e8c1a0' },
        { name: 'Data Scientists', percentage: 25, color: '#f47560' },
        { name: 'Research Scientists', percentage: 15, color: '#f1e15b' },
        { name: 'MLOps & DevOps', percentage: 10, color: '#e8a838' },
        { name: 'Project Managers', percentage: 10, color: '#61cdbb' }
      ],
      industryFocus: [
        { name: 'Healthcare AI', percentage: 30, color: '#97e3d5' },
        { name: 'FinTech Solutions', percentage: 25, color: '#e8c1a0' },
        { name: 'Retail & E-commerce', percentage: 20, color: '#f47560' },
        { name: 'Automotive Tech', percentage: 15, color: '#f1e15b' },
        { name: 'Other', percentage: 10, color: '#e8a838' }
      ],
      modelPerformance: [
        { metric: 'Accuracy', value: 96 },
        { metric: 'Precision', value: 92 },
        { metric: 'Recall', value: 89 },
        { metric: 'Efficiency', value: 95 },
        { metric: 'Scalability', value: 98 },
        { metric: 'Interpretability', value: 85 }
      ],
      kpiTrends: [
        { year: '2022', clientRetention: 85, projectSuccess: 88, modelAccuracy: 91, revenueGrowth: 82, customerSatisfaction: 87 },
        { year: '2023', clientRetention: 88, projectSuccess: 91, modelAccuracy: 92, revenueGrowth: 89, customerSatisfaction: 91 },
        { year: '2024', clientRetention: 92, projectSuccess: 95, modelAccuracy: 94, revenueGrowth: 94, customerSatisfaction: 95 },
        { year: '2025', clientRetention: 95, projectSuccess: 98, modelAccuracy: 96, revenueGrowth: 97, customerSatisfaction: 98 }
      ],
      teamDepartments: [
        { name: 'Natural Language Processing', percentage: 85 },
        { name: 'Computer Vision', percentage: 78 },
        { name: 'Predictive Analytics', percentage: 92 },
        { name: 'Robotics & Automation', percentage: 65 },
        { name: 'Core Research', percentage: 70 }
      ],
      industryProjectRankings: [
        { "id": "Healthcare", "data": [{ "x": "2022", "y": 3 }, { "x": "2023", "y": 2 }, { "x": "2024", "y": 2 }, { "x": "2025", "y": 1 }] },
        { "id": "FinTech", "data": [{ "x": "2022", "y": 4 }, { "x": "2023", "y": 3 }, { "x": "2024", "y": 1 }, { "x": "2025", "y": 2 }] },
        { "id": "Automation", "data": [{ "x": "2022", "y": 5 }, { "x": "2023", "y": 4 }, { "x": "2024", "y": 3 }, { "x": "2025", "y": 3 }] },
        { "id": "E-commerce", "data": [{ "x": "2022", "y": 2 }, { "x": "2023", "y": 1 }, { "x": "2024", "y": 4 }, { "x": "2025", "y": 4 }] },
        { "id": "EduTech", "data": [{ "x": "2022", "y": 6 }, { "x": "2023", "y": 6 }, { "x": "2024", "y": 5 }, { "x": "2025", "y": 5 }] },
        { "id": "Real Estate", "data": [{ "x": "2022", "y": 1 }, { "x": "2023", "y": 5 }, { "x": "2024", "y": 6 }, { "x": "2025", "y": 6 }] },
        { "id": "HRMS", "data": [{ "x": "2022", "y": 7 }, { "x": "2023", "y": 7 }, { "x": "2024", "y": 7 }, { "x": "2025", "y": 7 }] }
      ]
    };
    setAnalyticsData(data);
  }, []);

  useEffect(() => {
    const checkDarkMode = () => document.documentElement.classList.contains('dark');
    setIsDarkMode(checkDarkMode());

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(checkDarkMode());
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--brand-primary)]"></div>
      </div>
    );
  }
  
  const nivoChartTheme = {
    // Light & Dark mode colors are based on your CSS variables
    textColor: isDarkMode ? '#ffffff' : '#111827',
    tooltip: {
      container: {
        background: isDarkMode ? '#1C1C1C' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#111827',
        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
      },
    },
    grid: {
      line: {
        stroke: isDarkMode ? '#374151' : '#e5e7eb',
      },
    },
    axis: {
      ticks: {
        line: {
          stroke: isDarkMode ? '#374151' : '#e5e7eb',
        },
        text: {
          fill: isDarkMode ? '#9ca3af' : '#6b7280',
        },
      },
      legend: {
        text: {
          fill: isDarkMode ? '#ffffff' : '#111827',
        },
      },
    },
    legends: {
        text: {
            fill: isDarkMode ? '#ffffff' : '#111827'
        }
    },
    crosshair: {
      line: {
        stroke: isDarkMode ? '#4b5563' : '#d1d5db',
        strokeWidth: 1,
        strokeOpacity: 0.75,
      },
    },
  };

  const DashboardCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-[var(--bg-card)] rounded-2xl p-6 shadow-lg border border-[var(--border-main)] ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">{children}</h3>
  );

  const EmployeeYearChart = () => {
    const data = analyticsData.employeeVsYear;
    const maxEmployee = Math.max(
      ...data.map((d) => d.actual), 
      ...data.filter((d) => d.expected !== null).map((d) => d.expected as number)
    ) + 20;

    return (
      <DashboardCard className="col-span-1 lg:col-span-2">
        <CardTitle>Team Growth & Projections</CardTitle>
        <div className="flex flex-col">
          <div className="flex justify-end space-x-4 text-sm text-[var(--text-muted)] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#97e3d5]"></div>
              <span>Projected Headcount</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[var(--brand-primary)]"></div>
              <span>Actual Headcount</span>
            </div>
          </div>
          <div className="w-full h-64 flex justify-between items-end px-4 space-x-2">
            {data.map((item) => (
              <div key={item.year} className="flex-1 flex justify-center items-end gap-1 h-full">
                {item.expected && (
                  <div className="w-1/2 bg-[#97e3d5] rounded-t-md" style={{ height: `${(item.expected / maxEmployee) * 100}%` }}></div>
                )}
                <div className="w-1/2 bg-[var(--brand-primary)] rounded-t-md" style={{ height: `${(item.actual / maxEmployee) * 100}%` }}></div>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-[var(--border-main)] mt-1"></div>
          <div className="w-full flex justify-between px-4 text-sm text-[var(--text-muted)] mt-2">
            {data.map((item) => (<span key={item.year} className="flex-1 text-center">{item.year}</span>))}
          </div>
        </div>
      </DashboardCard>
    );
  };

  const PieChart = ({ data, title }: { data: ColoredItem[]; title: string }) => {
    let currentPercent = 0;
    const gradientStops = data.map(item => {
      const start = currentPercent;
      currentPercent += item.percentage;
      return `${item.color} ${start}% ${currentPercent}%`;
    }).join(', ');

    return (
      <DashboardCard>
        <CardTitle>{title}</CardTitle>
        <div className="flex justify-center items-center my-6">
          <div className="w-48 h-48 rounded-full" style={{ background: `conic-gradient(${gradientStops})` }}></div>
        </div>
        <div className="space-y-2 text-base text-[var(--text-muted)]">
          {data.map(item => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[var(--text-main)]">{item.name}</span>
              </div>
              <span>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    );
  };

  const RadarChart = () => {
    const data = analyticsData.modelPerformance;
    const size = 200;
    const center = size / 2;
    const numMetrics = data.length;
    
    const points = data.map((metric, i) => {
      const angle = (Math.PI * 2 * i) / numMetrics - Math.PI / 2;
      const value = metric.value / 100;
      const x = center + center * 0.8 * value * Math.cos(angle);
      const y = center + center * 0.8 * value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <DashboardCard className="col-span-1 md:col-span-2">
        <CardTitle>Model Performance Metrics</CardTitle>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full max-w-[200px] mx-auto text-[var(--border-main)]">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
              {[...Array(5)].map((_, i) => (
                <polygon 
                  key={i}
                  points={data.map((_, j) => {
                    const angle = (Math.PI * 2 * j) / numMetrics - Math.PI / 2;
                    const radius = center * 0.8 * ((i + 1) / 5);
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              ))}
              <polygon points={points} fill="rgba(16, 45, 77, 0.5)" stroke="#102d4d" strokeWidth="2" />
            </svg>
          </div>
          <div className="w-full md:w-1/2 space-y-2 text-base text-[var(--text-muted)]">
            {data.map((item) => (
              <div key={item.metric} className="flex items-center justify-between">
                <span className="text-[var(--text-main)]">{item.metric}</span>
                <span className="font-bold text-[var(--text-main)]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </DashboardCard>
    );
  };

  const KPITrends = () => {
    const kpiData = [
      { id: 'Customer Satisfaction', data: analyticsData.kpiTrends.map((d) => ({ x: d.year, y: d.customerSatisfaction })) },
      { id: 'Revenue Growth', data: analyticsData.kpiTrends.map((d) => ({ x: d.year, y: d.revenueGrowth })) },
      { id: 'Model Accuracy', data: analyticsData.kpiTrends.map((d) => ({ x: d.year, y: d.modelAccuracy })) },
      { id: 'Project Success', data: analyticsData.kpiTrends.map((d) => ({ x: d.year, y: d.projectSuccess })) },
      { id: 'Client Retention', data: analyticsData.kpiTrends.map((d) => ({ x: d.year, y: d.clientRetention })) }
    ];

    return (
      <DashboardCard className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
        <CardTitle>Yearly KPI Trends</CardTitle>
        <div style={{ height: '400px' }}>
          <ResponsiveLine
            data={kpiData}
            theme={nivoChartTheme}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 75, max: 100, stacked: false, reverse: false }}
            curve="monotoneX"
            axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Year', legendOffset: 36, legendPosition: 'middle' }}
            axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Performance (%)', legendOffset: -45, legendPosition: 'middle' }}
            colors={{ scheme: 'category10' }}
            lineWidth={3}
            pointSize={12}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            pointBorderColor={{ from: 'seriesColor' }}
            pointLabelYOffset={-12}
            enableGridX={false}
            enableGridY={true}
            gridYValues={5}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 110,
                itemHeight: 24,
                itemOpacity: 0.85,
                symbolSize: 14,
                symbolShape: 'circle',
                effects: [{ on: 'hover', style: { itemOpacity: 1 } }]
              }
            ]}
          />
        </div>
      </DashboardCard>
    );
  };

  const TeamDepartments = () => (
    <DashboardCard className="col-span-1 md:col-span-2">
      <CardTitle>AI Team Specializations</CardTitle>
      <div className="space-y-4">
        {analyticsData.teamDepartments.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <p className="text-base font-medium text-[var(--text-main)]">{item.name}</p>
              <p className="text-base font-medium text-[var(--text-muted)]">{item.percentage}%</p>
            </div>
            <div className="w-full bg-[var(--bg-card-secondary)] rounded-full h-2.5">
              <div className="bg-[var(--brand-primary)] h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );

  const IndustryRankingChart = () => (
    <DashboardCard className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
      <CardTitle>Industry Ranking by Projects Per Year</CardTitle>
      <div style={{ height: '400px' }}>
        <ResponsiveBump
          data={analyticsData.industryProjectRankings}
          theme={nivoChartTheme}
          colors={{ scheme: 'category10' }}
          lineWidth={4}
          activeLineWidth={8}
          inactiveLineWidth={2}
          inactiveOpacity={0.2}
          pointSize={14}
          activePointSize={20}
          inactivePointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={4}
          activePointBorderWidth={5}
          pointBorderColor={{ from: 'serie.color' }}
          axisTop={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: -36 }}
          axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: 32 }}
          axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'ranking', legendPosition: 'middle', legendOffset: -40 }}
          margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
          axisRight={null}
          enableGridX={true}
          enableGridY={false}
        />
      </div>
    </DashboardCard>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] p-8 text-[var(--text-main)]">
      <header className="mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-main)]">AI Analytics Dashboard</h1>
        <p className="text-lg text-[var(--text-muted)] mt-1">An overview of our AI-driven performance, innovation, and growth.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          {analyticsData.statCards.map((stat, index) => (
            <DashboardCard key={index}>
              <p className="text-base text-[var(--text-muted)]">{stat.label}</p>
              <p className="text-4xl sm:text-5xl font-bold text-[var(--text-main)] mt-2">{stat.value}</p>
            </DashboardCard>
          ))}
        </div>

        <IndustryRankingChart />
        <KPITrends />
        <PieChart data={analyticsData.workforceRoles} title="AI Talent Distribution" />
        <PieChart data={analyticsData.techStack} title="Core AI Technologies" />
        <TeamDepartments />
        <RadarChart />
        <EmployeeYearChart />
      </div>
    </div>
  );
};



// PLACEHOLDER CONTENT FOR OTHER TABS
const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="text-center py-20">
    <h2 className="text-4xl font-bold text-[var(--text-main)] mb-4">{title}</h2>
    <p className="text-[var(--text-muted)] text-lg">Content coming soon...</p>
  </div>
);

// MAIN COMPONENT
export default function CompanyOverviewPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Scroll to the top of the page whenever the active tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);


  // If not unlocked, show password protection
  if (!isUnlocked) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <PasswordProtection onUnlock={() => setIsUnlocked(true)} />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'company':
        return <CompanyDetailsContent />;
      case 'clients':
        return <ClientsContent />;
      case 'industries':
        return <IndustriesContent />;
      case 'capabilities':
        return <CapabilitiesContent projectData={projectData} />;
      case 'whyus':
        return <PlaceholderContent title="Why Us?" />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="bg-[var(--bg-main)] min-h-screen product-sans">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="pt-24 pb-12">
          <section className="px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}