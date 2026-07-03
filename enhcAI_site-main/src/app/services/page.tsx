"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface BlogPost {
  id: number;
  image: string;
  readTime: string;
  title: string;
  excerpt: string;
  slug: string;
}

// Latest posts from the enhc blog. `slug` maps to the real /blogs/<id> route.
const blogPosts: BlogPost[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop', readTime: '8 min read', title: 'Demystifying Neural Networks: A Beginner\'s Guide', excerpt: 'A clear, beginner-friendly introduction to how neural networks learn — perceptrons, layers, activation functions and training.', slug: '1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', readTime: '7 min read', title: 'Data Preprocessing: Transforming Data for ML', excerpt: 'Why clean, well-structured data is the foundation of every reliable machine learning model — and how we prepare it.', slug: '2' },
  { id: 3, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', readTime: '9 min read', title: 'Getting Started with Deep Learning in PyTorch', excerpt: 'A practical walkthrough of building and training your first deep learning model with PyTorch.', slug: '3' },
];

const ServicesPage = () => {
  const router = useRouter();



  // Full AI-first IT solutions catalogue, organised into logical categories.
  // Numbers are generated from the position within each category so the list
  // can grow or shrink without manual renumbering.
  const serviceCategories: { heading: string; description: string; items: string[] }[] = [
    {
      heading: "AI & ML",
      description:
        "AI engineers and data scientists in-house, building intelligent systems and models tailored to your business.",
      items: [
        "Custom AI Software Development",
        "AI Agents & Intelligent Assistants",
        "AI Chatbots for Support & Sales",
        "Generative AI Solutions",
        "Machine Learning Solutions",
        "Predictive Analytics",
      ],
    },
    {
      heading: "Automation",
      description:
        "Streamline operations end-to-end with AI that handles the repetitive work and frees up your team.",
      items: [
        "AI Workflow Automation",
        "AI Business Process Automation",
        "AI-Powered Business Management Software",
      ],
    },
    {
      heading: "Software",
      description:
        "From idea to launch, we design and engineer scalable software products across web, mobile and enterprise.",
      items: [
        "Custom Web Application Development",
        "Mobile App Development",
        "SaaS Product Development",
        "Enterprise Software Development",
        "ERP Development",
        "CRM Development",
      ],
    },
    {
      heading: "Web & Cloud",
      description:
        "A strong digital presence and the cloud foundations and integrations that keep it fast, secure and connected.",
      items: [
        "Business Web Presence (Websites & Landing Pages)",
        "UI/UX Design",
        "Cloud Solutions & Deployment",
        "API Development & Integration",
      ],
    },
    {
      heading: "Consulting",
      description:
        "Strategic guidance to help you adopt AI, modernise your stack and transform the way your business works.",
      items: [
        "AI Consulting & Digital Transformation",
        "IT Consulting",
        "Digital Transformation Services",
        "AI Training & Enterprise Workshops",
      ],
    },
  ];

  // Updated ServiceButton component - removed onClick functionality, kept hover effects
  const ServiceButton = ({ service }: { service: { number: string; name: string } }) => (
    <li className="border-b border-[var(--border-main)] py-4">
      <div className="w-full group transition-all duration-300 hover:bg-[var(--bg-card-secondary)]/30 hover:border-[var(--text-main)]/20 border border-transparent rounded-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-light text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-300">{service.number}</span>
            <span className="text-xl md:text-2xl font-medium group-hover:text-[var(--text-main)] transition-colors duration-300">{service.name}</span>
          </div>
          <ArrowIcon />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--text-main)]/40 to-transparent mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </li>
  );

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen px-6 sm:px-16 md:px-24 pt-28 sm:pt-24 font-sans">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center space-x-2 text-[var(--text-main)] text-base">
            <span className="text-lg">•</span>
            <span>Services</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div><h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight">We're an AI-first IT solutions company built to transform your business</h1></div>
          <div className="lg:justify-self-end lg:self-end lg:translate-y-38 mt-8 lg:mt-0">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-lg text-[var(--text-main)] leading-tight font-normal">From AI and automation to software, web, mobile and cloud — we help you build, automate, transform and scale.</p>
          </div>
        </div>

        <div className="w-full h-px bg-[var(--border-secondary)] mt-16 lg:mt-24 mb-12 lg:mb-16 lg:translate-y-40"></div>
        {serviceCategories.map((category, categoryIndex) => (
          <React.Fragment key={category.heading}>
            {categoryIndex > 0 && <div className="w-full h-px bg-[var(--border-secondary)] mt-24 mb-12 md:mb-16"></div>}
            <div className="pt-16 lg:pt-24">
              <h2 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold leading-none tracking-tighter">{category.heading}</h2>
              <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
                <div><p className="text-lg max-w-sm leading-relaxed font-medium">{category.description}</p></div>
                <div>
                  <ul>
                    {category.items.map((name, itemIndex) => (
                      <ServiceButton key={name} service={{ number: String(itemIndex + 1).padStart(2, "0"), name }} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
        <div className="w-full h-px bg-[var(--border-secondary)] mt-24 mb-12 md:mb-16"></div>

        <section className="pt-16 lg:pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div><h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mt-4 leading-tight text-left">Latest from our studio</h2></div>
              <div className="flex gap-8 mt-8 lg:mt-16">
                <button className="blog-swiper-prev p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--border-main)] transition-colors text-[var(--text-main)] disabled:opacity-50"><ArrowLeft size={24} /></button>
                <button className="blog-swiper-next p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--border-main)] transition-colors text-[var(--text-main)] disabled:opacity-50"><ArrowRight size={24} /></button>
              </div>
            </div>
            <div className="lg:col-span-8 overflow-hidden">
              <Swiper modules={[Navigation]} spaceBetween={30} slidesPerView={1.2} navigation={{ prevEl: '.blog-swiper-prev', nextEl: '.blog-swiper-next', }} breakpoints={{ 768: { slidesPerView: 1.5, spaceBetween: 30 }, 1024: { slidesPerView: 2.2, spaceBetween: 40 }, }} className="!overflow-visible">
                {blogPosts.map((post) => (
                  <SwiperSlide key={post.id}>
                    <Link href={`/blogs/${post.slug}`} className="rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300" style={{ height: '500px' }}>
                      <div className="relative overflow-hidden rounded-2xl mb-6">
                        <img src={post.image} alt={post.title} decoding="async" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }} />
                        <div className="absolute top-4 left-4 w-12 h-12 bg-[var(--brand-primary)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-4"><span className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></span><span>{post.readTime}</span></div>
                        <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-[var(--text-main)] transition-colors duration-300">{post.title}</h3>
                        <p className="text-[var(--text-muted)] text-base leading-relaxed flex-grow">{post.excerpt}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <style jsx>{`
          * { font-family: var(--font-poppins), sans-serif; }
        `}</style>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;