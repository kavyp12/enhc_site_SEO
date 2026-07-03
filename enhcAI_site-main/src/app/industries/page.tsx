"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Workwith from '../components/workwith';
import Footer from '../components/footer';
import Reveal from '../components/Reveal';

// Each industry explains how our AI and software solutions solve real
// business problems in that sector. Layout alternates left/right by index.
interface Industry {
  name: string;
  label: string;
  heading: string;
  description: string;
  solutions: string[];
  image: string;
  alt: string;
}

const industries: Industry[] = [
  {
    name: 'Healthcare',
    label: 'Healthcare',
    heading: 'Smarter care, lighter admin, better outcomes.',
    description:
      'We help clinics, hospitals and health-tech teams cut administrative load and surface insights from their data. From AI-assisted diagnostics support and patient triage chatbots to appointment automation and secure record systems, our solutions free clinicians to focus on patients.',
    solutions: [
      'AI patient triage & support chatbots',
      'Predictive analytics for patient outcomes',
      'Appointment & workflow automation',
      'Secure patient management systems',
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2070&q=80',
    alt: 'Healthcare professional using digital technology',
  },
  {
    name: 'Real Estate',
    label: 'Real Estate',
    heading: 'Close more deals with AI-driven property tech.',
    description:
      'For agencies, developers and property platforms we build tools that qualify leads, value properties and automate the busywork. Intelligent assistants respond to enquiries around the clock while predictive models help you price and position listings with confidence.',
    solutions: [
      'AI lead qualification & follow-up agents',
      'Automated property valuation models',
      'Listing & CRM platforms',
      'Virtual assistants for buyer enquiries',
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2070&q=80',
    alt: 'Modern real estate property and keys',
  },
  {
    name: 'Education',
    label: 'Education',
    heading: 'Personalised learning, powered by AI.',
    description:
      'We partner with schools, universities and ed-tech companies to build platforms that adapt to every learner. AI tutors, automated grading and engagement analytics help educators deliver personalised experiences at scale and spend less time on repetitive tasks.',
    solutions: [
      'AI tutors & learning assistants',
      'Adaptive learning platforms',
      'Automated grading & feedback',
      'Student engagement analytics',
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2070&q=80',
    alt: 'Students learning with digital technology',
  },
  {
    name: 'Transportation & Logistics',
    label: 'Transportation & Logistics',
    heading: 'Move goods faster with intelligent operations.',
    description:
      'For carriers, fleets and supply-chain operators we build systems that optimise routes, forecast demand and automate dispatch. Real-time tracking and predictive maintenance keep your operation running while AI cuts costs across the network.',
    solutions: [
      'Route optimisation & demand forecasting',
      'Fleet tracking & telematics dashboards',
      'Warehouse & inventory automation',
      'Predictive maintenance models',
    ],
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2070&q=80',
    alt: 'Logistics trucks and supply chain operations',
  },
  {
    name: 'Accounting & Finance',
    label: 'Accounting & Finance',
    heading: 'Automate the numbers, sharpen the decisions.',
    description:
      'We help finance teams, accounting firms and fintechs eliminate manual data entry and reduce risk. Intelligent document processing, fraud detection and forecasting models turn raw transactions into accurate, real-time financial intelligence.',
    solutions: [
      'Intelligent document & invoice processing',
      'AI fraud & anomaly detection',
      'Financial forecasting & analytics',
      'Automated reconciliation & reporting',
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2070&q=80',
    alt: 'Financial analytics and accounting dashboards',
  },
];

const CheckIcon = () => (
  <div className="w-4 h-4 bg-[var(--brand-primary)] rounded-full flex items-center justify-center flex-shrink-0">
    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const IndustriesPage = () => {
  return (
    <>
      <div className="relative bg-[var(--bg-main)]">
        <div className="pt-4 sm:pt-6 lg:pt-8">
          <Navbar />
        </div>
      </div>

      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <style jsx>{`
          * { font-family: var(--font-poppins), sans-serif; }
        `}</style>

        {/* Hero Section */}
        <div className="bg-[var(--bg-main)] text-[var(--text-main)] flex w-full items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 pt-20 sm:pt-24 lg:pt-24">
          <div className="flex w-full max-w-7xl flex-col gap-8 sm:gap-10 lg:flex-row lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <p className="mb-4 text-base sm:text-lg flex items-center justify-center lg:justify-start space-x-2">
                <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">Industries</span>
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none tracking-tight">
                Solutions built <br />for your industry.
              </h1>
            </div>
            <div className="flex-1 text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-muted)] text-center lg:text-left">
              <p className="mb-6">
                As an AI-first IT solutions company, we don't believe in one-size-fits-all software. Every sector has its own workflows, regulations and pressures.
              </p>
              <p>
                We bring deep technical expertise and real business understanding to each industry we serve — pairing{' '}
                <span className="text-[var(--text-main)] underline decoration-[var(--text-muted)] decoration-1 underline-offset-4">AI and automation</span>{' '}
                with modern software to solve the problems that actually move the needle for your business.
              </p>
            </div>
          </div>
        </div>

        {/* Section divider with running heading */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[var(--border-secondary)]" />
        </div>

        {/* Industry Sections */}
        {industries.map((industry, index) => (
          <Reveal key={industry.name} className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-[var(--border-main)]">
            <div className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className={`flex-1 relative w-full ${index % 2 === 1 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                <div className="group relative h-[300px] sm:h-[400px] lg:h-[480px] w-full rounded-2xl overflow-hidden">
                  <img src={industry.image} alt={industry.alt} decoding="async" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-white text-sm font-medium tracking-wide bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                    {industry.label}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className={`flex-1 space-y-6 text-center lg:text-left ${index % 2 === 1 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-[var(--brand-accent)] text-lg font-semibold tracking-tight">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-[var(--border-secondary)]" />
                  <span className="text-[var(--text-muted)] text-sm uppercase tracking-widest">{industry.label}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                  {industry.heading}
                </h2>
                <div className="space-y-4 text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
                  <p>{industry.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                  {industry.solutions.map((solution) => (
                    <div key={solution} className="flex items-center gap-3 justify-center lg:justify-start">
                      <CheckIcon />
                      <span className="text-[var(--text-main)] text-sm sm:text-base text-left">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* CTA Section */}
        <Reveal className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <p className="mb-4 text-base sm:text-lg flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
              <span className="text-[var(--text-muted)]">Don't see your industry?</span>
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-8">
              Whatever your sector, we can help you build, automate, transform and scale.
            </h2>
            <Link href="/startproject" className="group bg-[var(--brand-primary)] text-white font-medium text-sm py-3 px-6 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 hover:bg-[var(--brand-primary-hover)]">
              Start a project today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Workwith />
        <Footer />
      </div>
    </>
  );
};

export default IndustriesPage;
