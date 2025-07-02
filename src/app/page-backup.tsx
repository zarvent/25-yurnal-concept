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
      title: 'Yurnal Pacientes',
      description: 'Un santuario digital para la introspección profunda y el desarrollo emocional.',
      href: '/patient/onboarding',
      cta: 'Comenzar mi transformación',
      gradient: 'from-primary/20 to-primary-light/10',
      features: ['Diario inteligente', 'Reflexiones guiadas', 'Seguimiento emocional']
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-accent" />,
      title: 'Excelencia Académica',
      description: 'Conecta teoría psicológica avanzada con aplicaciones prácticas del mundo real.',
      href: '/academic/onboarding',
      cta: 'Iniciar mi formación',
      gradient: 'from-accent/20 to-warning/10',
      features: ['Biblioteca premium', 'Rutas personalizadas', 'Papers exclusivos']
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-success" />,
      title: 'Práctica Profesional',
      description: 'Herramientas avanzadas para potenciar tu impacto terapéutico y transformar vidas.',
      href: '/therapist/onboarding',
      cta: 'Acceder al portal pro',
      gradient: 'from-success/20 to-primary/10',
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
        <div className="h-32 w-32 animate-pulse rounded-full bg-primary/20"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-8 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-6 inline-flex items-center justify-center">
              <BookHeart className="h-20 w-20 text-primary animate-float drop-shadow-lg" />
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Bienvenido a
              <span className="block text-gradient">Yurnal</span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl text-muted-foreground sm:text-2xl lg:text-3xl font-light leading-relaxed">
              El espacio más avanzado del mundo para el{' '}
              <span className="font-semibold text-primary">crecimiento personal</span>,{' '}
              <span className="font-semibold text-accent">aprendizaje profundo</span> y{' '}
              <span className="font-semibold text-success">transformación terapéutica</span>.
            </p>
          </div>

          <div className="mb-16 animate-fade-in-up animation-delay-200">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 backdrop-blur-sm border">
                  {feature.icon}
                  <span className="font-medium">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles Selection */}
      <section className="px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              ¿Cuál es tu camino hacia la{' '}
              <span className="text-gradient">excelencia</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Cada usuario merece una experiencia personalizada. Elige tu rol y descubre las herramientas
              diseñadas específicamente para tu crecimiento.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {roles.map((role, index) => (
              <Link href={role.href} key={role.title} passHref>
                <Card className={`group relative overflow-hidden border-0 bg-gradient-to-br ${role.gradient} p-1 transition-all duration-400 hover:scale-105 hover:shadow-xl animate-fade-in-up cursor-pointer`}
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative h-full rounded-lg bg-card/90 backdrop-blur-sm p-8 text-center">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10">
                      <div className="mb-6 flex justify-center">
                        <div className="rounded-2xl bg-gradient-to-br from-background to-muted p-4 shadow-md group-hover:shadow-lg transition-shadow">
                          {role.icon}
                        </div>
                      </div>

                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-2xl font-bold mb-2">{role.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {role.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 pb-6">
                        <div className="space-y-2">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-0">
                        <TherapeuticButton
                          variant="default"
                          size="lg"
                          className="w-full group"
                          asChild
                        >
                          <Link href={role.href}>
                            {role.cta}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </TherapeuticButton>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-8 lg:px-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Tecnología de{' '}
              <span className="text-gradient">vanguardia</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Cada característica ha sido meticulosamente diseñada para ofrecer una experiencia
              transformadora y resultados mensurables.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl bg-card/60 backdrop-blur-sm border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          <Card className="border-0 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 p-1">
            <div className="rounded-lg bg-card/90 backdrop-blur-sm p-12">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                ¿Lideras una organización?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Transforma el bienestar de tu equipo con soluciones empresariales personalizadas.
                Implementación completa, soporte 24/7 y análisis organizacional avanzado.
              </p>
              <Button
                asChild
                className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/business">
                  Explorar soluciones empresariales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <BookHeart className="mx-auto h-12 w-12 text-primary" />
          </div>
          <p className="mb-2 text-sm text-muted-foreground">
            © {year} Yurnal. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Zarvent Labs</span> - Una visión de{' '}
            <span className="font-semibold text-primary">Cesar Sebastian Zambrana Ventura</span>
          </p>
          <div className="mt-6 text-xs text-muted-foreground">
            Transformando vidas a través de la tecnología consciente
          </div>
        </div>
      </footer>
    </div>
  );
}
