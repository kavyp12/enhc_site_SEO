import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'App Development Company in Ahmedabad, India',
  description:
    'enhc designs and builds fast, intuitive mobile apps for iOS and Android. Native and cross-platform development with React Native, Flutter, Swift and Kotlin.',
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
        ]}
      />
      {children}
    </>
  );
}
