import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'AI Services — Tools, Automation, ML, Web & App Development',
  description:
    'Explore enhc\'s AI services: custom AI tools, AI automation and workflows, machine learning models, predictive analytics, AI strategy, plus web and app development for forward-thinking businesses.',
  path: '/services',
  keywords: ['AI services', 'AI consulting', 'AI development company', 'machine learning services', 'AI automation services'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
