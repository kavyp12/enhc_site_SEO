import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Start a Project',
  description:
    'Ready to build with AI? Tell enhc about your idea and our team will help you scope, design and ship your AI, web or app development project.',
  path: '/startproject',
  keywords: ['start AI project', 'hire AI developers', 'AI project enquiry'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
