import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Contact enhc — AI Studio in Ahmedabad',
  description:
    'Get in touch with enhc. Visit our Ahmedabad studio at Shivalik Shilp, email contact@enhc.tech or call +91 9313153036 to discuss your AI, web or app project.',
  path: '/contact',
  keywords: ['contact enhc', 'AI company contact', 'Ahmedabad AI studio'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
