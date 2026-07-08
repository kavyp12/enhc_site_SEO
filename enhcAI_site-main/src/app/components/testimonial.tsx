"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight, Star } from 'lucide-react';

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: var(--font-poppins), sans-serif;
  }
`;

interface Testimonial {
  id: number; avatar: string; author: string; company: string; text: string; rating: number;
}

// Real client testimonials only. The previous entries were placeholder/fabricated
// content (randomuser.me stock avatars, invented names) — removed because passing
// fake reviews as real is a trust liability and violates Google's structured-data
// review policy. Populate this array with genuine, attributable client quotes
// (real name, real company, with permission) before re-enabling <Testimonial/>.
const testimonials: Testimonial[] = [];

const Testimonial: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <section className="bg-[var(--bg-main)] text-[var(--text-main)] w-full py-20 lg:py-28 product-sans">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
            <div>
              <p className="font-semibold tracking-wider text-[var(--text-muted)] text-left product-sans">• Testimonials</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 leading-tight text-left product-sans">
                Trusted by leading innovators
              </h2>
              <button className="mt-8 sm:mt-12 bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors duration-300 product-sans">
                View all stories
                <ArrowUpRight size={20} />
              </button>
            </div>
            <div className="flex gap-4 sm:gap-8 mt-12 lg:mt-16">
              <button className="testimonial-swiper-prev p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--border-main)] transition-colors text-[var(--text-main)] disabled:opacity-50"><ArrowLeft size={24} /></button>
              <button className="testimonial-swiper-next p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--border-main)] transition-colors text-[var(--text-main)] disabled:opacity-50"><ArrowRight size={24} /></button>
            </div>
          </div>
          <div className="lg:col-span-8 overflow-hidden">
            <Swiper modules={[Navigation]} spaceBetween={30} slidesPerView={1.1} navigation={{ prevEl: '.testimonial-swiper-prev', nextEl: '.testimonial-swiper-next' }} breakpoints={{ 640: { slidesPerView: 1.2 }, 768: { slidesPerView: 1.5, spaceBetween: 30 }, 1024: { slidesPerView: 2.2, spaceBetween: 40 } }} className="!overflow-visible">
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-auto">
                  <div className="bg-[var(--bg-card)] p-8 rounded-2xl h-full flex flex-col justify-between min-h-[380px] sm:min-h-[400px]">
                    <div>
                      <div className="flex justify-center text-[var(--brand-accent)]">
                        {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} fill="currentColor" strokeWidth={0} size={20} />))}
                      </div>
                      <p className="text-[var(--text-muted)] mt-6 text-base sm:text-lg leading-relaxed text-center product-sans">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                      <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-[var(--text-main)] product-sans">{testimonial.author}</h3>
                        <p className="text-[var(--text-muted)] product-sans">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;