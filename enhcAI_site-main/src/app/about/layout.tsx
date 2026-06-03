import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'About enhc — AI Company in Ahmedabad',
  description:
    'Meet enhc (Enhc Tech LLP), an AI solutions company founded in Ahmedabad in 2022. Learn about our team, mission and approach to building AI that transforms businesses.',
  path: '/about',
  keywords: ['about enhc', 'AI company Ahmedabad', 'Enhc Tech LLP', 'AI team'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
