'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Building2, GraduationCap, HeartHandshake, Stethoscope, User, BookOpen } from 'lucide-react';
import Link from 'next/link';

/**
 * EcosystemHighlight Component
 * Showcases different user roles with Headspace-inspired cards
 * Each ecosystem has its own therapeutic color scheme and personality
 */
export function EcosystemHighlight() {
    const ecosystems = [
        {
            icon: <User className="h-8 w-8" />,
            title: 'Paciente',
            description: 'Tu santuario digital para el crecimiento personal y la sanación emocional.',
            href: '/patient',
            cta: 'Comenzar mi transformación',
            variant: 'patient' as const,
            features: ['Diario inteligente', 'Reflexiones guiadas', 'Seguimiento emocional'],
            bgGradient: 'from-patient/5 to-patient/10',
            iconBg: 'bg-patient/10 text-patient',
        },
        {
            icon: <Stethoscope className="h-8 w-8" />,
            title: 'Terapeuta',
            description: 'Herramientas profesionales para potenciar tu impacto terapéutico.',
            href: '/therapist',
            cta: 'Acceder al portal pro',
            variant: 'therapist' as const,
            features: ['Dashboard clínico', 'Gestión de pacientes', 'Análisis avanzado'],
            bgGradient: 'from-therapist/5 to-therapist/10',
            iconBg: 'bg-therapist/10 text-therapist',
        },
        {
            icon: <GraduationCap className="h-8 w-8" />,
            title: 'Académico',
            description: 'Conecta teoría psicológica con aplicaciones prácticas del mundo real.',
            href: '/academic',
            cta: 'Iniciar mi formación',
            variant: 'academic' as const,
            features: ['Biblioteca premium', 'Cursos especializados', 'Papers exclusivos'],
            bgGradient: 'from-academic/5 to-academic/10',
            iconBg: 'bg-academic/10 text-academic',
        },
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: 'Estudiante',
            description: 'Herramientas especializadas para el bienestar y éxito académico.',
            href: '/student',
            cta: 'Mejorar mi bienestar',
            variant: 'student' as const,
            features: ['Manejo de estrés', 'Planificación académica', 'Comunidad estudiantil'],
            bgGradient: 'from-student/5 to-student/10',
            iconBg: 'bg-student/10 text-student',
        },
        {
            icon: <Building2 className="h-8 w-8" />,
            title: 'Empresas',
            description: 'Bienestar organizacional que potencia el rendimiento de tus equipos.',
            href: '/business',
            cta: 'Transformar mi empresa',
            variant: 'default' as const,
            features: ['Bienestar de equipos', 'Analytics organizacional', 'ROI comprobado'],
            bgGradient: 'from-warm/5 to-warm/10',
            iconBg: 'bg-warm/10 text-warm',
        },
    ];

    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-6xl">
                {/* Section Header - Therapeutic messaging */}
                <div className="mb-16 text-center animate-therapeutic-fade">
                    <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl lg:text-5xl">
                        ¿Cuál es tu camino hacia la{' '}
                        <span className="text-gradient-primary">excelencia</span>?
                    </h2>
                    <p className="text-therapeutic-body mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
                        Cada usuario merece una experiencia personalizada. Descubre las herramientas
                        diseñadas específicamente para tu crecimiento profesional y personal.
                    </p>
                </div>

                {/* Ecosystem Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {ecosystems.map((ecosystem, index) => (
                        <div
                            key={ecosystem.title}
                            className="group animate-therapeutic-fade"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <Card
                                variant={ecosystem.variant}
                                className="relative overflow-hidden h-full transition-all duration-300 hover:scale-105 cursor-pointer group-hover:shadow-therapeutic-lg"
                            >
                                {/* Subtle shimmer effect on hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <CardHeader className="text-center pb-4">
                                        {/* Therapeutic icon design */}
                                        <div className="mb-6 flex justify-center">
                                            <div className={`rounded-therapeutic-lg p-4 ${ecosystem.iconBg} shadow-therapeutic transition-all duration-200 group-hover:shadow-therapeutic-md group-hover:-translate-y-1`}>
                                                {ecosystem.icon}
                                            </div>
                                        </div>

                                        <CardTitle className="text-therapeutic-h3 text-2xl font-bold mb-3 text-foreground">
                                            Yurnal {ecosystem.title}
                                        </CardTitle>
                                        <CardDescription className="text-therapeutic-body leading-relaxed">
                                            {ecosystem.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex-1 space-y-3">
                                        {ecosystem.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm">
                                                <div className={`w-2 h-2 rounded-full ${ecosystem.iconBg.split(' ')[0]} animate-gentle-pulse`}></div>
                                                <span className="font-medium text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </CardContent>

                                    <CardFooter className="pt-6">
                                        <Button
                                            variant={ecosystem.variant}
                                            size="lg"
                                            className="w-full group/btn"
                                            asChild
                                        >
                                            <Link href={ecosystem.href}>
                                                <span className="flex items-center justify-center gap-2">
                                                    {ecosystem.cta}
                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                </span>
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Business Solution Link - Subtle and professional */}
                <div className="mt-12 text-center">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        asChild
                    >
                        <Link href="/business" className="flex items-center gap-2">
                            <HeartHandshake className="h-4 w-4" />
                            ¿Buscas una solución para tu empresa?
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
