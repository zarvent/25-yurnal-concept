'use client';

import { BookHeart } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * HeroSection Component
 * Inspired by Headspace's calming, trustworthy hero design
 * Features: Therapeutic animations, gradient text, and calming icons
 */
export function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <section className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-16">
                <div className="mx-auto max-w-6xl text-center">
                    <div className="skeleton-therapeutic h-24 w-24 mx-auto rounded-full mb-8"></div>
                    <div className="skeleton-therapeutic h-16 w-3/4 mx-auto rounded-therapeutic mb-6"></div>
                    <div className="skeleton-therapeutic h-8 w-full max-w-4xl mx-auto rounded-therapeutic"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-16 bg-therapeutic-gradient">
            {/* Calming background pattern */}
            <div className="absolute inset-0 bg-mesh-therapeutic opacity-50"></div>

            {/* Floating therapeutic shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float-gentle"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-healing/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-warm/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }}></div>

            <div className="relative mx-auto max-w-6xl text-center">
                <div className="mb-12 animate-therapeutic-fade">
                    {/* Iconic representation - calming and professional */}
                    <div className="mb-8 inline-flex items-center justify-center">
                        <div className="relative">
                            <BookHeart className="h-24 w-24 text-primary animate-float-gentle drop-shadow-xl" />
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-gentle-pulse"></div>
                        </div>
                    </div>

                    {/* Hero headline - therapeutic typography */}
                    <h1 className="text-therapeutic-h1 mb-8 font-bold sm:text-6xl lg:text-7xl">
                        <span className="block mb-2 text-foreground">Bienvenido a</span>
                        <span className="block text-gradient-primary">Yurnal</span>
                    </h1>

                    {/* Supportive subtitle with emotional connection */}
                    <p className="text-therapeutic-body mx-auto max-w-4xl text-xl text-muted-foreground sm:text-2xl lg:text-3xl font-light leading-relaxed">
                        El espacio más avanzado del mundo para el{' '}
                        <span className="font-semibold text-primary">crecimiento personal</span>,{' '}
                        <span className="font-semibold text-healing">sanación profunda</span> y{' '}
                        <span className="font-semibold text-warm">transformación terapéutica</span>.
                    </p>
                </div>

                {/* Trust indicators */}
                <div className="mb-16 animate-therapeutic-fade" style={{ animationDelay: '200ms' }}>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        {[
                            "Privacidad total",
                            "IA terapéutica",
                            "Acceso 24/7",
                            "Resultados comprobados"
                        ].map((trust, index) => (
                            <div
                                key={index}
                                className="card-therapeutic flex items-center gap-2 rounded-full px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 transition-all duration-200 interactive-therapeutic"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-2 h-2 rounded-full bg-primary animate-gentle-pulse"></div>
                                <span className="font-medium text-foreground">{trust}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating CTA section */}
                <div className="animate-therapeutic-fade" style={{ animationDelay: '400ms' }}>
                    <div className="inline-flex flex-col sm:flex-row gap-4 p-1 rounded-therapeutic-xl bg-gradient-to-r from-primary/10 to-healing/10 backdrop-blur-sm">
                        <div className="px-6 py-3 text-therapeutic-caption text-muted-foreground">
                            Más de <span className="font-bold text-primary">10,000+</span> profesionales confían en nosotros
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
