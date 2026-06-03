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
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Solutions, Automation & Software Development Company in Ahmedabad',
  description:
    'enhc is an AI solutions company in Ahmedabad, India, founded in 2022. We build custom AI tools, AI automation and workflows, machine learning models, predictive analytics, web development and app development that transform businesses.',
  path: '/',
  keywords: [
    'AI company Ahmedabad',
    'AI solutions India',
    'AI automation',
    'AI workflows',
    'machine learning company',
    'web development Ahmedabad',
    'app development Ahmedabad',
  ],
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Business />
      <Aboutus />
      {/* <Team/> */}
      <Workwith/>
      <Blog />
      {/* <Testimonial /> */}
      {/* <Award /> */}
      <Footer />
    </>
  );
}