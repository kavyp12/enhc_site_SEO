"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import Workwith from '../components/workwith';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Blog from '../components/blog';

// --- LogoCard Component ---
const LogoCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-[var(--bg-secondary)] rounded-2xl h-36 flex items-center justify-center p-6 hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer min-w-[280px] sm:min-w-[300px] flex-shrink-0">
    {children}
  </div>
);

// --- SVG Icon Components ---
const ResponsiveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 6L22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <path d="M13 2L4.5 13H11L11 22L19.5 11H13L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const SeoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CmsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
    <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const EcommerceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.07 15.93 4.51 17 5.41 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "enhc rebuilt our website from the ground up. It loads instantly, ranks far better on Google, and conversions climbed within weeks.",
    author: "Sarah Johnson",
    company: "Tech Innovations Ltd",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    rating: 5,
    text: "The team understood our brand and shipped a fast, polished web platform that our customers genuinely enjoy using.",
    author: "Michael Chen",
    company: "Digital Dynamics",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    rating: 5,
    text: "Clean code, great communication, and a site that's easy for our team to update. Exactly what we needed.",
    author: "Emily Rodriguez",
    company: "Future Systems Inc",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    rating: 5,
    text: "From design to deployment everything was seamless, and the ongoing support has been exceptional. Highly recommended!",
    author: "David Thompson",
    company: "Smart Solutions Co",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];

