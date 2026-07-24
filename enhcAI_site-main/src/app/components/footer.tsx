"use client";
import React from "react";

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: var(--font-poppins), sans-serif;
  }
`;

// Icons
const IconLinkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconGithub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5
      .28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5
      2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5
      6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15
      1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8
      4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const socialLinks = [
    {
      icon: IconGithub,
      href: "https://github.com/kavyp12",
      "aria-label": "GitHub",
    },
    {
      icon: IconInstagram,
      href: "https://www.instagram.com/enhancemodel.ai",
      "aria-label": "Instagram",
    },
    {
      icon: IconLinkedin,
      href: "https://www.linkedin.com/company/enhctech/",
      "aria-label": "LinkedIn",
    },
  ];

  const footerLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Blogs", href: "/blogs" },
    { text: "Services", href: "/services" },
    { text: "Custom AI Solutions", href: "/custom-ai-solutions" },
    { text: "Machine Learning", href: "/machinelearningmodel" },
    { text: "AI Automation", href: "/AIautomation" },
    { text: "Predictive Analytics", href: "/predictiveAnalytics" },
    { text: "AI Strategy & Consulting", href: "/ai-strategy" },
    { text: "Industries", href: "/industries" },
    { text: "Web Development", href: "/web-development" },
    { text: "App Development", href: "/app-development" },
    { text: "Projects", href: "/project" },
    { text: "Contact", href: "/contact" },
    { text: "Book a Call", href: "/book" },
    { text: "Start Project", href: "/startproject" },
  ];

  const regionLinks = [
    { text: "United States", href: "/us" },
    { text: "Europe & UK", href: "/europe" },
    { text: "Middle East", href: "/middle-east" },
  ];

  const contactDetails = [
    { icon: "📞", text: "+91 9313153036", href: "tel:+919313153036" },
    { icon: "✉️", text: "contact@enhc.tech", href: "mailto:contact@enhc.tech" },
    { 
      icon: "📍", 
      text: "Enhc Tech LLP, Shivalik Shilp, Ahmedabad, Gujarat", 
      href: "https://www.google.com/maps?q=23.027206768268236,72.50625586930879", 
      target: "_blank" 
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <footer className="bg-[var(--bg-card-secondary)] text-[var(--text-main)] product-sans rounded-t-3xl">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">

          {/* Back to top */}
          <div className="text-center md:text-right pt-10">
            <a
              href="#"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors product-sans"
            >
              Back to top — Let’s innovate! 👋
            </a>
          </div>

          {/* Main grid */}
          <div className="py-16 lg:py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-8">

            {/* Social links */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-center sm:justify-start space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social["aria-label"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[var(--bg-card-secondary)] hover:bg-[var(--brand-primary)] text-[var(--text-main)] hover:text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center sm:text-left">
              <h2 className="text-4xl md:text-5xl font-semi tracking-tighter leading-tight product-sans">
                Do you like{' '}<br />what you see?
              </h2>
              <a
                href="/startproject"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full mt-6 hover:bg-white hover:text-black transition-colors product-sans"
              >
                Start a project<span className="text-lg">↗</span>
              </a>
            </div>

            {/* Footer links */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center sm:text-left">
              <h3 className="font-bold mb-4 product-sans">Pages</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-[var(--text-main)] transition-colors product-sans"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regions */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <h3 className="font-bold mb-4 product-sans">Regions</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                {regionLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-[var(--text-main)] transition-colors product-sans"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <h3 className="font-bold mb-4 product-sans">Get in touch</h3>
              <ul className="space-y-4 text-[var(--text-muted)]">
                {contactDetails.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-center sm:justify-start gap-3"
                  >
                    <span className="mt-1 font-bold text-base">{item.icon}</span>
                    <a
                      href={item.href}
                      target={item.target ? "_blank" : undefined}
                      className="hover:text-[var(--text-main)] transition-colors whitespace-pre-line product-sans"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Big tagline */}
          <div className="text-center py-16 lg:py-24">
            <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[180px] font-extrabold tracking-tighter text-[var(--text-main)] leading-none product-sans">
              Building Intelligence since 2022
            </p>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--border-main)] rounded-t-lg py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
              <span className="font-bold text-[var(--text-main)] product-sans">Enhc Tech LLP</span>
              <span className="product-sans">©2025 Enhc Tech LLP · All Rights Reserved</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
              <span className="product-sans">AI Solutions · Ahmedabad</span>
              <span className="hidden md:inline">|</span> <span className="product-sans">All Rights Reserved</span>
              <span className="hidden md:inline">|</span>
              <span className="product-sans">Privacy Policy</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
