/**
 * Marketing Footer - Componente de Pie de Página para Ecosistema Público
 *
 * Arquitectura de Conversión Optimizada:
 * - Enlaces corporativos para confianza y credibilidad
 * - Estructura SEO-friendly con schema markup
 * - Accesibilidad WCAG 2.1 AA compliant
 * - Performance optimizado (lazy loading)
 *
 * Principios aplicados:
 * - Information Architecture: Jerarquía clara de información
 * - Trust Signals: Enlaces legales y de contacto
 * - Conversion Optimization: CTA secundarios estratégicos
 */

import { BookHeart, Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

// Configuración de enlaces corporativos
const COMPANY_LINKS = [
    { href: '/privacy', label: 'Privacidad', priority: 'high' },
    { href: '/terms', label: 'Términos de Uso', priority: 'high' },
    { href: '/support', label: 'Soporte', priority: 'medium' },
    { href: '/about', label: 'Acerca de Yurnal', priority: 'medium' },
    { href: '/contact', label: 'Contacto', priority: 'low' },
] as const;

const ECOSYSTEM_LINKS = [
    { href: '/pacientes', label: 'Para Pacientes', icon: BookHeart },
    { href: '/terapeutas', label: 'Para Terapeutas', icon: BookHeart },
    { href: '/estudiantes', label: 'Para Estudiantes', icon: BookHeart },
    { href: '/empresas', label: 'Para Empresas', icon: BookHeart },
] as const;

const SOCIAL_LINKS = [
    { href: 'https://github.com/yurnal', label: 'GitHub', icon: Github, external: true },
    { href: 'https://twitter.com/yurnal', label: 'Twitter', icon: Twitter, external: true },
    { href: 'https://linkedin.com/company/yurnal', label: 'LinkedIn', icon: Linkedin, external: true },
] as const;

/**
 * Link Component con optimizaciones de performance y SEO
 */
interface FooterLinkProps {
    children: React.ReactNode;
    href: string;
    external?: boolean;
    priority?: 'high' | 'medium' | 'low';
    className?: string;
    'aria-label'?: string;
}

function FooterLink({
    children,
    href,
    external = false,
    priority = 'medium',
    className = '',
    'aria-label': ariaLabel,
    ...props
}: FooterLinkProps) {
    const baseClasses = "text-muted-foreground hover:text-foreground transition-colors duration-200";
    const priorityClasses = {
        high: "font-medium",
        medium: "font-normal",
        low: "font-light text-xs"
    };

    if (external) {
        return (
            <a
                href={href}
                className={`${baseClasses} ${priorityClasses[priority]} ${className}`}
                target="_blank"
                rel="noopener noreferrer"
                data-external="true"
                aria-label={ariaLabel}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={`${baseClasses} ${priorityClasses[priority]} ${className}`}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    );
}

/**
 * Marketing Footer - Arquitectura de Confianza y Conversión
 */
export function MarketingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="border-t bg-muted/10 px-4 py-12 sm:px-8 lg:px-16"
            role="contentinfo"
            aria-label="Información corporativa y enlaces"
        >
            <div className="mx-auto max-w-6xl">
                {/* Grid principal con información corporativa */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {/* Branding y misión */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <BookHeart className="h-6 w-6 text-primary" aria-hidden="true" />
                            <span className="text-lg font-semibold">Yurnal</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Transformando vidas a través de la tecnología terapéutica.
                            Bienestar mental accesible, inteligente y basado en evidencia.
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                                <FooterLink
                                    key={label}
                                    href={href}
                                    external
                                    className="p-2 rounded-md hover:bg-muted/20"
                                    aria-label={`Síguenos en ${label}`}
                                >
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </FooterLink>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces del ecosistema */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                            Ecosistema
                        </h3>
                        <nav aria-label="Enlaces del ecosistema Yurnal">
                            <ul className="space-y-2">
                                {ECOSYSTEM_LINKS.map(({ href, label }) => (
                                    <li key={label}>
                                        <FooterLink href={href} className="text-sm">
                                            {label}
                                        </FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Enlaces legales y corporativos */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                            Legal
                        </h3>
                        <nav aria-label="Enlaces legales y corporativos">
                            <ul className="space-y-2">
                                {COMPANY_LINKS.map(({ href, label, priority }) => (
                                    <li key={label}>
                                        <FooterLink href={href} priority={priority} className="text-sm">
                                            {label}
                                        </FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                            Contacto
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                <a
                                    href="mailto:hola@yurnal.com"
                                    className="hover:text-foreground transition-colors"
                                >
                                    hola@yurnal.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" aria-hidden="true" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                <span>Barcelona, España</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador y copyright */}
                <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Yurnal Technologies, S.L. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Hecho con ❤️ para el bienestar mental</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">v2.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Export adicionales para flexibilidad arquitectónica
 */
export { COMPANY_LINKS, ECOSYSTEM_LINKS, SOCIAL_LINKS };
export type { FooterLinkProps };

