import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  title: 'Custom AI Software Development Company | enhc',
  description:
    'Bespoke AI systems built for your business. enhc designs custom AI models, NLP, computer vision and AI integration — from data strategy to deployment and scaling, with global delivery from our Ahmedabad, India HQ.',
  path: '/customeAIsolution',
  keywords: ['custom AI solutions', 'bespoke AI development', 'AI integration', 'NLP', 'computer vision', 'custom AI software company'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Custom AI Development',
            name: 'Custom AI Solutions',
            path: '/customeAIsolution',
            description:
              'Bespoke AI software — custom models, NLP, computer vision and LLM integration — designed, built and deployed by enhc for your business.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Custom AI Solutions', path: '/customeAIsolution' },
          ]),
          faqJsonLd(SERVICE_FAQS['customeAIsolution'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
