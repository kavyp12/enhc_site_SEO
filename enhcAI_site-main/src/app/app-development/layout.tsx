import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  title: 'App & Mobile Development Company — iOS, Android & Cross-Platform',
  description:
    'enhc designs and builds fast, intuitive mobile apps for iOS and Android for clients worldwide. Native and cross-platform development with React Native, Flutter, Swift and Kotlin, delivered globally from our Ahmedabad, India HQ.',
  path: '/app-development',
  keywords: ['app development company', 'mobile app development Ahmedabad', 'iOS app development', 'Android app development', 'React Native development', 'Flutter development'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Mobile App Development',
            name: 'App Development',
            path: '/app-development',
            description:
              'Native and cross-platform mobile apps for iOS and Android, from UI/UX design through development to App Store and Play Store launch.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'App Development', path: '/app-development' },
          ]),
          faqJsonLd(SERVICE_FAQS['app-development'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
