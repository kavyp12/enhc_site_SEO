import { buildMetadata, SITE_URL, LEGAL_NAME } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'App Development Company',
  description:
    'enhc designs and builds fast, intuitive mobile apps for iOS and Android. Native and cross-platform development with React Native, Flutter, Swift and Kotlin.',
  path: '/app-development',
  keywords: ['app development company', 'mobile app development Ahmedabad', 'iOS app development', 'Android app development', 'React Native development', 'Flutter development'],
});

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Mobile App Development',
  name: 'App Development',
  url: `${SITE_URL}/app-development`,
  provider: { '@type': 'Organization', name: LEGAL_NAME, url: SITE_URL },
  areaServed: 'Worldwide',
  description:
    'Native and cross-platform mobile apps for iOS and Android, from UI/UX design through development to App Store and Play Store launch.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {children}
    </>
  );
}
