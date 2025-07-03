'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Star } from 'lucide-react';
import Link from 'next/link';

interface EcosystemHeroProps {
  ecosystem: 'patient' | 'therapist' | 'academic' | 'student' | 'business';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
  backgroundGradient: string;
  icon: React.ReactNode;
}

export function EcosystemHero({
  ecosystem,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  features,
  backgroundGradient,
  icon
}: EcosystemHeroProps) {
  return (
    <section className={`relative overflow-hidden ${backgroundGradient} py-24 sm:py-32`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/20" />
      
      <div className="container relative mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon Badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            {icon}
          </div>

          {/* Main Content */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
            <span className="block text-2xl font-medium opacity-90 mt-2 sm:text-3xl lg:text-4xl">
              {subtitle}
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {description}
          </p>

          {/* Features Pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20"
              >
                <Star className="h-4 w-4" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="ghost" 
              size="lg" 
              className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              <Link href="#features">
                Explorar Características
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Seguro & Privado</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Respaldado por Ciencia</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="text-sm">Avalado por Profesionales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
