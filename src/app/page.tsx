'use client';

import { CTASection } from '@/components/landing/cta-section';
import { EcosystemHighlight } from '@/components/landing/ecosystem-highlight';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HeroSection } from '@/components/landing/hero-section';
import { useEffect, useState } from 'react';

/**
 * Yurnal Landing Page
 * Redesigned following Headspace principles:
 * - Calming, trustworthy design
 * - Clear value propositions
 * - Therapeutic color palette
 * - Accessible, modular architecture
 * - Professional yet approachable tone
 */
export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - First impression with therapeutic calm */}
      <HeroSection />

      {/* Ecosystem Highlight - Clear paths for different user types */}
      <EcosystemHighlight />

      {/* Features Grid - Technical capabilities with human touch */}
      <FeaturesGrid />

      {/* Call to Action - Trust-building final conversion */}
      <CTASection />

      {/* Footer - Professional and minimal */}
      <footer className="border-t bg-muted/10 px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-therapeutic-caption text-muted-foreground">
              © {year} Yurnal. Transformando vidas a través de la tecnología terapéutica.
            </p>
            <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacidad</a>
              <a href="/terms" className="hover:text-foreground transition-colors">Términos</a>
              <a href="/support" className="hover:text-foreground transition-colors">Soporte</a>
              <a href="/about" className="hover:text-foreground transition-colors">Acerca de</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
