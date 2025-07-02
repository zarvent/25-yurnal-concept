'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookHeart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/user-nav';
import type { ReactNode } from 'react';

interface NavItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className: string }>;
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
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href={brandHref} className="flex items-center gap-2 font-semibold">
                        <BookHeart className="h-6 w-6 text-primary" />
                        <span className="">{brandName}</span>
                    </Link>
                </div>
                <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                { 'bg-muted text-primary': pathname.startsWith(item.href) }
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto flex-1" />
                {sidebarFooter}
            </aside>

            <div className="flex flex-col sm:pl-60">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <h1 className="flex-1 text-xl font-semibold">{pageTitle}</h1>
                    <UserNav />
                </header>
                <main className="flex-1 p-4 md:p-8">{children}</main>
                {mainFooter}
            </div>
        </div>
    );
}