const AppDevelopmentPage = () => {
  return (
    <>
      <div className="relative bg-[var(--bg-main)]">
        <div className="pt-4 sm:pt-6 lg:pt-8">
          <Navbar />
        </div>
      </div>

      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <style jsx>{`
          @keyframes scroll-left { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          @keyframes scroll-right { 0% { transform: translateX(-100%); } 100% { transform: translateX(0%); } }
          .animate-scroll-left { animation: scroll-left 30s linear infinite; }
          .animate-scroll-right { animation: scroll-right 30s linear infinite; }
          .left-text { animation: scroll-left 30s linear infinite; }
          .right-text { animation: scroll-right 30s linear infinite; }
          * { font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
        `}</style>

        <style jsx global>{`
          .font-product-sans { font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
          .blog-section * { text-align: inherit; }
          .blog-left-content { text-align: left !important; }
          .blog-card-content { text-align: left !important; }
        `}</style>

        {/* Hero Section */}
        <div className="font-product-sans bg-[var(--bg-main)] text-[var(--text-main)] flex w-full items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 pt-20 sm:pt-24 lg:pt-24">
          <div className="flex w-full max-w-7xl flex-col gap-8 sm:gap-10 lg:flex-row lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <p className="mb-4 text-base sm:text-lg flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">App Development</span>
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none tracking-tight">
                App Development <br />for Your Business.
              </h1>
            </div>
            <div className="flex-1 text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-muted)] text-center lg:text-left">
              <p className="mb-6">
                Here at enhc, we design and build fast, intuitive mobile apps for iOS and Android that users love and businesses rely on.
              </p>
              <p>
                Native and cross-platform, consumer and enterprise — we cover the full mobile journey. We can take a start-up from idea to the App Store and Play Store, modernise a legacy app, or scale a product to millions of users. Our in-house{' '}
                <span className="text-[var(--text-main)] underline decoration-[var(--text-muted)] decoration-1 underline-offset-4">app development team</span>{' '}
                works alongside you to build an app that reflects your brand, performs flawlessly on every device, and is easy to grow over time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full bg-[var(--bg-main)] px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="relative w-full max-w-7xl mx-auto h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden rounded-2xl sm:rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2070&q=80"
              alt="Mobile app interface shown on a smartphone"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[var(--bg-secondary)] bg-opacity-80 px-4 py-2 sm:px-5 sm:py-3 rounded-full backdrop-blur-sm">
              <span className="text-[var(--text-main)] text-xs sm:text-sm font-medium">Tell me more</span>
              <svg className="inline-block ml-2 w-4 h-4 text-[var(--text-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-8 sm:px-16 lg:px-24 py-16">
          <div className="flex w-full max-w-7xl mx-auto flex-col gap-10 lg:flex-row lg:gap-20 items-center">
            <div className="flex-1 text-center lg:text-left">
              <p className="mb-6 text-base sm:text-lg flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">App Development</span>
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-8">
                Are you a startup, a well-established company, in Ahmedabad or worldwide? It doesn't matter. We partner with a diverse range of clients.
              </h2>
              <div className="inline-flex justify-center lg:justify-start">
                <Link href="/about" className="group bg-[var(--brand-primary)] text-white font-medium text-sm py-2 px-4 rounded-full self-start flex items-center gap-2 transition-transform hover:scale-105 mt-4 hover:bg-[var(--brand-primary-hover)]">
                  About enhc
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full text-center lg:text-left lg:pt-16 lg:-translate-y-15 lg:translate-x-80">
              <h3 className="text-[var(--text-muted)] text-sm mb-4 ">Our App Capabilities</h3>
              <div className="space-y-2 text-sm">
                {[
                  'iOS Apps',
                  'Android Apps',
                  'Cross-Platform Apps',
                  'UI/UX Design',
                  'App Store Launch',
                  'API & Backend'
                ].map((capability, index) => (
                  <div key={index} className="flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-4 h-4 bg-[var(--brand-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--text-main)] text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Text Section */}
        <div className="overflow-hidden bg-[var(--bg-main)] py-8 text-center">
          <div className="left-text w-full text-[var(--text-main)] text-5xl sm:text-7xl lg:text-9xl font-bold whitespace-nowrap leading-none">
            Let's build together. Let's build together. Let's build together. Let's build together. Let's build together.
          </div>
          <div className="right-text w-full text-[var(--text-main)] text-5xl sm:text-7xl lg:text-9xl font-bold whitespace-nowrap leading-none">
            Let's build together. Let's build together. Let's build together. Let's build together. Let's build together.
          </div>
        </div>

        {/* Vision Section */}
        <div className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <p className="text-base sm:text-md flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">We approach every project with a clear vision.</span>
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                We like to cut through the noise and build fast, reliable, and delightful mobile apps.
              </h2>
              <div className="space-y-4 text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
                <p>
                  We don't <em className="italic">just</em> ship screens. Here at enhc, we care about the whole experience — from UX and design through development and testing, to store launch and post-release iteration. We tailor our service to the client and the project requirements.
                </p>
              </div>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link href="startproject" className="group bg-[var(--brand-primary)] text-white font-medium text-sm py-3 px-6 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 hover:bg-[var(--brand-primary-hover)]">
                  Start a project today
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                <div className="absolute bottom-0 left-0 right-0 h-full rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=2070&q=80"
                    alt="Designer prototyping a mobile app"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scalable Section */}
        <div className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 relative w-full lg:order-1 order-2">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                <div className="absolute bottom-0 left-0 right-0 h-full rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80"
                    alt="Team collaborating on a mobile app build"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6 text-center lg:text-left lg:order-2 order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                We build mobile apps that are powerful, scalable, and easy to maintain.
              </h2>
              <div className="space-y-4 text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
                <p>
                  We don't <em className="italic">just</em> build impressive interfaces. Here at enhc, we understand all aspects of a successful mobile product, from development and testing to store deployment and ongoing support. We tailor our services to meet your specific project requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="w-full bg-[var(--bg-main)] text-[var(--text-main)] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
            <div className="flex flex-col w-full text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--text-main)] mt-2 max-w-5xl leading-tight">
                <span>We use the latest technologies</span><br className="hidden sm:block" />
                <span>to build future-proof mobile apps.</span>
              </h2>
            </div>
            <div className="mt-12 sm:mt-16 overflow-hidden w-full">
              <div className="mb-6">
                <div className="flex animate-scroll-left gap-6 justify-center">
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">React Native</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Flutter</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Swift</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Kotlin</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Expo</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">React Native</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Flutter</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Swift</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Kotlin</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Expo</p></LogoCard>
                </div>
              </div>
              <div>
                <div className="flex animate-scroll-right gap-6 justify-center">
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Firebase</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">GraphQL</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Figma</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">App Store</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Play Store</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Firebase</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">GraphQL</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Figma</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">App Store</p></LogoCard>
                  <LogoCard><p className="text-3xl sm:text-4xl font-bold text-[var(--text-main)]">Play Store</p></LogoCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-[var(--bg-main)] text-[var(--text-main)] font-sans px-4 sm:px-6 lg:px-8 py-12 sm:py-16 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-24 max-w-7xl mx-auto">
            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <p className="text-sm font-base text-[var(--text-muted)] mb-4 flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">What we can help you with</span>
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                A team of app experts that<br className="hidden sm:block" /> can help you design, build<br className="hidden sm:block" /> and launch an app<br className="hidden sm:block" /> you're proud of
              </h2>
            </div>
            <div className="mt-8 lg:mt-0 w-full lg:w-auto flex justify-center lg:justify-end">
              <Link href="/contact" className="group bg-[var(--brand-primary)] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full flex items-center gap-3 whitespace-nowrap transition-transform transform hover:scale-105 hover:bg-[var(--brand-primary-hover)]">
                Get in touch today
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto">
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><ResponsiveIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">Native iOS &amp; Android</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                High-performance native apps built with Swift and Kotlin for the best platform experience.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><CodeIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">Cross-Platform</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                One codebase for iOS and Android with React Native and Flutter — faster to ship, easier to maintain.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><EcommerceIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">UI/UX Design</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                Intuitive, on-brand mobile interfaces designed around how your users actually behave.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><SpeedIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">Performance</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                Smooth, responsive apps with fast launch times and efficient battery and data usage.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><SeoIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">Store Launch</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                End-to-end App Store and Play Store submission, review handling and release management.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="bg-[var(--brand-primary)] p-2 rounded-lg inline-flex"><CmsIcon /></div>
                <h3 className="text-xl sm:text-2xl font-bold">API &amp; Backend</h3>
              </div>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                Secure, scalable backends, APIs and integrations that power your app behind the scenes.
              </p>
              <div className="w-full h-px bg-[var(--text-muted)]"></div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="testimonial-section bg-[var(--bg-main)] text-[var(--text-main)] w-full py-12 sm:py-20 lg:py-28 font-product-sans">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
            <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
              <div>
                <p className="font-semibold tracking-wider text-[var(--text-muted)] text-left flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                  <span className="text-[var(--text-muted)]">Testimonials</span>
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 leading-tight text-left">
                  Trusted by industry leaders
                </h2>
                <button className="mt-8 sm:mt-12 bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors duration-300 w-fit">
                  View all success stories
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="flex gap-4 sm:gap-8 mt-12 lg:mt-16">
                <button className="testimonial-swiper-prev p-3 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                  <ArrowLeft size={24} />
                </button>
                <button className="testimonial-swiper-next p-3 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
            <div className="lg:col-span-8 overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1.1}
                navigation={{ prevEl: '.testimonial-swiper-prev', nextEl: '.testimonial-swiper-next' }}
                breakpoints={{
                  640: { slidesPerView: 1.2, spaceBetween: 20 },
                  768: { slidesPerView: 1.5, spaceBetween: 30 },
                  1024: { slidesPerView: 2.2, spaceBetween: 40 },
                }}
                className="!overflow-visible"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="h-auto">
                    <div className="bg-[var(--bg-secondary)] p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between min-h-[380px] sm:min-h-[400px]">
                      <div>
                        <div className="flex justify-center text-[var(--brand-primary)] mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} fill="var(--brand-primary)" strokeWidth={0} size={20} />
                          ))}
                        </div>
                        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed text-center">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-8 justify-center sm:justify-start">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg'; }}
                        />
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-[var(--text-main)]">{testimonial.author}</h3>
                          <p className="text-[var(--text-muted)]">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Our Work Section */}
        <section className="work-section bg-[var(--bg-main)] text-[var(--text-main)] w-full py-12 sm:py-20 lg:py-28 font-product-sans px-4 sm:px-6 lg:px-8">
          <div className="max-w-[90rem] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-12 sm:mb-16">
              <div className="text-center sm:text-left">
                <p className="text-base sm:text-lg mb-4 flex items-center justify-center sm:justify-start space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                  <span className="text-[var(--text-muted)]">Our Work</span>
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                  Our favourite App<br />
                  Development Projects
                </h2>
              </div>
              <div className="mt-8 sm:mt-0 self-center sm:self-auto">
                <Link href="project" className="bg-[var(--brand-primary)] text-white font-medium text-sm py-3 px-6 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 hover:bg-[var(--brand-primary-hover)]">
                  View our work
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1.1}
                navigation={{ prevEl: '.work-swiper-prev', nextEl: '.work-swiper-next' }}
                breakpoints={{
                  640: { slidesPerView: 1.5, spaceBetween: 24 },
                  768: { slidesPerView: 2.1, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="!overflow-visible"
              >
                <SwiperSlide>
                  <div className="group cursor-pointer">
                    <div className="bg-[var(--bg-secondary)] rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 relative">
                      <div className="relative h-[400px] bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                        <div className="absolute inset-0">
                          <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=2070&q=80" alt="Fitness website redesign" className="w-full h-full object-cover opacity-30" />
                        </div>
                        <div className="relative z-10 text-center p-8">
                          <div className="text-[var(--text-main)] text-5xl font-bold flex items-center justify-center flex-col gap-4">
                            <span>Corporate</span>
                            <div className="w-24 h-1 bg-[var(--brand-primary)]"></div>
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--brand-primary)', WebkitTextFillColor: 'transparent' }}>App</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                        <span>2023</span><span>•</span><span>Global Retail Corp</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold leading-tight text-[var(--text-main)]">
                        Consumer fitness<br />mobile app
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="group cursor-pointer">
                    <div className="bg-[var(--bg-secondary)] rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 relative">
                      <div className="relative h-[400px] flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2070&q=80" alt="E-commerce platform" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                        <span>2023</span><span>•</span><span>SaaS Innovations</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold leading-tight text-[var(--text-main)]">
                        On-demand delivery<br />app for iOS &amp; Android
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="group cursor-pointer">
                    <div className="bg-[var(--bg-secondary)] rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 relative">
                      <div className="relative h-[400px] bg-gray-800 flex items-center justify-center p-8">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80" alt="Analytics dashboard web app" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                        <span>2023</span><span>•</span><span>ManuFuture Inc.</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold leading-tight text-[var(--text-main)]">
                        Enterprise field-service<br />mobile app
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="flex gap-4 mt-12 justify-center">
                <button className="work-swiper-prev p-3 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                  <ArrowLeft size={24} />
                </button>
                <button className="work-swiper-next p-3 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <Blog />
        <Workwith />
        <Footer />
      </div>
    </>
  );
};

export default AppDevelopmentPage;
