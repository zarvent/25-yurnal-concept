'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, BookUser, LayoutDashboard, Library, Lock, Network, Newspaper, Pencil, Wrench } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/estudiantes/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/estudiantes/today', label: 'Hoy', icon: Pencil },
    { href: '/estudiantes/notes', label: 'Notas', icon: BookOpen },
    { href: '/estudiantes/my-journal', label: 'Mi Diario', icon: BookUser },
    { href: '/estudiantes/articles', label: 'Artículos', icon: Newspaper },
    { href: '/estudiantes/library', label: 'Biblioteca', icon: Library },
    { href: '/estudiantes/courses', label: 'Rutas de Aprendizaje', icon: Network },
    { href: '/estudiantes/reflections', label: 'Reflexiones', icon: Wrench },
];

const pageTitles: { [key: string]: string } = {
    '/estudiantes/dashboard': 'Dashboard Académico',
    '/estudiantes/today': 'Hoy',
    '/estudiantes/notes': 'Notas',
    '/estudiantes/my-journal': 'Mi Diario Personal',
    '/estudiantes/articles': 'Artículos de Divulgación',
    '/estudiantes/library': 'Biblioteca de Tesis y Papers',
    '/estudiantes/courses': 'Rutas de Aprendizaje',
    '/estudiantes/reflections': 'Análisis de Patrones',
    '/estudiantes/my-therapist': 'Mi Terapeuta',
    '/estudiantes/settings': 'Ajustes',
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
                    <span>Potenciando el conocimiento y el bienestar estudiantil.</span>
                </div>
            </div>
        </div>
    );
}

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Yurnal Estudiantes:</strong> Una plataforma integral para el aprendizaje, la reflexión y el bienestar estudiantil. Combina herramientas académicas con recursos de autoconocimiento. No reemplaza la terapia profesional.
    </footer>
);

export default function EstudiantesLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal Estudiantes"
            brandName="Yurnal Estudiantes"
            brandHref="/estudiantes/dashboard"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
