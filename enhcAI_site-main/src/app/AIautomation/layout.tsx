import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'AI Automation & Intelligent Workflows',
  description:
    'Streamline operations with intelligent automation. enhc designs AI workflows that cut manual work, reduce errors and scale your processes across the business.',
  path: '/AIautomation',
  keywords: ['AI automation', 'AI workflows', 'business process automation', 'intelligent automation', 'workflow automation'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
