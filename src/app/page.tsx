/**
 * Root Page - Entrada Principal al Ecosistema Yurnal
 *
 * Esta página actúa como punto de entrada que renderiza directamente
 * el contenido de marketing, evitando redirecciones innecesarias
 * para optimizar Core Web Vitals y SEO.
 *
 * Estrategia técnica:
 * - Server-side rendering directo (mejor LCP)
 * - Sin redirecciones (mejor CLS)
 * - Metadata optimizado para conversión
 * - Estructura semántica para SEO
 * - Layout específico de marketing
 */

import { CTASection } from '@/components/landing/cta-section';
import { EcosystemHighlight } from '@/components/landing/ecosystem-highlight';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HeroSection } from '@/components/landing/hero-section';
import MainHeader from '@/components/layout/main-header';
import { MarketingFooter } from '@/components/marketing/marketing-footer';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

// Optimización de fuentes para conversión
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

/**
 * Metadata optimizado para la página principal
 */
export const metadata: Metadata = {
  title: 'Yurnal - Tecnología Terapéutica Inteligente',
  description: 'Plataforma integral de bienestar mental con IA, transcripción de voz y herramientas terapéuticas. Para pacientes, terapeutas, estudiantes y empresas.',
  keywords: [
    'terapia digital',
    'bienestar mental',
    'inteligencia artificial terapéutica',
    'salud mental',
    'transcripción terapéutica',
    'plataforma terapéutica',
    'tecnología médica',
    'psicología digital'
  ],
  openGraph: {
    title: 'Yurnal - Transformando vidas a través de la tecnología terapéutica',
    description: 'Descubre cómo la inteligencia artificial y las herramientas terapéuticas avanzadas pueden transformar el bienestar mental.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://yurnal.com',
    siteName: 'Yurnal',
  },
  robots: {
    index: true,
    follow: true,
  }
};

/**
 * Structured Data para SEO
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Yurnal',
  description: 'Plataforma integral de bienestar mental con IA, transcripción de voz y herramientas terapéuticas avanzadas.',
  url: 'https://yurnal.com',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock'
  }
};

/**
 * Página Principal - Landing de Marketing Directo
 *
 * Renderiza directamente el contenido de marketing con su propio layout,
 * optimizando la experiencia del usuario y las métricas de performance.
 */
export default function HomePage() {
  return (
    <div className={`${inter.variable} font-sans`}>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header público optimizado para conversión */}
        <MainHeader />

        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Contenido principal de marketing */}
        <main className="flex-1" role="main">
          <div className="min-h-screen bg-background">
            {/* Hero Section - Primera impresión terapéutica */}
            <HeroSection />

            {/* Ecosystem Highlight - Caminos claros por tipo de usuario */}
            <EcosystemHighlight />

            {/* Features Grid - Capacidades técnicas con toque humano */}
            <FeaturesGrid />

            {/* Call to Action - Construcción de confianza y conversión final */}
            <CTASection />
          </div>
        </main>

        {/* Footer de marketing con enlaces corporativos */}
        <MarketingFooter />
      </div>
    </div>
  );
}
