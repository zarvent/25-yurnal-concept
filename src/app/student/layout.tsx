'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookUser, LayoutDashboard, Library, Lock, Network } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/courses', label: 'Rutas de Aprendizaje', icon: Network },
    { href: '/student/library', label: 'Biblioteca', icon: Library },
    { href: '/student/my-journal', label: 'Mis Notas', icon: BookUser },
];

const pageTitles: { [key: string]: string } = {
    '/student/dashboard': 'Dashboard Académico',
    '/student/articles': 'Artículos de Divulgación',
    '/student/courses': 'Rutas de Aprendizaje',
    '/student/library': 'Biblioteca de Tesis y Papers',
    '/student/my-journal': 'Mis Notas Personales',
    '/student/settings': 'Ajustes',
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

export default function StudentLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal Academic"
            brandName="Yurnal Academic"
            brandHref="/student/dashboard"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
