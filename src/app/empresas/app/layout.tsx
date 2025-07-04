'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart3, LayoutDashboard, Lock, Settings, UserCheck, Users } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const navItems = [
    { href: '/empresas/app', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/empresas/app/empleados', label: 'Empleados', icon: Users },
    { href: '/empresas/app/programas', label: 'Programas', icon: UserCheck },
    { href: '/empresas/app/reportes', label: 'Reportes', icon: BarChart3 },
    { href: '/empresas/app/configuracion', label: 'Configuración', icon: Settings },
];

const pageTitles: { [key: string]: string } = {
    '/empresas/app': 'Dashboard Corporativo',
    '/empresas/app/empleados': 'Gestión de Empleados',
    '/empresas/app/programas': 'Programas de Bienestar',
    '/empresas/app/reportes': 'Reportes y Análisis',
    '/empresas/app/configuracion': 'Configuración Empresarial',
    '/empresas/app/settings': 'Ajustes',
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
                    <span>Potenciando el bienestar corporativo y la productividad.</span>
                </div>
            </div>
        </div>
    );
}

const MainFooter = () => (
    <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
        <strong>Yurnal Empresas:</strong> Una plataforma integral para el bienestar corporativo y la gestión del talento humano. Combina herramientas de análisis organizacional con programas de bienestar. Complementa pero no reemplaza el apoyo profesional especializado.
    </footer>
);

export default function EmpresasLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout
            navItems={navItems}
            pageTitles={pageTitles}
            defaultTitle="Yurnal Empresas"
            brandName="Yurnal Empresas"
            brandHref="/empresas/app"
            sidebarFooter={<SidebarFooter />}
            mainFooter={<MainFooter />}
        >
            {children}
        </DashboardLayout>
    );
}
