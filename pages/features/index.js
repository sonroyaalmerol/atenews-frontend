import WP from 'utils/wordpress';

import ArchiveLayout from 'components/ArchiveLayout';

export default function Page(props) {

  return (
    <ArchiveLayout {...props} name="Features" />
  )
}

export async function getStaticProps(ctx) {
  try {
    const [articles] = await Promise.all([
      WP.posts().categories(4)
    ]);
    console.log('success');
    return { props: { articles }, revalidate: 10 };
  } catch (err) {
    console.log('failed');
    return { props: { articles: [] }, revalidate: 10 };
  }
}
