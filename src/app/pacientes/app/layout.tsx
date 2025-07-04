'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, BookUser, LayoutDashboard, Library, Lock, Network, Newspaper, Pencil, Wrench } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/pacientes/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pacientes/app/today', label: 'Hoy', icon: Pencil },
    { href: '/pacientes/app/notes', label: 'Notas', icon: BookOpen },
    { href: '/pacientes/app/my-journal', label: 'Mi Diario', icon: BookUser },
    { href: '/pacientes/app/articles', label: 'Artículos', icon: Newspaper },
    { href: '/pacientes/app/library', label: 'Biblioteca', icon: Library },
    { href: '/pacientes/app/courses', label: 'Rutas de Aprendizaje', icon: Network },
    { href: '/pacientes/app/reflections', label: 'Reflexiones', icon: Wrench },
];

const pageTitles: { [key: string]: string } = {
    '/pacientes/app/dashboard': 'Dashboard Personal',
    '/pacientes/app/today': 'Hoy',
    '/pacientes/app/notes': 'Notas',
    '/pacientes/app/my-journal': 'Mi Diario Personal',
    '/pacientes/app/articles': 'Artículos de Apoyo',
    '/pacientes/app/library': 'Biblioteca de Recursos',
    '/pacientes/app/courses': 'Rutas de Bienestar',
    '/pacientes/app/reflections': 'Análisis de Patrones',
    '/pacientes/app/my-therapist': 'Mi Terapeuta',
    '/pacientes/app/settings': 'Ajustes',
};

const SidebarFooter = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <div>
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
                    <span>Potenciando el bienestar y la salud mental.</span>
                </div>
            </div>
        </div>
    );
}

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Yurnal Pacientes:</strong> Una plataforma integral para el bienestar mental y emocional. Combina herramientas de autoconocimiento con recursos terapéuticos. No reemplaza la terapia profesional.
    </footer>
);

export default function PacientesLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal Pacientes"
            brandName="Yurnal Pacientes"
            brandHref="/pacientes/app/dashboard"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
