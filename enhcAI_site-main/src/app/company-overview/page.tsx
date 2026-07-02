"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const fontStyles = `
  
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

// Navbar Component
const Navbar = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/company-overview' },
    { id: 'company', label: 'Company Details', path: '/company-details' },
    { id: 'clients', label: 'Our Clients', path: '/clients' },
    { id: 'industries', label: 'Industries', path: '/industries' },
    { id: 'capabilities', label: 'Our Capabilities', path: '/capabilities' },
    { id: 'analytics', label: 'Analytics', path: '/analytic' },
    { id: 'whyus', label: 'Why us?', path: '/why-us' }
  ];

  const handleNavigation = (path: string, id: string) => {
    setActiveSection(id);
    router.push(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--bg-main)] border-b border-[var(--border-main)] z-50 product-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`text-sm transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-[var(--brand-primary)] font-semibold border-b-2 border-[var(--brand-primary)]'
                    : 'text-[var(--text-main)] hover:text-[var(--brand-primary)]'
                } pb-1`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => router.push('/contact')}
            className="bg-[var(--brand-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--brand-primary-hover)] transition-colors text-sm font-medium"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

// Vision & Mission Section
const VisionMission = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    {/* Vision */}
    <div className="bg-white dark:bg-[var(--bg-card)] rounded-2xl p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-pink-400 mb-4">Vision</h2>
      <div className="h-1 w-16 bg-pink-400 mb-6"></div>
      <p className="text-gray-700 dark:text-[var(--text-main)] leading-relaxed mb-6">
        To be a catalyst for the world's economic growth by delivering innovative IT solutions that empower businesses and drive digital transformation across the nation, contributing at least 1% to the global GDP.
      </p>
      <div className="flex justify-end">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" 
          alt="Vision illustration" 
          className="w-48 h-48 object-contain"
        />
      </div>
    </div>

    {/* Mission */}
    <div className="bg-white dark:bg-[var(--bg-card)] rounded-2xl p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">Mission</h2>
      <div className="h-1 w-16 bg-[var(--brand-primary)] mb-6"></div>
      <p className="text-gray-700 dark:text-[var(--text-main)] leading-relaxed mb-6">
        To empower global businesses through innovative IT solutions, driving digital transformation and contributing significantly to the nation's economic growth.
      </p>
      <div className="flex justify-end">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop" 
          alt="Mission illustration" 
          className="w-48 h-48 object-contain"
        />
      </div>
    </div>
  </div>
);

