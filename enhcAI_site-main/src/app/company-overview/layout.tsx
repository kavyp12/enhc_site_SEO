import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Company Overview',
  description:
    'A closer look at enhc (Enhc Tech LLP): who we are, what we build and how our AI, web and app development work helps businesses grow.',
  path: '/company-overview',
  keywords: ['company overview', 'Enhc Tech LLP', 'AI company profile'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
