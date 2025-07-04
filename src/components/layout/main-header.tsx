'use client';

import { Button } from '@/components/ui/button';
import { BookHeart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// --- HOOKS PERSONALIZADOS (Lógica Abstraída) ---

/**
 * Hook para detectar la posición del scroll y determinar si el usuario ha hecho scroll hacia abajo.
 * @returns {boolean} `true` si la página ha sido desplazada más de 10px.
 */
const useScrollPosition = (): boolean => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isScrolled;
};

/**
 * Hook que encapsula toda la lógica de interacción para el menú móvil.
 */
const useMobileMenuLogic = (
    isMenuOpen: boolean,
    setIsMenuOpen: (isOpen: boolean) => void
) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    // Cierra el menú con la tecla 'Escape'
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsMenuOpen(false);
        }
    }, [setIsMenuOpen]);

    // Cierra el menú al hacer clic fuera de él
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target as Node) &&
            toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    }, [setIsMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, handleKeyDown, handleClickOutside]);

    return { menuRef, toggleButtonRef };
};

// --- COMPONENTES DE UI TERAPÉUTICOS ---

const TherapeuticLogo = () => (
    <Link href="/" className="flex items-center gap-3 shrink-0 group transition-all duration-200 hover:-translate-y-0.5">
        <div className="relative">
            <BookHeart className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">Yurnal</span>
    </Link>
);

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-6 h-6">
        <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${isOpen ? 'rotate-45 top-2.5' : 'top-1'}`} />
        <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${isOpen ? 'opacity-0' : 'top-2.5'}`} />
        <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${isOpen ? '-rotate-45 top-2.5' : 'top-4'}`} />
    </div>
);

const TherapeuticNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`relative px-4 py-2 rounded-therapeutic text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive
                ? 'text-primary bg-primary/5 shadow-therapeutic-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
        >
            {children}
            {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
            )}
        </Link>
    );
};

// --- ORGANISMOS (Componentes Ensamblados) ---

const DesktopNav = () => (
    <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
        <div className="flex items-center gap-1">
            {primaryNavLinks.map(link => (
                <TherapeuticNavLink key={link.href} href={link.href}>
                    {link.label}
                </TherapeuticNavLink>
            ))}
        </div>
        <div className="flex items-center gap-3 ml-6">
            <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button variant="healing" size="sm" asChild>
                <Link href="/signup">Comenzar Gratis</Link>
            </Button>
        </div>
    </nav>
);

const MobileNav = ({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) => (
    <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-t shadow-therapeutic-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
            }`}
    >
        <div className="container mx-auto flex flex-col gap-6 p-6">
            <nav aria-label="Navegación principal móvil">
                <ul className="flex flex-col gap-2">
                    {primaryNavLinks.map(link => (
                        <li key={`mobile-${link.href}`}>
                            <Link
                                href={link.href}
                                onClick={closeMenu}
                                className="block px-4 py-3 rounded-therapeutic text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t pt-6">
                <div className="flex flex-col gap-3">
                    <Button variant="ghost" size="lg" asChild className="justify-start">
                        <Link href="/login" onClick={closeMenu}>Iniciar Sesión</Link>
                    </Button>
                    <Button variant="healing" size="lg" asChild>
                        <Link href="/signup" onClick={closeMenu}>Comenzar Gratis</Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

// --- CONFIGURACIÓN CENTRALIZADA ---

const primaryNavLinks = [
    { href: '/pacientes', label: 'Pacientes' },
    { href: '/terapeutas', label: 'Terapeutas' },
    { href: '/estudiantes', label: 'Estudiantes' },
    { href: '/empresas', label: 'Empresas' },
];

// --- COMPONENTE PRINCIPAL ---

interface MainHeaderProps {
    notification?: {
        text: string;
        link?: string;
    };
}

const MainHeader = ({ notification }: MainHeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { menuRef, toggleButtonRef } = useMobileMenuLogic(isMenuOpen, setIsMenuOpen);
    const isScrolled = useScrollPosition();

    return (
        <header
            ref={menuRef}
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'bg-background/80 backdrop-blur-md border-b shadow-therapeutic-sm'
                : 'bg-background'
                }`}
        >
            {notification && (
                <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4">
                    {notification.link ? (
                        <Link href={notification.link} className="hover:underline font-medium">
                            {notification.text}
                        </Link>
                    ) : (
                        <span className="font-medium">{notification.text}</span>
                    )}
                </div>
            )}

            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <TherapeuticLogo />
                <DesktopNav />

                <button
                    ref={toggleButtonRef}
                    className="md:hidden flex items-center justify-center p-2 rounded-therapeutic text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-controls="mobile-menu-panel"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <AnimatedMenuIcon isOpen={isMenuOpen} />
                </button>
            </div>

            <MobileNav isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        </header>
    );
};

export default MainHeader;
