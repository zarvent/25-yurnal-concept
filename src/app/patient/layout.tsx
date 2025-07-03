'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, Lock, Pencil, Wrench } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/patient/today', label: 'Hoy', icon: Pencil },
    { href: '/patient/notes', label: 'Notas', icon: BookOpen },
    { href: '/patient/reflections', label: 'Reflexiones', icon: Wrench },
];

const pageTitles: { [key: string]: string } = {
    '/patient/today': 'Hoy',
    '/patient/notes': 'Notas',
    '/patient/reflections': 'Análisis de Patrones',
    '/patient/my-therapist': 'Mi Terapeuta',
    '/patient/settings': 'Ajustes',
};

const SidebarFooter = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <div className="p-4 text-center text-xs text-muted-foreground">
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className='cursor-default'>© {year} Zarvent Labs</button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center" className="max-w-xs text-center bg-background text-foreground border-border">
                            <p className="text-sm font-bold">Un proyecto de Zarvent Labs</p>
                            <p className="text-xs">Bajo la visión de Cesar Sebastian Zambrana Ventura</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Separator className='mx-4' />
            <div className="p-4">
                <div className="flex items-center justify-center text-center text-xs text-muted-foreground">
                    <Lock className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Encriptación de Extremo a Extremo. Ni nosotros podemos leer tus notas.</span>
                </div>
            </div>
        </>
    );
}

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Nota Importante:</strong> Yurnal es una herramienta de autoconocimiento y no reemplaza la terapia profesional. Si te encuentras en una crisis de salud mental, por favor, no estás solo. Contacta a la línea de prevención de suicidio de tu país o busca ayuda de emergencia. En Bolivia, puedes llamar a la línea gratuita de ayuda del SEDES (168).
    </footer>
);

export default function PatientLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal"
            brandName="Yurnal"
            brandHref="/patient/today"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
