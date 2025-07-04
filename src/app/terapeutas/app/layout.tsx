'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, LayoutDashboard, Library, Lock, Users } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/terapeutas/app', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/terapeutas/app/patients', label: 'Pacientes', icon: Users },
    { href: '/terapeutas/app/library', label: 'Biblioteca', icon: Library },
    { href: '/terapeutas/app/schedule', label: 'Agenda', icon: Calendar },
];

const pageTitles: { [key: string]: string } = {
    '/terapeutas/app': 'Dashboard',
    '/terapeutas/app/patients': 'Mis Pacientes',
    '/terapeutas/app/library': 'Biblioteca de Recursos',
    '/terapeutas/app/schedule': 'Mi Agenda',
    '/terapeutas/app/settings': 'Ajustes',
};

const SidebarFooter = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => { setYear(new Date().getFullYear()); }, []);

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
                    <span>Plataforma segura y profesional.</span>
                </div>
            </div>
        </div>
    );
};

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Recurso Profesional:</strong> Esta plataforma es una herramienta de apoyo. En caso de una emergencia de un paciente, guíalo hacia los servicios de emergencia apropiados.
    </footer>
);

export default function TherapistLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Portal de Terapeuta"
            brandName="Yurnal Terapia"
            brandHref="/therapist/dashboard"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
