'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Play } from 'lucide-react';

/**
 * CTASection Component
 * Final call-to-action with Headspace-inspired therapeutic design
 * Focuses on trust, transformation, and clear next steps
 */
export function CTASection() {
    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-4xl">
                <Card
                    variant="glass"
                    className="relative overflow-hidden p-12 bg-gradient-to-br from-primary/5 via-healing/5 to-warm/5 animate-therapeutic-fade border-0"
                >
                    {/* Therapeutic background elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float-gentle"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-healing/10 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '1s' }}></div>

                    <div className="relative z-10 text-center">
                        {/* Compelling headline */}
                        <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl font-bold">
                            Comienza tu{' '}
                            <span className="text-gradient-primary">transformación</span>{' '}
                            hoy
                        </h2>

                        {/* Supportive description */}
                        <p className="text-therapeutic-body text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                            Únete a miles de profesionales y personas que ya han descubierto el poder
                            de la tecnología terapéutica avanzada para transformar sus vidas.
                        </p>

                        {/* Trust reinforcement */}
                        <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                            {[
                                "✓ Sin compromiso",
                                "✓ Configuración en 2 minutos",
                                "✓ Soporte 24/7",
                                "✓ Garantía de satisfacción"
                            ].map((benefit, index) => (
                                <span key={index} className="flex items-center gap-2">
                                    <span className="text-healing">●</span>
                                    {benefit}
                                </span>
                            ))}
                        </div>

                        {/* Primary CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                variant="healing"
                                size="xl"
                                className="group shadow-healing-glow hover:shadow-therapeutic-lg"
                            >
                                Comenzar gratis
                                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                variant="outline"
                                size="xl"
                                className="group border-2"
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Ver demostración
                            </Button>
                        </div>

                        {/* Additional trust signal */}
                        <div className="mt-8 text-xs text-muted-foreground">
                            Prueba gratuita de 14 días • No se requiere tarjeta de crédito
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
