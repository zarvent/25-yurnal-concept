'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { cn } from '@/lib/utils';
import { BookHeart, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
    endContent?: React.ReactNode;
    items?: NavItem[];
}

interface DashboardLayoutProps {
    navItems: NavItem[];
    pageTitles: { [key: string]: string };
    defaultTitle: string;
    brandName: string;
    brandHref: string;
    sidebarFooter: ReactNode;
    mainFooter: ReactNode;
    children: ReactNode;
}

export function DashboardLayout({
    navItems,
    pageTitles,
    defaultTitle,
    brandName,
    brandHref,
    sidebarFooter,
    mainFooter,
    children
}: DashboardLayoutProps) {
    const pathname = usePathname();

    const getPageTitle = () => {
        // Find the most specific matching key for the current path to handle nested routes correctly.
        const matchingKey = Object.keys(pageTitles)
            .filter(key => pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0];

        return pageTitles[matchingKey] || defaultTitle;
    };

    const pageTitle = getPageTitle();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <Sidebar variant="sidebar" className="border-r-0 shadow-lg">
                    <SidebarHeader className="border-b bg-card/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <Link href={brandHref} className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <BookHeart className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg leading-none">{brandName}</span>
                                    <span className="text-xs text-muted-foreground font-medium">Wellness Platform</span>
                                </div>
                            </Link>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="px-2 py-4">
                        <SidebarMenu>
                            {navItems.map((item, index) => {
                                const isActive = pathname.startsWith(item.href);
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={cn(
                                                "h-12 text-base font-medium transition-all duration-300 rounded-xl mb-1",
                                                "hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                                                "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
                                                "data-[active=true]:shadow-md data-[active=true]:glow"
                                            )}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 px-4">
                                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="border-t bg-card/30 backdrop-blur-sm">
                        {sidebarFooter}
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex flex-col">
                    {/* Enhanced Header */}
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-card/80 backdrop-blur-md px-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-primary/10 transition-colors" />
                            <SidebarSeparator orientation="vertical" className="h-6" />
                        </div>

                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold leading-none">{pageTitle}</h1>
                                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                                    {new Date().toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <UserNav />
                            </div>
                        </div>
                    </header>

                    {/* Enhanced Main Content */}
                    <main className="flex-1 overflow-auto bg-muted/20">
                        <div className="p-6 lg:p-8">
                            <div className="mx-auto max-w-screen-2xl animate-fade-in-up">
                                {children}
                            </div>
                        </div>
                        {mainFooter}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
