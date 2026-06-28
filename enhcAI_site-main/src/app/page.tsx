import Navbar from '@/app/components/navbar';
import Hero from '@/app/components/hero';
import Projects from '@/app/components/projects';
import Business from '@/app/components/business';
import Footer from '@/app/components/footer';
import Aboutus from '@/app/components/aboutus';
import Blog from '@/app/components/blog';
import Workwith from '@/app/components/workwith';
import Testimonial from '@/app/components/testimonial';
// import Team from '@/app/components/team';
import Award from '@/app/components/award';
import Reveal from '@/app/components/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI-First IT Solutions, Software & Automation Company in Ahmedabad',
  description:
    'enhc is an AI-first IT solutions company in Ahmedabad, India, founded in 2022. We help businesses build, automate, transform and scale with custom AI software, AI agents and automation, machine learning, web and mobile apps, ERP, CRM, SaaS and cloud solutions.',
  path: '/',
  keywords: [
    'IT solutions company Ahmedabad',
    'AI software development India',
    'AI automation',
    'custom software development',
    'machine learning company',
    'web development Ahmedabad',
    'app development Ahmedabad',
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
      <Reveal><Workwith/></Reveal>
      <Reveal><Blog /></Reveal>
      {/* <Testimonial /> */}
      {/* <Award /> */}
      <Footer />
    </>
  );
}