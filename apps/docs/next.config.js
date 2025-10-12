/** @type {import('next').NextConfig} */
import nextra from 'nextra';
const nextConfig = {};

const withNextra = nextra({
  contentDirBasePath: '/docs',
});

export default withNextra(nextConfig);
