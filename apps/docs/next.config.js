/** @type {import('next').NextConfig} */
import nextra from 'nextra';
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
};

const withNextra = nextra({
  search: false,
});

export default withNextra(nextConfig);
