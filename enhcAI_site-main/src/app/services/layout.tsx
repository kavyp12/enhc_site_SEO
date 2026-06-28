import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Services — AI, Automation, Software, Web, Mobile & Cloud',
  description:
    'enhc is an AI-first IT solutions company. Explore our full range of services: custom AI software, AI agents and chatbots, automation, machine learning, predictive analytics, web and mobile apps, ERP, CRM, SaaS, cloud and IT consulting.',
  path: '/services',
  keywords: ['AI software development', 'IT solutions company', 'custom software development', 'AI automation services', 'ERP development', 'CRM development', 'SaaS development', 'web and app development', 'AI consulting'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
