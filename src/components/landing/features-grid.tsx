'use client';

import { Card } from '@/components/ui/card';
import { Globe, Shield, Sparkles, Zap } from 'lucide-react';

/**
 * FeaturesGrid Component
 * Showcases key platform capabilities with Headspace-inspired design
 * Professional information architecture with therapeutic visual elements
 */
export function FeaturesGrid() {
    const features = [
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: 'IA Terapéutica Avanzada',
            description: 'Algoritmos de última generación que comprenden y apoyan tu bienestar emocional con precisión clínica.',
            color: 'primary',
            bgGradient: 'from-primary/5 to-primary/10',
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Privacidad Absoluta',
            description: 'Encriptación de nivel militar. Tus pensamientos más íntimos están completamente protegidos.',
            color: 'healing',
            bgGradient: 'from-healing/5 to-healing/10',
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: 'Acceso Universal',
            description: 'Disponible desde cualquier dispositivo, en cualquier momento, en cualquier lugar del mundo.',
            color: 'warm',
            bgGradient: 'from-warm/5 to-warm/10',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Insights Instantáneos',
            description: 'Obtén comprensiones profundas de tus patrones emocionales y de crecimiento en tiempo real.',
            color: 'calm',
            bgGradient: 'from-calm/5 to-calm/10',
        }
    ];

    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16 bg-muted/20">
            <div className="mx-auto max-w-6xl">
                {/* Section header with therapeutic messaging */}
                <div className="mb-16 text-center animate-therapeutic-fade">
                    <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl">
                        Tecnología de{' '}
                        <span className="text-gradient-healing">vanguardia</span>
                    </h2>
                    <p className="text-therapeutic-body mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
                        Cada característica ha sido meticulosamente diseñada para ofrecer una experiencia
                        transformadora y resultados mensurables en tu bienestar.
                    </p>
                </div>

                {/* Features grid with therapeutic cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            variant="interactive"
                            className={`group text-center p-6 bg-gradient-to-br ${feature.bgGradient} hover:scale-105 animate-therapeutic-fade transition-all duration-300`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Therapeutic icon container */}
                            <div className="mb-6 flex justify-center">
                                <div className={`rounded-therapeutic-lg p-4 bg-${feature.color}/10 group-hover:bg-${feature.color}/15 transition-all duration-200 group-hover:shadow-therapeutic-sm group-hover:-translate-y-1`}>
                                    <span className={`text-${feature.color}`}>{feature.icon}</span>
                                </div>
                            </div>

                            {/* Feature content */}
                            <h3 className="text-therapeutic-h3 text-lg font-semibold mb-4 text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-therapeutic-caption leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>

                            {/* Subtle interaction indicator */}
                            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className={`w-12 h-1 bg-${feature.color} rounded-full mx-auto`}></div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Additional trust signals */}
                <div className="mt-16 text-center animate-therapeutic-fade">
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        {[
                            { label: "Usuarios activos", value: "10,000+" },
                            { label: "Sesiones completadas", value: "1M+" },
                            { label: "Satisfacción", value: "98%" },
                            { label: "Países", value: "50+" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