// Stats Section
const StatsSection = () => {
  const stats = [
    { label: 'No. of Branches', value: '4' },
    { label: 'No. of Employees', value: '150+' },
    { label: 'No. of Projects', value: '357+' },
    { label: 'Our Products', value: '7' },
    { label: 'Ongoing Projects', value: '57+' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800 dark:bg-[var(--bg-card-secondary)] rounded-2xl p-6 text-white">
          <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
          <p className="text-4xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// Initiatives & Goals Section
const InitiativesGoals = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    {/* Our Initiatives */}
    <div className="bg-[var(--brand-primary)] rounded-2xl p-8 text-white relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Our Initiatives</h2>
      <ul className="space-y-3 text-sm leading-relaxed">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Boosting productivity with daily scrum meetings.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Exploring creativity through Webithons.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Improving confidence with public speaking sessions.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Support the Indian government in tech and social initiatives.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Sharing ideas through Meetups and Tech Talks.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Enhancing skills with personalized training.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Making a difference with social welfare activities.</span>
        </li>
      </ul>
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg viewBox="0 0 200 200" className="w-32 h-32" fill="white">
          <circle cx="100" cy="60" r="25"/>
          <rect x="80" y="90" width="40" height="60" rx="5"/>
          <circle cx="70" cy="110" r="15"/>
          <circle cx="130" cy="110" r="15"/>
          <path d="M 50 140 Q 100 170 150 140" stroke="white" fill="none" strokeWidth="3"/>
        </svg>
      </div>
    </div>

    {/* Goals of 2025 */}
    <div className="bg-[var(--brand-primary)] rounded-2xl p-8 text-white relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Goals of 2025</h2>
      <ul className="space-y-3 text-sm leading-relaxed">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Establish a new branch in the UAE</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Expand the team to 200+ employees.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Adopting emerging technologies like Quantum Computing, Generative AI, Deep Learning, Agentic AI and RPA.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Aim to provide 500+ internships in 2025 for new graduates</span>
        </li>
      </ul>
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg viewBox="0 0 200 200" className="w-32 h-32" fill="white">
          <polygon points="100,20 120,80 180,80 135,120 155,180 100,140 45,180 65,120 20,80 80,80"/>
        </svg>
      </div>
    </div>
  </div>
);

// World Map Section
const WorldMap = () => (
  <div className="bg-white dark:bg-[var(--bg-card)] rounded-2xl p-8 shadow-sm mb-12">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--text-main)] mb-6">Our Offices & Market presence</h2>
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl overflow-hidden">
      <svg viewBox="0 0 1000 500" className="w-full h-full">
        {/* North America */}
        <path d="M100,100 L200,80 L250,120 L200,150 Z" fill="#60a5fa" opacity="0.7" />
        <text x="150" y="130" fontSize="12" fill="#1e40af" fontWeight="bold">USA</text>
        <text x="130" y="95" fontSize="12" fill="#1e40af" fontWeight="bold">CANADA</text>
        
        {/* Europe */}
        <path d="M350,80 L450,90 L470,130 L400,140 Z" fill="#60a5fa" opacity="0.7" />
        <text x="380" y="110" fontSize="12" fill="#1e40af" fontWeight="bold">Europe</text>
        
        {/* India (highlighted) */}
        <circle cx="550" cy="180" r="8" fill="#ef4444" />
        <text x="565" y="185" fontSize="13" fill="#ef4444" fontWeight="bold">India</text>
        
        {/* Middle East */}
        <path d="M480,150 L540,145 L555,185 L500,190 Z" fill="#60a5fa" opacity="0.6" />
        <text x="485" y="170" fontSize="11" fill="#1e40af" fontWeight="bold">Middle East</text>
        
        {/* Asia Pacific */}
        <path d="M600,160 L700,155 L720,210 L650,220 Z" fill="#60a5fa" opacity="0.6" />
        <text x="640" y="180" fontSize="11" fill="#1e40af">Hong Kong</text>
        <text x="660" y="210" fontSize="11" fill="#1e40af">Singapore</text>
        
        {/* South America */}
        <path d="M180,250 L250,260 L240,340 L200,330 Z" fill="#60a5fa" opacity="0.6" />
        <text x="200" y="300" fontSize="11" fill="#1e40af">South America</text>
        <text x="170" y="260" fontSize="11" fill="#1e40af">Mexico</text>
        
        {/* Africa */}
        <path d="M380,250 L450,245 L460,320 L400,325 Z" fill="#60a5fa" opacity="0.6" />
        <text x="405" y="280" fontSize="11" fill="#1e40af">Kenya</text>
        <text x="395" y="315" fontSize="11" fill="#1e40af">South Africa</text>
        <text x="470" y="295" fontSize="11" fill="#1e40af">Mauritius</text>
        
        {/* Australia */}
        <path d="M720,320 L800,315 L810,370 L730,375 Z" fill="#60a5fa" opacity="0.6" />
        <text x="745" y="350" fontSize="11" fill="#1e40af">Australia</text>
        <text x="780" y="395" fontSize="10" fill="#1e40af">New Zealand</text>
      </svg>
    </div>
  </div>
);

// Recognitions Section
const Recognitions = () => {
  const recognitions = [
    { name: 'Microsoft', subtitle: 'Solutions Partner', type: 'partner' },
    { name: 'Google Rating', rating: '4.7', stars: 5, type: 'rating' },
    { name: 'GoodFirms', badge: 'BEST COMPANY TO WORK WITH', type: 'badge' },
    { name: 'Clutch', subtitle: 'REVIEWED ON', rating: '5.0 RATING', stars: 5, type: 'rating' },
    { name: 'AppFutura', badge: 'VISIT OUR PROFILE AT', type: 'badge' }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--text-main)] mb-6">Recognitions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recognitions.map((item, index) => (
          <div key={index} className="bg-white dark:bg-[var(--bg-card)] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[var(--border-main)] flex flex-col items-center justify-center text-center min-h-[160px] hover:shadow-lg transition-shadow">
            {item.stars && (
              <div className="flex gap-1 text-yellow-400 mb-2">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            )}
            <p className="font-bold text-gray-800 dark:text-[var(--text-main)] text-sm mb-1">{item.name}</p>
            {item.subtitle && <p className="text-xs text-gray-600 dark:text-[var(--text-muted)] mb-2">{item.subtitle}</p>}
            {item.rating && <p className="text-2xl font-bold text-yellow-500 mt-1">{item.rating}</p>}
            {item.badge && <div className="mt-2 px-3 py-1 bg-[var(--brand-primary)]/10 rounded-full">
              <p className="text-xs text-[var(--brand-primary)] font-bold">{item.badge}</p>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Company Overview Page Component
export default function CompanyOverviewPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="bg-[var(--bg-main)] min-h-screen product-sans">
        <Navbar />
        
        <main className="pt-24 pb-12">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">Company Overview</h1>
            <VisionMission />
            <StatsSection />
            <InitiativesGoals />
            <WorldMap />
            <Recognitions />
          </section>
        </main>
      </div>
    </>
  );
}