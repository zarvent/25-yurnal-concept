'use client';

import { AccessPortal } from '@/components/ecosystem-landing/access-portal';
import { EcosystemHero } from '@/components/ecosystem-landing/ecosystem-hero';
import { FeatureShowcase } from '@/components/ecosystem-landing/feature-showcase';
import { 
  BarChart3,
  Building2, 
  Heart,
  Lightbulb,
  PieChart,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  UserCheck,
  Zap,
  Target
} from 'lucide-react';

export default function BusinessLandingPage() {
  const heroData = {
    ecosystem: 'business' as const,
    title: 'Bienestar Empresarial',
    subtitle: 'Para Organizaciones Modernas',
    description: 'Plataforma integral de bienestar mental para empresas que priorizan el cuidado y productividad de sus equipos.',
    ctaText: 'Explorar Soluciones',
    ctaLink: '/business/dashboard',
    features: ['Bienestar de Equipos', 'Analytics Organizacional', 'ROI Comprobado'],
    backgroundGradient: 'bg-gradient-to-br from-warm via-warm/90 to-primary',
    icon: <Building2 className="h-10 w-10 text-white" />
  };

  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Bienestar de Equipos',
      description: 'Herramientas para monitorear y mejorar la salud mental y bienestar de toda la organización.',
      benefits: [
        'Dashboard de bienestar organizacional',
        'Alertas tempranas de burnout',
        'Programas de bienestar personalizados',
        'Recursos de apoyo para managers'
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: 'Analytics y Métricas',
      description: 'Insights basados en datos para tomar decisiones informadas sobre programas de bienestar.',
      benefits: [
        'ROI de programas de bienestar',
        'Métricas de engagement y satisfacción',
        'Análisis de riesgo de rotación',
        'Benchmarking con industria'
      ]
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: 'Programas Personalizados',
      description: 'Diseñamos e implementamos programas de bienestar específicos para tu cultura organizacional.',
      benefits: [
        'Assessment inicial de necesidades',
        'Programas adaptados a tu industria',
        'Implementación gradual y medible',
        'Soporte especializado continuo'
      ]
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: 'Capacitación de Liderazgo',
      description: 'Entrenamos a tus líderes para reconocer y apoyar la salud mental de sus equipos.',
      benefits: [
        'Workshops para managers y supervisores',
        'Herramientas de conversaciones difíciles',
        'Protocolos de crisis y escalación',
        'Certificación en bienestar mental'
      ]
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: 'Mejora de Productividad',
      description: 'Conecta bienestar mental con resultados de negocio de forma medible y sostenible.',
      benefits: [
        'Reducción de ausentismo y rotación',
        'Aumento en engagement y productividad',
        'Mejora en clima organizacional',
        'Fortalecimiento de employer branding'
      ]
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: 'Employee Assistance Program',
      description: 'Programa integral de asistencia a empleados con soporte 24/7 y confidencialidad garantizada.',
      benefits: [
        'Línea de crisis 24/7 multiidioma',
        'Sesiones de counseling confidenciales',
        'Recursos para familias de empleados',
        'Integración con seguros médicos'
      ]
    }
  ];

  const accessPortalData = {
    ecosystem: 'business' as const,
    title: 'Invierte en lo que más Importa: Tu Gente',
    description: 'Únete a cientos de empresas que están transformando su cultura organizacional.',
    appLink: '/business/dashboard',
    demoLink: '/demo/business',
    supportItems: [
      {
        icon: <UserCheck className="h-6 w-6 text-primary" />,
        title: 'Implementation Partner',
        description: 'Equipo especializado te acompaña en cada paso de la implementación.'
      },
      {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: 'Enterprise Security',
        description: 'Máximos estándares de seguridad para proteger datos sensibles organizacionales.'
      },
      {
        icon: <PieChart className="h-6 w-6 text-primary" />,
        title: 'ROI Measurement',
        description: 'Herramientas avanzadas para medir el retorno de inversión de programas de bienestar.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <EcosystemHero {...heroData} />
      
      <FeatureShowcase
        ecosystem="business"
        title="Soluciones Empresariales de Clase Mundial"
        subtitle="Diseñado para organizaciones que entienden que el bienestar de sus empleados es su mayor ventaja competitiva."
        features={features}
      />

      <AccessPortal {...accessPortalData} />

      {/* Enterprise Success Metrics */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Resultados Empresariales Comprobados
            </h3>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">40%</div>
                <p className="text-sm text-muted-foreground">Reducción Rotación</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">65%</div>
                <p className="text-sm text-muted-foreground">Mejora Engagement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">35%</div>
                <p className="text-sm text-muted-foreground">Menos Ausentismo</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8x</div>
                <p className="text-sm text-muted-foreground">ROI Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/10 px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-therapeutic-caption text-muted-foreground">
              © 2025 Yurnal. Transformando vidas a través de la tecnología terapéutica.
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
