'use client';

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
 * @param {boolean} isMenuOpen - Estado actual del menú.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsMenuOpen - Función para actualizar el estado del menú.
 * @returns {{ menuRef: React.RefObject<HTMLDivElement>, toggleButtonRef: React.RefObject<HTMLButtonElement> }}
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


// --- ÁTOMOS Y MOLÉCULAS (Componentes de UI Puros) ---

const Logo = () => (
    <Link href="/" className="flex items-center gap-2 shrink-0">
        <svg className="h-8 w-auto text-blue-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>
        <span className="text-xl font-bold text-gray-900">Yurnal</span>
    </Link>
);

const AnimatedBurgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`} d="M4 6h16" />
        <path strokeLinecap="round" strokeLinejoin="round" className={`transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`} d="M4 12h16" />
        <path strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ease-in-out ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`} d="M4 18h16" />
    </svg>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            {children}
        </Link>
    );
};

const ActionButton = ({ href, children, variant = 'link' }: { href: string; children: React.ReactNode; variant?: 'link' | 'button' }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
    const variantClasses = variant === 'button'
        ? 'bg-blue-600 text-white hover:bg-blue-700 h-9 px-4'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 h-9 px-3';
    return <Link href={href} className={`${baseClasses} ${variantClasses}`}>{children}</Link>;
};


// --- ORGANISMOS (Componentes Ensamblados) ---

const DesktopNav = () => (
    <nav className="hidden md:flex items-center gap-4" aria-label="Navegación principal">
        <ul className="flex items-center gap-2">
            {primaryNavLinks.map(link => <li key={link.href}><NavLink href={link.href}>{link.label}</NavLink></li>)}
        </ul>
        <div className="flex items-center gap-2">
            {userActionLinks.map(action => <ActionButton key={action.href} href={action.href} variant={action.type}>{action.label}</ActionButton>)}
        </div>
    </nav>
);

const MobileNav = ({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) => (
    <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <div className="container mx-auto flex flex-col gap-4 p-4">
            <nav aria-label="Navegación principal móvil">
                <ul className="flex flex-col gap-2">
                    {primaryNavLinks.map(link => (
                        <li key={`mobile-${link.href}`}>
                            <Link href={link.href} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <hr />
            <div className="flex flex-col gap-2">
                {userActionLinks.map(action => (
                    <Link key={`mobile-${action.href}`} href={action.href} onClick={closeMenu} className={action.type === 'button' ? 'inline-flex items-center justify-center rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2' : 'block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900'}>
                        {action.label}
                    </Link>
                ))}
            </div>
        </div>
    </div>
);


// --- CONFIGURACIÓN CENTRALIZADA (Single Source of Truth) ---

const primaryNavLinks = [
    { href: '/para-ti', label: 'Para Ti' },
    { href: '/para-terapeutas', label: 'Para Terapeutas' },
    { href: '/para-estudiantes', label: 'Para Estudiantes' },
    { href: '/para-negocios', label: 'Para Negocios' },
    { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

const userActionLinks: { href: string; label: string; type: 'link' | 'button' }[] = [
    { href: '/login', label: 'Iniciar Sesión', type: 'link' },
    { href: '/help', label: 'Ayuda', type: 'link' },
    { href: '/signup', label: 'Prueba Gratis', type: 'button' },
];


// --- COMPONENTE PRINCIPAL (Orquestador) ---

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
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm' : 'bg-white'}`}
        >
            {notification && (
                <div className="bg-blue-600 text-white text-center text-sm py-1.5 px-4">
                    {notification.link ? <Link href={notification.link} className="hover:underline">{notification.text}</Link> : notification.text}
                </div>
            )}

            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Logo />
                <DesktopNav />

                <button
                    ref={toggleButtonRef}
                    className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-controls="mobile-menu-panel"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <AnimatedBurgerIcon isOpen={isMenuOpen} />
                </button>
            </div>

            <MobileNav isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        </header>
    );
};

export default MainHeader;
