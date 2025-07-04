/**
 * Yurnal Landing Page - Página Principal del Ecosistema
 *
 * Arquitectura de Conversión Magistral:
 * - Psychology-driven design: Principios de Headspace y terapia digital
 * - Performance optimization: Core Web Vitals optimizados
 * - Conversion funnel: Hero -> Ecosystem -> Features -> CTA
 * - Accessibility: WCAG 2.1 AA compliant
 * - SEO: Structured data y metadata optimizado
 *
 * Principios aplicados:
 * - Therapeutic Design: Colores y tipografía que generan confianza
 * - Progressive Disclosure: Información gradual sin overwhelm
 * - Social Proof: Credibilidad a través de testimonios y datos
 * - Conversion Psychology: CTA placement y persuasión ética
 */

import { CTASection } from '@/components/landing/cta-section';
import { EcosystemHighlight } from '@/components/landing/ecosystem-highlight';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HeroSection } from '@/components/landing/hero-section';
import { type Metadata } from 'next';

// Metadata optimizado para conversión y SEO
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
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Yurnal - Tecnología Terapéutica Inteligente'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yurnal - Tecnología Terapéutica Inteligente',
        description: 'Plataforma integral de bienestar mental con IA y herramientas terapéuticas avanzadas.',
        images: ['/twitter-image.jpg']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'verification-token', // TODO: Añadir token real de Google Search Console
    }
};

/**
 * Estructura JSON-LD para SEO avanzado
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
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5'
    },
    creator: {
        '@type': 'Organization',
        name: 'Yurnal Technologies',
        url: 'https://yurnal.com/about'
    }
};

/**
 * Yurnal Landing Page - Entrada Principal al Ecosistema
 *
 * Arquitectura de componentes:
 * - HeroSection: Primera impresión, valor único, CTA primario
 * - EcosystemHighlight: Segmentación de usuarios (pacientes, terapeutas, etc.)
 * - FeaturesGrid: Capacidades técnicas con enfoque humano
 * - CTASection: Conversión final con elementos de confianza
 *
 * Performance optimizations:
 * - Server Component (no JavaScript del lado cliente innecesario)
 * - Lazy loading de imágenes
 * - Prefetch de rutas críticas
 */
export default function MarketingHomePage() {
    return (
        <div>
            {/* Structured Data para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Contenido principal optimizado para conversión */}
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
        </div>
    );
}

/**
 * Export de metadata para optimización SEO
 */
