/**
 * Landing Page Para Pacientes - Experiencia Terapéutica Personalizada
 *
 * Arquitectura de Conversión Específica:
 * - Psychology-first design: Reduce la ansiedad del primer contacto
 * - Trust building: Testimonios, certificaciones, transparencia
 * - Education-focused: Beneficios claros sin tecnicismos
 * - Accessibility: WCAG 2.1 AA para población vulnerable
 * - Privacy emphasis: Seguridad y confidencialidad como prioridad
 *
 * Principios de Terapia Digital:
 * - Empatía: Lenguaje que reconoce el dolor y la esperanza
 * - Autonomía: Herramientas que empoderan, no reemplazan terapia
 * - Beneficencia: Cada elemento debe contribuir al bienestar
 * - No maleficencia: Sin promesas exageradas o falsas esperanzas
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookHeart, Brain, CheckCircle, Heart, Mic, Shield, Users } from 'lucide-react';
import { type Metadata } from 'next';

// Metadata optimizado para búsquedas de pacientes
export const metadata: Metadata = {
    title: 'Para Pacientes - Yurnal | Tu compañero de bienestar mental',
    description: 'Descubre cómo Yurnal puede apoyar tu proceso terapéutico con IA, transcripción de voz y herramientas de autoconocimiento. Seguro, privado y respaldado por profesionales.',
    keywords: [
        'terapia para pacientes',
        'bienestar mental',
        'diario terapéutico',
        'autoconocimiento',
        'salud mental digital',
        'herramientas terapéuticas',
        'apoyo emocional',
        'mindfulness digital'
    ],
    openGraph: {
        title: 'Yurnal para Pacientes - Tu compañero de bienestar mental',
        description: 'Herramientas seguras y privadas para apoyar tu proceso terapéutico y crecimiento personal.',
        type: 'website',
        url: 'https://yurnal.com/pacientes',
    }
};

// Características específicas para pacientes
const PATIENT_FEATURES = [
    {
        icon: BookHeart,
        title: 'Diario Terapéutico Inteligente',
        description: 'Registra tus pensamientos, emociones y experiencias con la ayuda de IA que te ayuda a reflexionar sin juzgar.',
        benefits: ['Autoconocimiento profundo', 'Patrones de pensamiento', 'Progreso visible']
    },
    {
        icon: Mic,
        title: 'Transcripción de Voz',
        description: 'Habla naturalmente y nosotros convertimos tus palabras en texto, respetando tu ritmo y estilo personal.',
        benefits: ['Expresión natural', 'Accesibilidad total', 'Sin barreras técnicas']
    },
    {
        icon: Brain,
        title: 'Insights Personalizados',
        description: 'Recibe reflexiones y preguntas que te ayuden a explorar tus emociones de manera constructiva.',
        benefits: ['Crecimiento guiado', 'Preguntas poderosas', 'Reflexión estructurada']
    },
    {
        icon: Shield,
        title: 'Privacidad Absoluta',
        description: 'Tus datos están encriptados y solo tú tienes acceso. Cumplimos con los más altos estándares de confidencialidad.',
        benefits: ['Cifrado extremo a extremo', 'Control total de datos', 'Sin acceso de terceros']
    }
] as const;

// Testimonios reales (placeholder - reemplazar con testimonios reales)
const TESTIMONIALS = [
    {
        name: 'María G.',
        condition: 'Ansiedad',
        quote: 'Yurnal me ayudó a entender mis patrones de pensamiento. Por primera vez siento que tengo herramientas reales para gestionar mi ansiedad.',
        timeUsing: '6 meses'
    },
    {
        name: 'Carlos R.',
        condition: 'Depresión',
        quote: 'La transcripción de voz fue un cambio total. Puedo expresarme cuando escribir se siente imposible.',
        timeUsing: '1 año'
    },
    {
        name: 'Ana L.',
        condition: 'Duelo',
        quote: 'Las reflexiones de IA me ayudaron a procesar mi pérdida de una manera que no creí posible. Respetuoso y útil.',
        timeUsing: '4 meses'
    }
] as const;

/**
 * Hero Section específico para pacientes
 */
function PatientHero() {
    return (
        <section className="relative px-4 py-20 sm:px-8 lg:px-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="mx-auto max-w-4xl text-center">
                <div className="mb-6 flex justify-center">
                    <Heart className="h-16 w-16 text-pink-500" />
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Tu compañero en el camino del
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> bienestar mental</span>
                </h1>

                <p className="mb-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Yurnal te acompaña en tu proceso terapéutico con herramientas seguras,
                    privadas e inteligentes. No reemplazamos la terapia profesional,
                    la complementamos y fortalecemos.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                        Comenzar mi viaje gratuito
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 py-3">
                        Ver cómo funciona
                    </Button>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    ✓ Gratis para empezar • ✓ Sin compromisos • ✓ Privacidad garantizada
                </p>
            </div>
        </section>
    );
}

/**
 * Sección de características para pacientes
 */
function PatientFeatures() {
    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Herramientas diseñadas para tu bienestar
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Cada característica está pensada para apoyar tu crecimiento personal
                        y complementar tu terapia profesional.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {PATIENT_FEATURES.map(({ icon: Icon, title, description, benefits }) => (
                        <Card key={title} className="border-2 hover:border-blue-200 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <Icon className="h-8 w-8 text-blue-600" />
                                    <CardTitle className="text-xl">{title}</CardTitle>
                                </div>
                                <CardDescription className="text-base">{description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Sección de testimonios
 */
function PatientTestimonials() {
    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16 bg-gray-50">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Historias reales de crecimiento
                    </h2>
                    <p className="text-xl text-gray-600">
                        Descubre cómo otros han encontrado apoyo en su viaje de bienestar mental.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {TESTIMONIALS.map(({ name, condition, quote, timeUsing }) => (
                        <Card key={name} className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">{name}</span>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {timeUsing}
                                        </span>
                                    </div>
                                    <span className="text-sm text-blue-600 font-medium">{condition}</span>
                                </div>
                                <blockquote className="text-gray-700 leading-relaxed">
                                    "{quote}"
                                </blockquote>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Call to Action específico para pacientes
 */
function PatientCTA() {
    return (
        <section className="px-4 py-20 sm:px-8 lg:px-16 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="mx-auto max-w-4xl text-center text-white">
                <h2 className="text-3xl font-bold mb-6">
                    Tu bienestar mental merece las mejores herramientas
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Únete a miles de personas que ya están transformando su relación
                    con su salud mental a través de la tecnología terapéutica.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" variant="secondary" className="px-8 py-3">
                        Registrarme como paciente
                    </Button>
                    <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                        Hablar con un experto
                    </Button>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm opacity-80">
                    <div className="flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>100% Privado</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Respaldado por profesionales</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Diseñado con empatía</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Landing Page Para Pacientes - Página Principal
 */
export default function PacientesPage() {
    return (
        <>
            <PatientHero />
            <PatientFeatures />
            <PatientTestimonials />
            <PatientCTA />
        </>
    );
}
