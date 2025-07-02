'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

/**
 * Therapeutic Button Component - Yurnal Design System v2.0
 *
 * Implements the professional UI/UX guidelines for therapeutic applications:
 * - Calming, confident interactions
 * - Accessibility-first design (WCAG AA compliant)
 * - Optimistic UI patterns
 * - Professional microinteractions
 */

const therapeuticButtonVariants = cva(
    // Base styles following therapeutic design principles
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer',
    {
        variants: {
            variant: {
                // Primary - Azul Sereno para acciones principales
                default: 'bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-primary/90 active:scale-[0.98] active:shadow-elevation-1',

                // Secondary - Verde Menta para acciones positivas
                secondary: 'bg-secondary text-secondary-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-secondary/90 active:scale-[0.98]',

                // Destructive - Rojo Suave para acciones peligrosas (siguiendo guidelines)
                destructive: 'bg-destructive text-destructive-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-destructive/90 active:scale-[0.98]',

                // Outline - Profesional y minimalista
                outline: 'border-2 border-primary bg-transparent text-primary shadow-elevation-1 hover:bg-primary hover:text-primary-foreground hover:shadow-elevation-2 active:scale-[0.98]',

                // Ghost - Para acciones secundarias no intrusivas
                ghost: 'text-foreground hover:bg-muted hover:text-foreground hover:shadow-elevation-1 active:scale-[0.98]',

                // Link - Para navegación sutil
                link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/60',

                // Gradient - Para CTAs premium y acciones especiales
                gradient: 'bg-gradient-to-r from-primary to-secondary text-white shadow-elevation-3 hover:shadow-glow hover:from-primary/90 hover:to-secondary/90 active:scale-[0.98]',

                // Glass - Efecto moderno para overlays y modales
                glass: 'glass text-foreground shadow-elevation-2 hover:shadow-elevation-3 backdrop-blur-md active:scale-[0.98]',

                // Therapeutic - Máximo impacto visual para acciones críticas
                therapeutic: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glow hover:shadow-glow-lg animate-gradient-shift bg-size-200 active:scale-[0.98]',
            },
            size: {
                sm: 'h-8 px-3 text-xs rounded-lg',
                default: 'h-10 px-4 py-2 text-sm rounded-lg',
                lg: 'h-12 px-6 text-base rounded-xl',
                xl: 'h-14 px-8 text-lg rounded-xl',
                icon: 'h-10 w-10 rounded-lg',
                'icon-sm': 'h-8 w-8 rounded-md',
                'icon-lg': 'h-12 w-12 rounded-xl',
            },
            animation: {
                none: '',
                // Gentle pulse for loading or waiting states
                pulse: 'animate-gentle-pulse',
                // Soft bounce for success states
                bounce: 'animate-soft-bounce',
                // Professional shimmer for premium features
                shimmer: 'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent overflow-hidden',
                // Float for hero CTAs
                float: 'animate-float-gentle',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            animation: 'none',
        },
    }
);

// Background size utility class for gradient animations
const bgSizeUtility = 'bg-size-200';

export interface TherapeuticButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof therapeuticButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    optimistic?: boolean; // For optimistic UI updates
}

const TherapeuticButton = React.forwardRef<HTMLButtonElement, TherapeuticButtonProps>(
    (
        {
            className,
            variant,
            size,
            animation,
            asChild = false,
            loading = false,
            loadingText,
            leftIcon,
            rightIcon,
            optimistic = false,
            children,
            disabled,
            onClick,
            ...props
        },
        ref
    ) => {
        const [isOptimisticState, setIsOptimisticState] = React.useState(false);

        // Optimistic UI handler following UX guidelines
        const handleOptimisticClick = React.useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                if (optimistic && !disabled && !loading) {
                    setIsOptimisticState(true);
                    // Reset optimistic state after a delay
                    setTimeout(() => setIsOptimisticState(false), 2000);
                }
                onClick?.(event);
            },
            [optimistic, disabled, loading, onClick]
        );

        const Comp = asChild ? Slot : 'button';
        const isDisabled = disabled || loading;
        const showLoading = loading || (optimistic && isOptimisticState);

        // Add gradient background utility for therapeutic variant
        const gradientClasses = variant === 'therapeutic' ? bgSizeUtility : '';

        return (
            <Comp
                className={cn(
                    therapeuticButtonVariants({ variant, size, animation }),
                    gradientClasses,
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                onClick={handleOptimisticClick}
                aria-describedby={loading ? 'button-loading' : undefined}
                {...props}
            >
                {/* Loading state with accessible loading text */}
                {showLoading && (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span className="sr-only" id="button-loading">
                            {loadingText || 'Cargando...'}
                        </span>
                    </>
                )}

                {/* Left icon when not loading */}
                {!showLoading && leftIcon && (
                    <span className="flex-shrink-0" aria-hidden="true">
                        {leftIcon}
                    </span>
                )}

                {/* Button content */}
                <span className={showLoading ? 'sr-only' : ''}>
                    {showLoading ? (loadingText || 'Cargando...') : children}
                </span>

                {/* Right icon when not loading */}
                {!showLoading && rightIcon && (
                    <span className="flex-shrink-0" aria-hidden="true">
                        {rightIcon}
                    </span>
                )}
            </Comp>
        );
    }
);

TherapeuticButton.displayName = 'TherapeuticButton';

export { TherapeuticButton, therapeuticButtonVariants };
