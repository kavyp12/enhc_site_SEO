"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation"; // ✅ Import router

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  }
`;

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const services = [
  { title: "ML Models", description: "Custom machine learning models to uncover insights and automate complex processes.", image: "/machine_learning.jpg" },
  { title: "Vision AI", description: "State-of-the-art computer vision for image recognition, object detection, and video analysis.", image: "/vision_AI.jpg" },
  { title: "Automation", description: "AI-powered workflow and business process automation that eliminates repetitive manual work.", image: "/journy.jpg" },
  { title: "Website", description: "Custom websites and web applications, from landing pages to full-scale platforms, designed to convert.", image: "/digital.jpg" },
  { title: "ERP", description: "Enterprise resource planning and CRM systems that streamline operations across your organization.", image: "/office_image.jpg" },
  { title: "Industries", description: "Tailored solutions built for the unique workflows and challenges of your industry.", image: "/still-life-supply-chain-representation.jpg" }
];

const ServiceItem = ({
  title,
  description,
  image,
  isHovered,
  onTouch,
  isAnyHovered
}: {
  title: string,
  description: string,
  image: string,
  isHovered: boolean,
  onTouch: () => void,
  isAnyHovered: boolean
}) => (
  <div
    className="relative border-b border-[var(--border-main)] py-6 md:py-8 overflow-hidden cursor-pointer"
    onMouseEnter={onTouch}
    onMouseLeave={() => {}}
    onTouchStart={onTouch}
    onClick={onTouch}
  >
    <div className="flex items-center">
      <h3
        className={`text-4xl md:text-8xl font-medium leading-tight transition-all duration-500 ease-out product-sans ${isHovered ? 'md:translate-x-56 sm:translate-x-40 translate-x-32 text-[var(--text-main)]' : 'translate-x-0'} ${isAnyHovered && !isHovered ? 'text-[var(--text-muted)]' : 'text-[var(--text-main)]'}`}
      >
        {title}
      </h3>
    </div>

    {/* Mobile content */}
    <div className={`block md:hidden mt-4 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>
      <div className="w-full h-32 rounded-lg overflow-hidden shadow-2xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="mt-3 text-sm text-[var(--text-muted)] product-sans">{description}</p>
    </div>

    {/* Desktop image preview */}
    <div className={`hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="w-48 h-32 rounded-lg overflow-hidden shadow-2xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);

export default function Business() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const router = useRouter(); // ✅ Initialize router

  const handleServiceInteraction = (index: number) => {
    setHoveredService(hoveredService === index ? null : index);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <section className="bg-[var(--bg-secondary)] text-[var(--text-main)] min-h-screen px-4 sm:px-8 py-16 md:px-20 md:py-24 product-sans">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20 md:mb-32">
          <div className="flex items-center gap-2 text-sm product-sans">
            <span className="bg-[var(--text-main)] w-2 h-2 rounded-full"></span>Our Expertise
          </div>
          <div className="text-center md:col-span-1">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight product-sans">
              How we take your business to the next level
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <p className="max-w-xs mb-6 text-[var(--text-muted)] product-sans">
              We are an AI-first IT solutions company with deep expertise, on a mission to help you build, automate and scale your business with AI and modern software.
            </p>
            {/* ✅ Updated Button with router.push */}
            <button
              onClick={() => router.push("/services")}
              className="bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-[var(--brand-primary-hover)] transition-colors product-sans"
            >
              See all services <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="max-w-7xl mx-auto md:ml-auto md:pl-70">
          {services.map((service, index) => (
            <ServiceItem
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
              isHovered={hoveredService === index}
              isAnyHovered={hoveredService !== null}
              onTouch={() => handleServiceInteraction(index)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
