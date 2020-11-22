import React from 'react';

import WP from '@/utils/wordpress';

import ArchiveLayout from '@/components/ArchiveLayout';

export default function Page(props) {
  return (
    <ArchiveLayout {...props} name="National News" />
  );
}

export async function getStaticProps() {
  try {
    const [articlesRaw] = await Promise.all([
      WP.posts().categories(19),
    ]);
    return {
      props: {
        articlesRaw,
        category: 19,
        // eslint-disable-next-line no-underscore-dangle
        totalPages: articlesRaw._paging ? articlesRaw._paging.totalPages : 0,
      },
      revalidate: 1,
    };
  } catch (err) {
    return { props: { articlesRaw: [], category: 19, totalPages: 0 }, revalidate: 1 };
  }
}
