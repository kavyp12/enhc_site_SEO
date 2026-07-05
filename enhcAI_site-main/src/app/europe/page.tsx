import { buildMetadata } from '@/lib/seo';
import RegionLanding from '@/app/components/RegionLanding';
import { REGIONS } from '@/data/regions';

const region = REGIONS.europe;

export const metadata = buildMetadata({
  title: region.title,
  description: region.description,
  path: region.path,
  keywords: region.keywords,
});

export default function Page() {
  return <RegionLanding slug="europe" />;
}
