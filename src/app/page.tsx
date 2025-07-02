'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TherapeuticButton } from '@/components/ui/therapeutic-button';
import { ArrowRight, BookHeart, Globe, GraduationCap, HeartHandshake, Shield, Sparkles, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  const roles = [
    {
      icon: <User className="h-10 w-10 text-primary" />,
      title: 'Crecimiento Personal',
      description: 'Un santuario digital para la introspección profunda y el desarrollo emocional.',
      href: '/patient/onboarding',
      cta: 'Comenzar mi transformación',
      gradient: 'from-primary/15 to-secondary/10',
      features: ['Diario inteligente', 'Reflexiones guiadas', 'Seguimiento emocional']
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-secondary" />,
      title: 'Excelencia Académica',
      description: 'Conecta teoría psicológica avanzada con aplicaciones prácticas del mundo real.',
      href: '/academic/onboarding',
      cta: 'Iniciar mi formación',
      gradient: 'from-secondary/15 to-accent/10',
      features: ['Biblioteca premium', 'Rutas personalizadas', 'Papers exclusivos']
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-accent" />,
      title: 'Práctica Profesional',
      description: 'Herramientas avanzadas para potenciar tu impacto terapéutico y transformar vidas.',
      href: '/therapist/onboarding',
      cta: 'Acceder al portal pro',
      gradient: 'from-accent/15 to-primary/10',
      features: ['Dashboard clínico', 'Gestión de pacientes', 'Análisis avanzado']
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'IA Terapéutica Avanzada',
      description: 'Algoritmos de última generación que comprenden y apoyan tu bienestar emocional.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacidad Absoluta',
      description: 'Encriptación de nivel militar. Tus pensamientos más íntimos están completamente seguros.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Acceso Universal',
      description: 'Disponible desde cualquier dispositivo, en cualquier momento, en cualquier lugar del mundo.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Insights Instantáneos',
      description: 'Obtén comprensiones profundas de tus patrones emocionales en tiempo real.'
    }
  ];

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="skeleton h-32 w-32 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-therapeutic">
      {/* Hero Section - Therapeutic Design */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6"></div>

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-12 animate-therapeutic-fade">
            <div className="mb-8 inline-flex items-center justify-center">
              <BookHeart className="h-24 w-24 text-primary animate-float-gentle drop-shadow-xl" />
            </div>

            <h1 className="text-therapeutic-h1 mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent sm:text-6xl lg:text-7xl">
              Bienvenido a
              <span className="block text-gradient mt-2">Yurnal</span>
            </h1>

            <p className="text-therapeutic-body mx-auto max-w-4xl text-xl text-muted-foreground sm:text-2xl lg:text-3xl font-light">
              El espacio más avanzado del mundo para el{' '}
              <span className="font-semibold text-primary">crecimiento personal</span>,{' '}
              <span className="font-semibold text-secondary">aprendizaje profundo</span> y{' '}
              <span className="font-semibold text-accent">transformación terapéutica</span>.
            </p>
          </div>

          <div className="mb-16 animate-therapeutic-fade" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-therapeutic flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm interactive"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-primary">{feature.icon}</span>
                  <span className="font-medium">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles Selection - Professional Layout */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center animate-therapeutic-fade">
            <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              ¿Cuál es tu camino hacia la{' '}
              <span className="text-gradient">excelencia</span>?
            </h2>
            <p className="text-therapeutic-body mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Cada usuario merece una experiencia personalizada. Elige tu rol y descubre las herramientas
              diseñadas específicamente para tu crecimiento profesional y personal.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {roles.map((role, index) => (
              <div
                key={role.title}
                className="group animate-therapeutic-fade"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className={`card-therapeutic relative overflow-hidden border-0 bg-gradient-to-br ${role.gradient} p-1 transition-all duration-300 hover:scale-105 hover:shadow-elevation-4 cursor-pointer h-full`}>
                  <div className="relative h-full rounded-lg bg-card/95 backdrop-blur-sm p-8 text-center flex flex-col">
                    {/* Professional shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="mb-6 flex justify-center">
                        <div className="rounded-2xl bg-gradient-to-br from-background to-muted/50 p-4 shadow-elevation-2 group-hover:shadow-elevation-3 transition-shadow">
                          {role.icon}
                        </div>
                      </div>

                      <CardHeader className="p-0 pb-4 flex-1">
                        <CardTitle className="text-therapeutic-h3 text-2xl font-bold mb-3">{role.title}</CardTitle>
                        <CardDescription className="text-therapeutic-body leading-relaxed">
                          {role.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 pb-6">
                        <div className="space-y-3">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              <span className="font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-0 mt-auto">
                        <TherapeuticButton
                          variant="default"
                          size="lg"
                          className="w-full group focus-therapeutic"
                          asChild
                          optimistic
                        >
                          <Link href={role.href}>
                            <span className="flex items-center justify-center">
                              {role.cta}
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Link>
                        </TherapeuticButton>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Professional Information Architecture */}
      <section className="px-4 py-20 sm:px-8 lg:px-16 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center animate-therapeutic-fade">
            <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl">
              Tecnología de{' '}
              <span className="text-gradient">vanguardia</span>
            </h2>
            <p className="text-therapeutic-body mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Cada característica ha sido meticulosamente diseñada para ofrecer una experiencia
              transformadora y resultados mensurables en tu bienestar.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-therapeutic group rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-elevation-3 animate-therapeutic-fade interactive"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors">
                    <span className="text-primary">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-therapeutic-h3 text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-therapeutic-caption leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Professional and Therapeutic */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="card-therapeutic rounded-2xl p-12 bg-gradient-to-br from-primary/5 to-secondary/5 animate-therapeutic-fade">
            <h2 className="text-therapeutic-h2 mb-6 text-3xl sm:text-4xl">
              Comienza tu{' '}
              <span className="text-gradient">transformación</span>{' '}
              hoy
            </h2>
            <p className="text-therapeutic-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Únete a miles de profesionales y personas que ya han descubierto el poder
              de la tecnología terapéutica avanzada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <TherapeuticButton
                variant="therapeutic"
                size="xl"
                animation="shimmer"
                className="focus-therapeutic"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Comenzar gratis
              </TherapeuticButton>
              <TherapeuticButton
                variant="outline"
                size="xl"
                className="focus-therapeutic"
              >
                Ver demostración
              </TherapeuticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Professional and Minimal */}
      <footer className="border-t bg-muted/10 px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-therapeutic-caption text-muted-foreground">
            © {year} Yurnal. Transformando vidas a través de la tecnología terapéutica.
          </p>
        </div>
      </footer>
    </div>
  );
}
