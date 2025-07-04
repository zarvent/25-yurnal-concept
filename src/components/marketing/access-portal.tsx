'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

interface AccessPortalProps {
    ecosystem: 'patient' | 'therapist' | 'academic' | 'student' | 'business';
    title: string;
    description: string;
    appLink: string;
    demoLink?: string;
    supportItems: Array<{
        icon: React.ReactNode;
        title: string;
        description: string;
    }>;
}

export function AccessPortal({
    ecosystem,
    title,
    description,
    appLink,
    demoLink,
    supportItems
}: AccessPortalProps) {
    const ecosystemVariants = {
        patient: 'patient',
        therapist: 'therapist',
        academic: 'academic',
        student: 'student',
        business: 'warm'
    } as const;

    return (
        <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-therapeutic-h2 font-bold text-foreground mb-4">
                            {title}
                        </h2>
                        <p className="text-therapeutic-body text-muted-foreground max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Main Access Card */}
                    <Card className="mb-12 overflow-hidden shadow-therapeutic-xl">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                            <CardTitle className="text-center text-2xl">
                                Acceso a tu Espacio Personal
                            </CardTitle>
                            <CardDescription className="text-center text-therapeutic-body">
                                Inicia sesión o regístrate para acceder a todas las herramientas especializadas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    variant={ecosystemVariants[ecosystem]}
                                    className="min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <Link href={appLink}>
                                        Acceder a la App
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>

                                {demoLink && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="min-w-[200px]"
                                    >
                                        <Link href={demoLink}>
                                            Ver Demo Interactivo
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Grid */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {supportItems.map((item, index) => (
                            <Card key={index} className="text-center hover:shadow-therapeutic-md transition-shadow duration-200">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
                                        {item.icon}
                                    </div>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Security Badge */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-healing/10 px-4 py-2 text-sm font-medium text-healing">
                            <Lock className="h-4 w-4" />
                            Datos protegidos con encriptación de grado bancario
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
