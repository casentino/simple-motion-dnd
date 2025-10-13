/** @type {import('next').NextConfig} */
import nextra from 'nextra';
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
    ];
  },
};

const withNextra = nextra({
  search: false,
});

export default withNextra(nextConfig);
