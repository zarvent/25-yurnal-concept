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
      // === REDIRECCIONES LEGACY A NUEVA ARQUITECTURA ===

      // Redirecciones de rutas legacy de patient a nueva estructura
      {
        source: '/patient',
        destination: '/pacientes/app',
        permanent: true,
      },
      {
        source: '/patient/:path*',
        destination: '/pacientes/app/:path*',
        permanent: true,
      },

      // Redirecciones de rutas legacy de academic/estudiantes a nueva estructura
      {
        source: '/academic',
        destination: '/pacientes/app',
        permanent: true,
      },
      {
        source: '/academic/:path*',
        destination: '/pacientes/app/:path*',
        permanent: true,
      },
      {
        source: '/estudiantes',
        destination: '/pacientes/app',
        permanent: true,
      },
      {
        source: '/estudiantes/:path*',
        destination: '/pacientes/app/:path*',
        permanent: true,
      },

      // Redirecciones de rutas legacy de therapist a nueva estructura
      {
        source: '/therapist',
        destination: '/terapeutas/app',
        permanent: true,
      },
      {
        source: '/therapist/:path*',
        destination: '/terapeutas/app/:path*',
        permanent: true,
      },

      // Redirecciones de rutas legacy de business a nueva estructura
      {
        source: '/business',
        destination: '/empresas/app',
        permanent: true,
      },
      {
        source: '/business/:path*',
        destination: '/empresas/app/:path*',
        permanent: true,
      },

      // Redirecciones de marketing legacy
      {
        source: '/para-estudiantes',
        destination: '/pacientes',
        permanent: true,
      },
      {
        source: '/para-estudiantes/:path*',
        destination: '/pacientes/:path*',
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
