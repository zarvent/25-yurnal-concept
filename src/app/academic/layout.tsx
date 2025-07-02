'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { LayoutDashboard, Network, Library, BookUser, Lock, Newspaper } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const navItems = [
  { href: '/academic/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/academic/articles', label: 'Artículos', icon: Newspaper },
  { href: '/academic/library', label: 'Biblioteca', icon: Library },
  { href: '/academic/courses', label: 'Rutas de Aprendizaje', icon: Network },
  { href: '/academic/my-journal', label: 'Mi Diario', icon: BookUser },
];

const pageTitles: { [key: string]: string } = {
  '/academic/dashboard': 'Dashboard Académico',
  '/academic/articles': 'Artículos de Divulgación',
  '/academic/library': 'Biblioteca de Tesis y Papers',
  '/academic/courses': 'Rutas de Aprendizaje',
  '/academic/my-journal': 'Mi Diario Personal',
  '/academic/settings': 'Ajustes',
};

const SidebarFooter = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => { setYear(new Date().getFullYear()); }, []);

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
                    <span>Potenciando el conocimiento en psicología.</span>
                </div>
            </div>
        </>
    );
};

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Recurso Educativo:</strong> La información aquí presentada es para fines educativos y no debe ser usada para autodiagnóstico. Si necesitas apoyo, busca a un profesional de la salud mental calificado.
    </footer>
);

export default function AcademicLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal Academic"
            brandName="Yurnal Academic"
            brandHref="/academic/dashboard"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
