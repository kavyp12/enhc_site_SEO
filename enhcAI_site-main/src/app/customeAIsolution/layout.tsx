import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Custom AI Solutions Development',
  description:
    'Bespoke AI systems built for your business. enhc designs custom AI models, NLP, computer vision and AI integration — from data strategy to deployment and scaling.',
  path: '/customeAIsolution',
  keywords: ['custom AI solutions', 'bespoke AI development', 'AI integration', 'NLP', 'computer vision'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
