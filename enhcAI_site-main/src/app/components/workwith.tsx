"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: var(--font-poppins), sans-serif;
  }
`;

const LogoCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-gray-200 dark:bg-[var(--bg-card)] rounded-2xl h-36 flex items-center justify-center p-6 text-[var(--text-muted)] grayscale hover:grayscale-0 hover:text-[var(--text-main)] transition-all duration-300 ease-in-out cursor-pointer min-w-[200px] sm:min-w-[280px] flex-shrink-0 border border-gray-300 dark:border-transparent">
    {children}
  </div>
);

type Logo = { src: string; alt: string };

const LogoImage = ({ src, alt }: Logo) => (
  <LogoCard>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="max-h-20 max-w-[80%] w-auto object-contain"
    />
  </LogoCard>
);

// Logos live in /public/logos. Filenames with spaces are URL-encoded.
const logosRowOne: Logo[] = [
  { src: "/logos/Adani_wimar.jpg", alt: "Adani Wilmar" },
  { src: "/logos/Autotake%20AI.jpg", alt: "Autotake AI" },
  { src: "/logos/DDC.png", alt: "DDC" },
  { src: "/logos/FIRE.jpg", alt: "FIRE" },
  { src: "/logos/GIPL.png", alt: "GIPL" },
  { src: "/logos/LOGO_design.jpg", alt: "Logo Design" },
  { src: "/logos/VILLION.jpeg", alt: "Villion" },
  { src: "/logos/Vedcool_logo.jpg", alt: "Vedcool" },
  { src: "/logos/Yohan_logo.jpg", alt: "Yohan" },
];

const logosRowTwo: Logo[] = [
  { src: "/logos/adani%20uni.png", alt: "Adani University" },
  { src: "/logos/beardo%20logo.jpg", alt: "Beardo" },
  { src: "/logos/ev%20india.png", alt: "EV India" },
  { src: "/logos/gujrat%20police.png", alt: "Gujarat Police" },
  { src: "/logos/innovatiq.jpg", alt: "Innovatiq" },
  { src: "/logos/invest%20in%20lothal.png", alt: "Invest in Lothal" },
  { src: "/logos/kreato.png", alt: "Kreato" },
  { src: "/logos/rama_realty_main_logo.png", alt: "Rama Realty" },
];

const Workwith = () => {
  const router = useRouter(); // ✅ Initialize router

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="w-full bg-[var(--bg-main)] flex justify-center pt-20 sm:pt-24 p-4 sm:p-8 product-sans">
        <div className="bg-[var(--bg-card-secondary)] rounded-[2rem] p-6 sm:p-12 w-full max-w-7xl flex flex-col">
          <div className="flex flex-col w-full md:ml-130">
            <div className="flex items-center gap-2 text-sm text-left product-sans text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 bg-[var(--text-main)] rounded-full"></span>
              Our Clients
            </div>
            <h2 className="text-3xl sm:text-4xl font-semi text-[var(--text-main)] mt-2 max-w-5xl leading-tight text-left product-sans">
              We work with start-up businesses{' '}<br className="hidden sm:block" />
              through to global organisations.
            </h2>
            <div className="flex justify-start">
              {/* ✅ Updated Button with router.push */}
              <button
                onClick={() => router.push("/contact")}
                className="bg-[var(--brand-primary)] text-white font-semibold rounded-full px-6 py-3 sm:px-8 sm:py-4 mt-8 flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors duration-300 text-sm sm:text-base product-sans"
              >
                Get in touch today
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M5.02441 12.8724L9.94822 7.94859C10.2223 7.67453 10.2223 7.22155 9.94822 6.94749L5.02441 2.02368"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Logos Section */}
          <div className="mt-16 overflow-hidden">
            <div className="mb-6">
              <div className="flex animate-scroll-left gap-6">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {logosRowOne.map((logo) => (
                      <LogoImage key={logo.alt} src={logo.src} alt={logo.alt} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <div className="flex animate-scroll-right gap-6">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {logosRowTwo.map((logo) => (
                      <LogoImage key={logo.alt} src={logo.src} alt={logo.alt} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx global>{`
          @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-scroll-left { animation: scroll-left 20s linear infinite; }
          .animate-scroll-right { animation: scroll-right 20s linear infinite; }
          .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }

          @media (max-width: 640px) {
            .animate-scroll-left { animation: scroll-left 8s linear infinite; }
            .animate-scroll-right { animation: scroll-right 8s linear infinite; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Workwith;
