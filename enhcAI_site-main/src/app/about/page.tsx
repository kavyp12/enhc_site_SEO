// aboutpage.tsx
"use client";
import React from 'react';
import Navbar from '@/app/components/navbar';
import Team from '@/app/components/team';
import Workwith from '@/app/components/workwith';
import Testimonial from '@/app/components/testimonial';
import Blog from '@/app/components/blog';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/Reveal';
import Link from 'next/link';

export default function AboutPage() {
  // Horizontal moving strip of photos — glides left → right with a gap between
  // each card. The array is duplicated in the markup so the loop is seamless.
  const stripImages = [
    { src: "/office_image.jpg", alt: "The enhcAI team at work", tilt: -3 },
    { src: "/digital.jpg", alt: "Collaborating on an AI project", tilt: 2 },
    { src: "/machine_learning.jpg", alt: "Machine learning in practice", tilt: -2 },
    { src: "/neural_network.jpg", alt: "AI neural network visualization", tilt: 3 },
    { src: "/computer_vision.jpg", alt: "Computer vision in action", tilt: -2 },
    { src: "/Data_analysis.jpg", alt: "Data analysis in progress", tilt: 2 },
    { src: "/vision_AI.jpg", alt: "Vision AI system", tilt: -3 },
    { src: "/journy2.jpg", alt: "The road ahead", tilt: 2 },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden">
      <Navbar />

      <main className="flex flex-col justify-center items-center px-4 py-12 md:px-8 text-center font-sans pt-24 sm:pt-32">
        <div className="flex items-center justify-center space-x-2 text-sm mb-5">
          <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
          <span className="text-[var(--text-muted)]">Pioneering Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-0 tracking-tight max-w-3xl">
          We build the future, one algorithm at a time.
        </h1>

        <div className="photo-marquee w-screen mt-10 mb-10 py-8 overflow-hidden">
          <div className="photo-marquee-track flex w-max">
            {[...stripImages, ...stripImages].map((img, index) => (
              <div
                key={index}
                className="photo-marquee-card"
                style={{ "--tilt": `${img.tilt}deg` } as React.CSSProperties}
                aria-hidden={index >= stripImages.length ? true : undefined}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <Link href="/project">
      <button className="group bg-[var(--brand-primary)] text-white border-none rounded-full px-5 py-2 text-sm font-bold cursor-pointer inline-flex items-center gap-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[var(--brand-primary)]/30 mt-4 mb-8">
        <span>Explore our work</span>
        <span className="bg-white rounded-full w-7 h-7 flex justify-center items-center text-[var(--brand-primary)] transition-transform duration-300 group-hover:translate-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="18">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </Link>

        {/* About Us Section */}
        <Reveal as="section" className="bg-[var(--bg-main)] text-[var(--text-main)] py-16 px-4 sm:px-6 lg:px-20 w-full">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm">
                <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                <span className="text-[var(--text-muted)]">Pioneering Intelligence</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-normal leading-tight tracking-tight">
                We are enhcAI, a dedicated team turning the most complex data into intelligent, actionable solutions for your business.
              </h2>
            </div>
            <div className="flex-1 space-y-6 text-[var(--text-muted)] text-base lg:text-lg leading-relaxed text-center lg:text-left">
              <p>
                Founded in 2022, enhcAI is at the forefront of the artificial intelligence revolution. We specialize in creating bespoke AI solutions in{' '}
                <span className="underline">Machine Learning</span>,{' '}
                <span className="underline">Deep Learning</span>,{' '}
                <span className="underline">Computer Vision</span>, and{' '}
                <span className="underline">Natural Language Processing (NLP)</span>.
              </p>
              <p>
                Our technology stack is built on powerful, scalable frameworks like{' '}
                <span className="underline">TensorFlow</span> and{' '}
                <span className="underline">PyTorch</span>, enabling us to engineer robust AI models that integrate seamlessly and drive tangible results for your business.
              </p>
              <p>
                If you're ready to unlock the power of your data and partner with a team dedicated to innovation,{' '}
                <span className="underline">get in touch</span> with us today.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal><Team /></Reveal>
        <Reveal className="w-full bg-[var(--bg-secondary)] mt-12">
          <Workwith />
        </Reveal>
        <Reveal><Testimonial /></Reveal>
        <Reveal><Blog /></Reveal>
      </main>
        <Footer />

      <style jsx>{`
        body, html { overflow-x: hidden; }
        h1, button, span, p, div { font-family: 'Product Sans', sans-serif; }

        /* Moving photo strip — glides left → right in a seamless loop.
           Speed lives in --speed (lower = faster); gap between cards in --gap. */
        .photo-marquee {
          --gap: clamp(16px, 2.5vw, 40px);
          --speed: 18s;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 6%,
            #000 94%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 6%,
            #000 94%,
            transparent
          );
        }
        .photo-marquee-track {
          animation: photo-marquee-move var(--speed) linear infinite;
          will-change: transform;
        }
        /* -50% = exactly one full (duplicated) set incl. its trailing gap,
           so the jump back is invisible. from -50% → 0 moves cards rightward. */
        @keyframes photo-marquee-move {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .photo-marquee:hover .photo-marquee-track {
          animation-play-state: paused;
        }
        .photo-marquee-card {
          flex: 0 0 auto;
          width: clamp(190px, 22vw, 290px);
          aspect-ratio: 3 / 4;
          margin-right: var(--gap);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 22px 45px -20px rgba(0, 0, 0, 0.45);
          transform: rotate(var(--tilt));
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        @media (min-width: 640px) {
          .photo-marquee-card { border-radius: 1.5rem; }
        }
        .photo-marquee-card:hover {
          transform: rotate(0deg) scale(1.04);
          box-shadow: 0 32px 60px -22px rgba(0, 0, 0, 0.55);
        }
        @media (prefers-reduced-motion: reduce) {
          .photo-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}