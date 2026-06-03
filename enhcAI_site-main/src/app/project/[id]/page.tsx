"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import projectData, { Project } from '@/data/projectData';

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
  >
    <path
      d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SliderSection = ({ slides }: { slides: Project['slides'] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));

  const getCardStyle = (index: number) => {
    let offset = index - currentIndex;
    if (offset < -slides.length / 2) offset += slides.length;
    if (offset > slides.length / 2) offset -= slides.length;
    
    const isVisible = Math.abs(offset) <= 1;
    const translateXValue = isMobile ? offset * 80 : offset * 65;

    return {
      position: 'absolute' as const,
      width: 'clamp(280px, 80vw, 550px)',
      transform: `translateX(${translateXValue}%) scale(${offset === 0 ? 1 : 0.85})`,
      opacity: isVisible ? 1 : 0,
      zIndex: slides.length - Math.abs(offset),
      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      pointerEvents: offset === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  const renderSlideContent = (slide: Project['slides'][number]) => {
    const { content } = slide;
    switch (content.type) {
      case 'testimonial':
        return (
          <div className="bg-[var(--bg-main)] text-[var(--text-main)] w-full h-full rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -left-8 text-[180px] sm:text-[220px] font-extrabold text-[var(--text-muted)]/10 opacity-50 z-0 select-none">
              {content.testimonial?.[0] || ''}
            </div>
            <div className="absolute -bottom-12 -right-6 text-[180px] sm:text-[220px] font-extrabold text-[var(--text-muted)]/10 opacity-50 z-0 select-none">
              AI
            </div>
            <div className="relative z-10">
              <p className="text-lg sm:text-xl leading-relaxed">{content.testimonial}</p>
              <p className="mt-4 text-[var(--text-muted)]">{content.description}</p>
            </div>
            <div className="h-1/2 w-full mt-4 rounded-lg overflow-hidden relative z-10">
              <img
                src={content.image}
                alt="Slide Image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] w-full h-full rounded-2xl p-6 flex flex-col shadow-2xl">
            <div className="text-center">
              <p className="text-xs text-[var(--text-muted)] tracking-[0.2em]">AI FEATURES</p>
              <h3 className="text-xl sm:text-2xl mt-2 font-semibold tracking-wide">{content.title}</h3>
            </div>
            <div className="flex-grow my-4 flex gap-2">
              <div className="w-2/3 relative rounded-lg overflow-hidden">
                <img
                  src={content.features?.[0]?.image}
                  alt={content.features?.[0]?.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/60 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                  {content.features?.[0]?.label}
                </div>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <div className="h-1/2 rounded-lg overflow-hidden">
                  <img
                    src={content.features?.[1]?.image}
                    alt={content.features?.[1]?.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="h-1/2 rounded-lg overflow-hidden">
                  <img
                    src={content.features?.[2]?.image}
                    alt={content.features?.[2]?.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Previous feature"
                >
                  &larr;
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Next feature"
                >
                  &rarr;
                </button>
              </div>
              <span className="text-[var(--text-muted)]">3/4</span>
            </div>
          </div>
        );
      case 'platform':
        return (
          <div className="bg-[var(--bg-main)] text-[var(--text-main)] w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <p className="text-xs text-[var(--text-muted)] tracking-widest">{content.title}</p>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-2">{content.description}</p>
              <h3 className="text-3xl sm:text-4xl mt-4 font-semibold leading-tight">{content.title}</h3>
            </div>
            <div className="h-[55%] w-full mt-4 rounded-lg overflow-hidden relative">
              <img
                src={content.image}
                alt="Content Outline Generator"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/80 text-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                OUTLINES
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] w-full h-full rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-semibold">{content.title}</h3>
            <p className="text-[var(--text-muted)] mt-2 max-w-xs text-sm sm:text-base">{content.description}</p>
            <div className="w-full h-1/2 mt-4 rounded-lg overflow-hidden">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="mt-20 py-16 bg-[var(--bg-secondary)] font-sans">
      <div className="relative w-full h-[600px] md:h-[550px] flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} style={getCardStyle(index)} className="h-[550px] md:h-full">
            {renderSlideContent(slide)}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePrev}
          className="bg-[var(--bg-tertiary)] w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-main)] hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-500"
          aria-label="Previous slide"
        >
          <ArrowIcon className="w-5 h-5 transform rotate-180" />
        </button>
        <button
          onClick={handleNext}
          className="bg-[var(--bg-tertiary)] w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-main)] hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-neutral-500"
          aria-label="Next slide"
        >
          <ArrowIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

const LeftArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProjectShowcaseSlider = ({ showcaseSlides }: { showcaseSlides: Project['showcaseSlides'] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, showcaseSlides.length - visibleSlides);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleSlides, currentIndex, showcaseSlides.length]);

  const maxIndex = Math.max(0, showcaseSlides.length - visibleSlides);
  const handlePrev = () => setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  const handleNext = () => setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : maxIndex));

  return (
    <section className="bg-[var(--bg-main)] py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative overflow-hidden">
          <div
            className="flex -mx-2 sm:-mx-4"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`, transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}
          >
            {showcaseSlides.map((slide) => (
              <div key={slide.id} className="px-2 sm:px-4" style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
                <div className="flex flex-col">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <p className="text-sm text-[var(--text-muted)]">
                      {slide.year} • {slide.client}
                    </p>
                    <h3 className="mt-2 text-lg md:text-xl lg:text-2xl font-medium leading-tight text-[var(--text-main)]">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-3 mt-8 md:mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-[var(--bg-secondary)] w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none disabled:opacity-40"
            aria-label="Previous slide"
          >
            <LeftArrowIcon />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="bg-[var(--bg-secondary)] w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none disabled:opacity-40"
            aria-label="Next slide"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default function ProjectPage() {
  const { id } = useParams();
  const project = projectData.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
        
        :root {
          --bg-main: #0a0a0a;
          --bg-secondary: #111111;
          --bg-tertiary: #1a1a1a;
          --text-main: #FFFFFF;
          --text-muted: #888888;
          --brand-primary: #6366f1;
          --brand-primary-hover: #4f46e5;
          --border-color: #222222;
        }

        html[data-theme='light'] {
          --bg-main: #FFFFFF;
          --bg-secondary: #F8FAFC;
          --bg-tertiary: #E2E8F0;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --brand-primary: #6366f1;
          --brand-primary-hover: #4f46e5;
          --border-color: #E2E8F0;
        }

        body {
          background-color: var(--bg-main);
        }
        
        nav, span, button, h1, h2, h3, h4, h5, h6, p, div, a {
          font-family: 'Product Sans', sans-serif;
        }
      `}</style>
      <Navbar />
      <div className="min-h-screen text-[var(--text-main)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between py-6 mt-8 sm:mt-0">
            <nav className="flex space-x-3 lg:translate-y-35">
              <button className="bg-[var(--bg-secondary)] text-[var(--text-main)] text-xs sm:text-sm font-medium py-2 px-3 sm:px-5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors">
                {project.platform}
              </button>
              <button className="bg-[var(--bg-secondary)] text-[var(--text-main)] text-xs sm:text-sm font-medium py-2 px-3 sm:px-5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors">
                {project.category}
              </button>
              <button className="bg-[var(--bg-secondary)] text-[var(--text-main)] text-xs sm:text-sm font-medium py-2 px-3 sm:px-5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors">
                Content Generation
              </button>
            </nav>
            <div className="text-[var(--text-muted)] text-xs sm:text-sm lg:-translate-x-140 lg:translate-y-15">
              {project.year} • {project.client}
            </div>
          </header>

          <main className="mt-8 sm:mt-8">
            <div className="relative">
              <div className="relative z-10 mb-4 sm:mb-8 px-4 sm:px-0 lg:translate-x-150">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
              {project.title.split('|').map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  <br />
                </React.Fragment>
              ))}
            </h1>


              </div>
              <div className="relative px-4 sm:px-0">
                <img
                  src={project.images.main}
                  alt={`${project.title} Dashboard Interface`}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="lg:sticky lg:top-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)] mb-8">
                  AI-powered platform for {project.category.toLowerCase()}
                </h2>
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/48?img=${i + 15}`}
                      alt="Team member"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--bg-main)]"
                    />
                  ))}
                </div>
              </div>

              <div className="lg:pt-0">
                <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-12">{project.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-[var(--text-muted)] text-sm uppercase tracking-wide mb-2">Platform</h4>
                    <p className="text-[var(--text-main)] text-lg sm:text-xl font-medium">{project.platform}</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--text-muted)] text-sm uppercase tracking-wide mb-2">Category</h4>
                    <p className="text-[var(--text-main)] text-lg sm:text-xl font-medium">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--text-muted)] text-sm uppercase tracking-wide mb-2">Development</h4>
                    <p className="text-[var(--text-main)] text-lg sm:text-xl font-medium">{project.development}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-20 md:mt-32">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={project.images.secondary}
                  alt={`${project.title} AI Technology Background`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 p-8 md:p-16">
                  <div className="flex items-center justify-center h-[300px] md:h-[500px]">
                    <div className="text-center">
                      <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">AI-Powered</h3>
                      <p className="text-xl text-white/80">Next-Generation {project.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                  <img
                    src={project.images.analytics}
                    alt={`${project.title} Analytics Dashboard`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                  <img
                    src={project.images.machineLearning}
                    alt={`${project.title} Machine Learning Models`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </section>

            <section className="w-full h-[400px] sm:h-[500px] md:h-[700px] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden mt-10 md:mt-16 p-4 sm:p-6 md:p-8 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={project.images.idea}
                  alt={`${project.title} Content Generation Interface`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• Feature 1</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  {project.showcaseSlides[1].title.split(' with ')[0]}
                </h2>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  Our advanced AI delivers {project.showcaseSlides[1].title.toLowerCase()}. Customize and optimize to suit your needs, driving engagement and results.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
                <img
                  src={project.images.thumbnail}
                  alt={`${project.title} Feature 1 Interface`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </section>

            <SliderSection slides={project.slides} />

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• Feature 2</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  {project.showcaseSlides[2].title.split(' for ')[0]}
                </h2>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  Transform your ideas with our AI-driven {project.showcaseSlides[2].title.toLowerCase()}. Input your preferences and get tailored results instantly.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
                <img
                  src={project.images.script}
                  alt={`${project.title} Feature 2 Interface`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• Feature 3</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  {project.showcaseSlides[3].title.split(' for ')[0]}
                </h2>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  Generate {project.showcaseSlides[3].title.toLowerCase()} with AI that optimizes for discoverability and engagement, tailored to your audience.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
                <img
                  src={project.images.titleGeneration}
                  alt={`${project.title} Feature 3 Interface`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </section>

            <section className="mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                  <img
                    src={project.images.outline}
                    alt={`${project.title} Content Outline Generator`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                  <img
                    src={project.images.outline2}
                    alt={`${project.title} Advanced Outline Features`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• Feature 4</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  {project.showcaseSlides[4]?.title.split(' Generation')[0] || 'Strategic Content'}
                </h2>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  Plan your strategy with AI-generated {project.showcaseSlides[4]?.title.toLowerCase() || 'content outlines'} that maximize impact and engagement.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
                <img
                  src={project.images.outlineMain}
                  alt={`${project.title} Advanced Script Features`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• Analytics</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  Data-driven insights
                </h2>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  Analyze performance and trends with AI-driven insights to optimize your strategy and drive growth.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
                <img
                  src={project.images.similarChannel}
                  alt={`${project.title} Analytics Dashboard`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="text-[var(--text-muted)] font-semibold mb-2">• What's next?</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--text-main)]">
                  Ready to start?
                </h2>
              </div>
              <div className="flex justify-start lg:justify-end items-center w-full">
                <a
                  href="#"
                  className="bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors duration-300 w-full sm:w-auto justify-center"
                >
                  Start with {project.platform}
                  <ArrowIcon />
                </a>
              </div>
            </section>

            <ProjectShowcaseSlider showcaseSlides={project.showcaseSlides} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}