// src/app/(marketing)/layout.tsx
/**
 * Marketing Layout - Arquitectura de Ecosistema Público
 *
 * Este layout implementa la separación de intereses entre el marketing público
 * y la aplicación funcional, siguiendo principios de:
 * - Clean Architecture: Separación clara de responsabilidades
 * - Performance Optimization: SEO y carga optimizada para conversión
 * - User Experience: Flujo de descubrimiento -> consideración -> acción
 * - Security by Design: Sin contextos de aplicación autenticada
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/route-groups
 */

import MainHeader from '@/components/layout/main-header';
import { MarketingFooter } from '@/components/marketing/marketing-footer';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

// Optimización de fuentes para marketing (conversión)
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    preload: true, // Preload crítico para LCP
});

// Metadata base para SEO de marketing - Optimizado para conversión
export const metadata: Metadata = {
    title: {
        template: '%s | Yurnal - Tecnología Terapéutica Inteligente',
        default: 'Yurnal - Transformando vidas a través de la tecnología terapéutica'
    },
    description: 'Plataforma integral de bienestar mental con IA, transcripción de voz y herramientas terapéuticas avanzadas. Para pacientes, terapeutas, estudiantes y empresas.',
    keywords: [
        'terapia digital',
        'bienestar mental',
        'inteligencia artificial terapéutica',
        'salud mental',
        'tecnología terapéutica',
        'transcripción terapéutica',
        'plataforma terapéutica',
        'psicología digital'
    ],
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        siteName: 'Yurnal',
        title: 'Yurnal - Tecnología Terapéutica Inteligente',
        description: 'Descubre cómo la inteligencia artificial y las herramientas terapéuticas avanzadas pueden transformar el bienestar mental.',
        url: 'https://yurnal.com',
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
        google: 'placeholder-google-verification', // TODO: Agregar código real
    },
};

interface MarketingLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout de Marketing - Entorno Público Optimizado
 *
 * Características técnicas:
 * - Sin contextos de aplicación (performance)
 * - SEO optimizado para conversión
 * - Estructura semántica para accesibilidad
 * - Error boundary implícito de Next.js
 */
export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className={`${inter.variable} font-sans`}>
            <div className="flex min-h-screen flex-col bg-background">
                {/* Header público optimizado para conversión */}
                <MainHeader />

                {/* Contenido principal con estructura semántica */}
                <main className="flex-1" role="main">
                    {children}
                </main>

                {/* Footer de marketing con enlaces corporativos */}
                <MarketingFooter />
            </div>
        </div>
    );
}
