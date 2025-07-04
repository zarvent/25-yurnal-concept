import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirecciones de patient a estudiantes
      {
        source: '/patient',
        destination: '/estudiantes/dashboard',
        permanent: true,
      },
      {
        source: '/patient/:path*',
        destination: '/estudiantes/:path*',
        permanent: true,
      },
      // Redirecciones de academic a estudiantes
      {
        source: '/academic',
        destination: '/estudiantes/dashboard',
        permanent: true,
      },
      {
        source: '/academic/dashboard',
        destination: '/estudiantes/dashboard',
        permanent: true,
      },
      {
        source: '/academic/articles',
        destination: '/estudiantes/articles',
        permanent: true,
      },
      {
        source: '/academic/library',
        destination: '/estudiantes/library',
        permanent: true,
      },
      {
        source: '/academic/courses',
        destination: '/estudiantes/courses',
        permanent: true,
      },
      {
        source: '/academic/my-journal',
        destination: '/estudiantes/my-journal',
        permanent: true,
      },
      {
        source: '/academic/:path*',
        destination: '/estudiantes/:path*',
        permanent: true,
      },
      // Redirección de landing antigua a nueva
      {
        source: '/para-estudiantes',
        destination: '/estudiantes',
        permanent: true,
      },
      {
        source: '/para-estudiantes/:path*',
        destination: '/estudiantes/:path*',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeHighlight],
  },
});

export default withMDX(nextConfig);
