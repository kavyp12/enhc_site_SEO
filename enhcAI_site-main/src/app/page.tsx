import Navbar from '@/app/components/navbar';
import Hero from '@/app/components/hero';
import Projects from '@/app/components/projects';
import Business from '@/app/components/business';
import Footer from '@/app/components/footer';
import Aboutus from '@/app/components/aboutus';
import GlobalReach from '@/app/components/GlobalReach';
import Blog from '@/app/components/blog';
import Workwith from '@/app/components/workwith';
import Testimonial from '@/app/components/testimonial';
// import Team from '@/app/components/team';
import Award from '@/app/components/award';
import Reveal from '@/app/components/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  // Brand leads the homepage <title>: "enhc" is ~40% of all impressions (GSC
  // 3-mo) yet ranks only ~pos 5 for its own name — reinforcing the brand term.
  // (This is the ROOT segment, so the '%s | enhc' template does NOT apply here.)
  title: 'enhc — AI Development Partner for US, Europe & Middle East',
  description:
    'enhc is an AI development partner for the US, Europe & Middle East — custom AI software, automation, machine learning and web & mobile apps, with senior-engineer quality and timezone-aligned delivery from Ahmedabad, India.',
  path: '/',
  keywords: [
    'AI development company',
    'AI development partner',
    'offshore AI development company',
    'custom AI software development',
    'AI automation company',
    'machine learning development company',
    'hire AI developers',
    'AI software development India',
    'AI development company Ahmedabad',
    'web and app development',
    'ERP CRM SaaS development',
  ],
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Reveal><Projects /></Reveal>
      <Reveal><Business /></Reveal>
      <Reveal><Aboutus /></Reveal>
      {/* <Team/> */}
      {/* Server-rendered internal links to the region + ML pages (de-orphans them). */}
      <GlobalReach />
      <Reveal><Workwith/></Reveal>
      <Reveal><Blog /></Reveal>
      {/* <Testimonial /> */}
      {/* <Award /> */}
      <Footer />
    </>
  );
}