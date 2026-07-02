"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { blogData, BlogData } from '@/data/blogData';

// Global styles for theming
const globalStyles = `
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
    --progress-color: #10b981;
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
    --progress-color: #10b981;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .bg-custom-image {
    background-color: var(--bg-card-secondary);
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

// --- SVG Icon Components ---

const ContentIcon = ({ path }: { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Reusable UI Components ---

const ShareButton = ({ bgColor, children }: { bgColor: string, children: React.ReactNode }) => (
    <a href="#" className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} hover:opacity-80 transition-opacity`}>
        {children}
    </a>
);

// --- Main Dynamic Blog Component ---

const DynamicBlogPage: React.FC = () => {
    const params = useParams();
    const blogId = parseInt(params.id as string);
    
    const currentBlog: BlogData | undefined = blogData[blogId];

    // State to track scroll progress as a percentage
    const [scrollProgress, setScrollProgress] = useState(0);
    // State to track the currently active section
    const [activeSection, setActiveSection] = useState('intro');

    // Refs for the main scrollable article and each content section
    const articleRef = useRef<HTMLDivElement>(null);
    // Store DOM elements directly in the ref's current object, not ref objects themselves.
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

 const generateAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

    // Function to calculate scroll progress and active section
    const updateScrollState = () => {
        const articleElement = articleRef.current;
        if (!articleElement || !currentBlog) return;

        // Progress + active section are both measured against a "reading line" partway
        // down the viewport. The bar reaches 100% only when the LAST line of the article
        // reaches that line — not when the article's bottom first peeks in at the bottom
        // of the screen (which made the bar jump to full while a whole screen was unread).
        const viewportHeight = window.innerHeight;
        const readingLine = viewportHeight * 0.4;
        const rect = articleElement.getBoundingClientRect();
        const totalScrollableHeight = rect.height - readingLine;
        if (totalScrollableHeight > 0) {
            const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollableHeight);
            setScrollProgress((scrolled / totalScrollableHeight) * 100);
        } else {
            setScrollProgress(rect.bottom <= readingLine ? 100 : 0);
        }

        // Determine active section by which heading has crossed the reading line.
        let currentSection = 'intro';

        const introEl = sectionRefs.current['intro'];
        if (introEl && introEl.getBoundingClientRect().top <= readingLine) {
            currentSection = 'intro';
        }
        
        for (const section of currentBlog.sections) {
            const sectionEl = sectionRefs.current[section.id];
            if (sectionEl && sectionEl.getBoundingClientRect().top <= readingLine) {
                currentSection = section.id;
            }
        }
        setActiveSection(currentSection);
    };

    // Effect to handle scroll events for progress bar and active section
    useEffect(() => {
        updateScrollState();

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { updateScrollState(); ticking = false; });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [currentBlog]);

    // If blog not found, show 404
    if (!currentBlog) {
        return (
            <div className="bg-[var(--bg-main)] min-h-screen text-[var(--text-main)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
                    <p className="text-[var(--text-muted)] mb-8">The blog post you're looking for doesn't exist.</p>
                    <a href="/blogs" className="bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--brand-primary-hover)] transition-colors">
                        Back to Blogs
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-main)] min-h-screen text-[var(--text-main)]">
            <style jsx global>{globalStyles}</style>
            <style jsx global>{`
                
                body, nav, span, button, h1, h2, h3, h4, p, a, div {
                    font-family: 'Product Sans', sans-serif !important;
                }
                .product-sans {
                    font-family: 'Product Sans', sans-serif;
                }
            `}</style>

            <Navbar />
            
            {/* Hero Section */}
            <header className="bg-[var(--bg-main)] flex flex-col md:flex-row md:h-screen md:max-h-[900px] pt-20 md:pt-22">
                <div className="bg-[var(--bg-main)] text-[var(--text-main)] w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col justify-center p-6 sm:p-8 md:p-8 lg:p-12 xl:p-16 order-2 md:order-1">
                    <div>
                        <p className="text-sm text-[var(--text-muted)] tracking-wider">
                            <span className="text-lg leading-none mr-1">•</span> {currentBlog.readTime}
                        </p>
                    </div>
                    <div className="my-10 md:my-8 -translate-x-1 sm:-translate-x-3 md:translate-x-0">
                        <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight text-[var(--text-main)] break-words hyphens-auto">
                            {currentBlog.title} <br />
                            <span className="block">{currentBlog.subtitle}</span>
                        </h1>
                    </div>
                    <div className="mb-6 md:mb-0"></div>
                    <div className="flex items-center">
                        <div className={`w-14 h-14 rounded-full ${generateAvatarColor(currentBlog.author.name)} flex items-center justify-center text-white text-sm font-bold border-2 border-[var(--border-main)]`}>
                            {currentBlog.author.initials}
                        </div>
                        <div className="ml-4">
                            <p className="text-xs text-[var(--text-muted)]">written by</p>
                            <h4 className="font-bold text-lg text-[var(--text-main)]">{currentBlog.author.name}</h4>
                            <p className="text-sm text-[var(--text-muted)]">{currentBlog.author.role}</p>
                        </div>
                    </div>
                </div>
                <div 
                    className="w-full h-64 sm:h-80 md:h-full md:w-1/2 lg:w-3/5 xl:w-2/3 bg-cover bg-center order-1 md:order-2"
                    style={{ 
                        backgroundImage: `url('${currentBlog.heroImage}')`,
                        backgroundColor: 'var(--bg-card-secondary)'
                    }}
                ></div>
            </header>

            {/* Main Content Layout (Sidebar + Article) */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 px-4 sm:px-8 lg:px-16">
                
                {/* Left Column: Sticky Table of Contents */}
                <aside className="lg:col-span-4 xl:col-span-3">
                    <div className="lg:sticky lg:top-28">
                        <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border-main)]">
                            <h3 className="font-bold text-[var(--text-main)] mb-4">Contents</h3>
                            <ul>
                                {/* Add an entry for the Introduction */}
                                <li key="intro" className="flex items-center mb-3">
                                    <div className={`w-1 h-full mr-2 transition-all duration-300 ${activeSection === 'intro' ? 'bg-[var(--progress-color)]' : 'bg-transparent'}`}></div>
                                    <a href={`#intro`} className={`flex items-center transition-colors duration-200 ${activeSection === 'intro' ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                                        <ContentIcon path="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <span>Introduction</span>
                                    </a>
                                </li>
                                {currentBlog.sections.map(section => (
                                    <li key={section.id} className="flex items-center mb-3">
                                        <div className={`w-1 h-full mr-2 transition-all duration-300 ${activeSection === section.id ? 'bg-[var(--progress-color)]' : 'bg-transparent'}`}></div>
                                        <a href={`#${section.id}`} className={`flex items-center transition-colors duration-200 ${activeSection === section.id ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                                            <ContentIcon path={section.iconPath} />
                                            <span>{section.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="font-bold text-[var(--text-main)] mt-4">Difficulty: Beginner</p>
                            <hr className="border-[var(--border-main)] my-4" />
                            <div className="flex items-center text-[var(--text-muted)] text-sm mb-4">
                                <ClockIcon />
                                <span>{currentBlog.readTime}</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-[var(--bg-card-secondary)] rounded-full h-1.5">
                                <div 
                                    className="bg-[var(--progress-color)] h-1.5 rounded-full transition-all duration-150" 
                                    style={{ width: `${scrollProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </aside>
                
                {/* Right Column: Scrollable Main Article */}
                <div 
                    ref={articleRef} 
                    className="lg:col-span-8 xl:col-span-9"
                >
                    <article>
                         {/* Use a callback ref to assign the DOM node to sectionRefs */}
                        <div ref={(el) => { sectionRefs.current['intro'] = el; }} id="intro">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                                <div className="bg-[var(--bg-card-secondary)] text-[var(--text-muted)] text-sm py-1.5 px-4 rounded-full mb-4 sm:mb-0">
                                    {currentBlog.publishDate}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-[var(--text-muted)] text-sm">Share</span>
                                    <div className="flex items-center space-x-2">
                                        <ShareButton bgColor="bg-[#0077B5]"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg></ShareButton>
                                        <ShareButton bgColor="bg-black"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg></ShareButton>
                                        <ShareButton bgColor="bg-[#1877F2]"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></ShareButton>
                                        <ShareButton bgColor="bg-[#36c17b]"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg></ShareButton>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Introduction */}
                            <div className="text-lg leading-relaxed space-y-6 text-[var(--text-main)]">
                                {currentBlog.introduction.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Sections */}
                        {currentBlog.sections.map((section, sectionIndex) => (
                            // Use a callback ref for each dynamic section
                            <div key={section.id} ref={(el) => { sectionRefs.current[section.id] = el; }} id={section.id} className="mt-16 pt-8 space-y-6 text-lg leading-relaxed">
                                <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4 flex items-center">
                                    <ContentIcon path={section.iconPath} /> {section.title}
                                </h2>
                                
                                {/* Paragraphs */}
                                {section.content.paragraphs.map((paragraph, index) => (
                                    <p key={index} className="text-[var(--text-main)]">{paragraph}</p>
                                ))}

                                {/* Lists */}
                                {section.content.lists && section.content.lists.map((list, listIndex) => (
                                    <div key={listIndex}>
                                        {list.title && <h3 className="text-2xl font-bold text-[var(--text-main)] mt-4">{list.title}</h3>}
                                        <ul className="list-disc list-inside space-y-2 pl-4 text-[var(--text-main)]">
                                            {list.items.map((item, itemIndex) => {
                                                const [boldPart, ...rest] = item.split(':');
                                                return (
                                                    <li key={itemIndex}>
                                                        {rest.length > 0 ? (
                                                            <><strong className='font-semibold'>{boldPart}:</strong>{rest.join(':')}</>
                                                        ) : (
                                                            item
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}

                                {/* Subsections */}
                                {section.content.subsections && section.content.subsections.map((subsection, subIndex) => (
                                    <div key={subIndex}>
                                        <h3 className="text-2xl font-bold text-[var(--text-main)] mt-4">{subsection.title}</h3>
                                        {subsection.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-[var(--text-main)]">{paragraph}</p>
                                        ))}
                                    </div>
                                ))}

                                {/* Images */}
                                {section.content.images && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.content.images.map((image, imageIndex) => (
                                            <img 
                                                key={imageIndex}
                                                src={image.src} 
                                                alt={image.alt} 
                                                className="rounded-lg object-cover w-full h-[500px]"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                    </article>
                </div>
            </main>

            {/* Related Blog Section */}
            <section className="bg-[var(--bg-main)] text-[var(--text-main)] w-full py-20 lg:py-28 product-sans">
                <div className="max-w-[90rem] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
                        <div>
                            <p className="font-semibold tracking-wider text-[var(--text-muted)] product-sans">• Related Posts</p>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semi mt-4 leading-tight product-sans text-[var(--text-main)]">
                                Continue Reading
                            </h2>
                            <button className="mt-8 bg-[#0d2640] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-white hover:text-[#0d2640] transition-colors duration-300 product-sans">
                            View all posts <ArrowUpRight size={20} />
                            </button>

                        </div>
                        <div className="flex gap-4 mt-12 lg:mt-0">
                            <button className="blog-swiper-prev p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--bg-card)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                                <ArrowLeft size={24} />
                            </button>
                            <button className="blog-swiper-next p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--bg-card)] transition-colors text-[var(--text-main)] disabled:opacity-50">
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-8 overflow-hidden">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={1.1}
                            navigation={{ prevEl: '.blog-swiper-prev', nextEl: '.blog-swiper-next' }}
                            breakpoints={{
                                640: { slidesPerView: 1.5, spaceBetween: 20 },
                                768: { slidesPerView: 2.2, spaceBetween: 30 },
                                1024: { slidesPerView: 2.5, spaceBetween: 40 },
                            }}
                            className="!overflow-visible"
                        >
                            {currentBlog.relatedPosts.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <div className="flex flex-col text-left">
                                        <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-2xl" />
                                        <div className="mt-4">
                                            <p className="text-sm text-[var(--text-muted)] product-sans">• {post.readTime}</p>
                                            <h3 className="text-xl font-bold mt-2 hover:text-[#C5F277] transition-colors cursor-pointer product-sans text-[var(--text-main)]">{post.title}</h3>
                                            <p className="text-[var(--text-muted)] mt-2 text-sm leading-relaxed product-sans">{post.description}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default DynamicBlogPage;