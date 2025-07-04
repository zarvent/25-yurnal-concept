import { AccessPortal } from '@/components/marketing/access-portal';
import { EcosystemHero } from '@/components/marketing/ecosystem-hero';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import {
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  Shield,
  Smartphone,
  Stethoscope,
  TrendingUp,
  UserCheck,
  Users
} from 'lucide-react';

export default function TherapistLandingPage() {
  const heroData = {
    ecosystem: 'therapist' as const,
    title: 'Herramientas Profesionales',
    subtitle: 'Para Terapeutas Modernos',
    description: 'Plataforma integral que potencia tu práctica terapéutica con insights de IA, seguimiento de pacientes y herramientas de gestión clínica.',
    ctaText: 'Explorar Herramientas',
    ctaLink: '/therapist/dashboard',
    features: ['Gestión de Pacientes', 'Análisis Clínico', 'Reportes Automatizados'],
    backgroundGradient: 'bg-gradient-to-br from-therapist via-therapist/90 to-primary',
    icon: <Stethoscope className="h-10 w-10 text-white" />
  };

  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Gestión Integral de Pacientes',
      description: 'Dashboard centralizado para monitorear el progreso de todos tus pacientes de forma eficiente y segura.',
      benefits: [
        'Vista panorámica del progreso de pacientes',
        'Alertas automáticas de crisis o regresión',
        'Historial clínico digital completo',
        'Integración con sistemas EHR existentes'
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: 'Análisis Clínico Avanzado',
      description: 'IA especializada analiza las entradas de tus pacientes para generar insights clínicos objetivos.',
      benefits: [
        'Análisis de sentimientos y patrones emocionales',
        'Detección temprana de signos de deterioro',
        'Sugerencias de intervenciones basadas en evidencia',
        'Métricas de outcome automatizadas'
      ]
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: 'Documentación Automatizada',
      description: 'Genera notas de progreso, reportes y documentación clínica de forma automática y precisa.',
      benefits: [
        'Notas SOAP generadas automáticamente',
        'Reportes de progreso personalizables',
        'Documentación para seguros médicos',
        'Plantillas clínicas estandarizadas'
      ]
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: 'Planificación de Tratamiento',
      description: 'Herramientas para diseñar, implementar y ajustar planes de tratamiento personalizados.',
      benefits: [
        'Templates de planes de tratamiento',
        'Seguimiento de objetivos terapéuticos',
        'Asignación de tareas entre sesiones',
        'Colaboración con otros profesionales'
      ]
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: 'Métricas de Práctica',
      description: 'Analiza la efectividad de tus intervenciones y optimiza tu práctica profesional.',
      benefits: [
        'KPIs de efectividad terapéutica',
        'Análisis de outcomes por modalidad',
        'Benchmarking con estándares de la industria',
        'Reportes para supervisión clínica'
      ]
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: 'Comunicación Segura',
      description: 'Plataforma HIPAA-compliant para comunicación segura con pacientes y colegas.',
      benefits: [
        'Mensajería cifrada extremo a extremo',
        'Videollamadas seguras integradas',
        'Compartir recursos terapéuticos',
        'Consultas entre profesionales'
      ]
    }
  ];

  const accessPortalData = {
    ecosystem: 'therapist' as const,
    title: 'Eleva tu Práctica Terapéutica',
    description: 'Únete a cientos de terapeutas que están mejorando sus outcomes clínicos con Yurnal Professional.',
    appLink: '/therapist/dashboard',
    demoLink: '/demo/therapist',
    supportItems: [
      {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: 'HIPAA Compliant',
        description: 'Cumplimiento total con regulaciones de privacidad y seguridad en salud mental.'
      },
      {
        icon: <UserCheck className="h-6 w-6 text-primary" />,
        title: 'Capacitación Incluida',
        description: 'Onboarding completo y capacitación continua para maximizar el valor de la plataforma.'
      },
      {
        icon: <Smartphone className="h-6 w-6 text-primary" />,
        title: 'Acceso Móvil',
        description: 'Revisa el progreso de tus pacientes y recibe alertas desde cualquier dispositivo.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <EcosystemHero {...heroData} />

      <FeatureShowcase
        ecosystem="therapist"
        title="Tecnología que Potencia tu Expertise Clínico"
        subtitle="Herramientas diseñadas por y para profesionales de la salud mental, respaldadas por investigación y mejores prácticas."
        features={features}
      />

      <AccessPortal {...accessPortalData} />

      {/* Professional Credentials Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Respaldado por la Comunidad Clínica
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground">Terapeutas Activos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <p className="text-sm text-muted-foreground">Mejora en Outcomes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">40h</div>
                <p className="text-sm text-muted-foreground">Ahorro Mensual</p>
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
