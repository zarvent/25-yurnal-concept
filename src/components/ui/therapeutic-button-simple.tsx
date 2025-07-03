'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

/**
 * Therapeutic Button Component - Yurnal Design System v2.0
 * Simplified version with direct props to avoid VariantProps issues
 */

interface TherapeuticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'gradient' | 'glass' | 'therapeutic';
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
    animation?: 'none' | 'pulse' | 'bounce' | 'shimmer' | 'float';
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    optimistic?: boolean;
}

const TherapeuticButton = React.forwardRef<HTMLButtonElement, TherapeuticButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            animation = 'none',
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

        // Optimistic UI handler
        const handleOptimisticClick = React.useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                if (optimistic && !disabled && !loading) {
                    setIsOptimisticState(true);
                    setTimeout(() => setIsOptimisticState(false), 2000);
                }
                onClick?.(event);
            },
            [optimistic, disabled, loading, onClick]
        );

        const isDisabled = disabled || loading;
        const showLoading = loading || (optimistic && isOptimisticState);

        // Base styles
        const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer';

        // Variant styles
        const variantStyles = {
            default: 'bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-primary/90 active:scale-[0.98]',
            secondary: 'bg-secondary text-secondary-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-secondary/90 active:scale-[0.98]',
            destructive: 'bg-destructive text-destructive-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:bg-destructive/90 active:scale-[0.98]',
            outline: 'border-2 border-primary bg-transparent text-primary shadow-elevation-1 hover:bg-primary hover:text-primary-foreground hover:shadow-elevation-2 active:scale-[0.98]',
            ghost: 'text-foreground hover:bg-muted hover:text-foreground hover:shadow-elevation-1 active:scale-[0.98]',
            link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/60',
            gradient: 'bg-gradient-to-r from-primary to-secondary text-white shadow-elevation-3 hover:shadow-glow hover:from-primary/90 hover:to-secondary/90 active:scale-[0.98]',
            glass: 'glass text-foreground shadow-elevation-2 hover:shadow-elevation-3 backdrop-blur-md active:scale-[0.98]',
            therapeutic: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glow hover:shadow-glow-lg bg-size-200 animate-gradient-shift active:scale-[0.98]',
        };

        // Size styles
        const sizeStyles = {
            sm: 'h-8 px-3 text-xs rounded-lg',
            default: 'h-10 px-4 py-2 text-sm rounded-lg',
            lg: 'h-12 px-6 text-base rounded-xl',
            xl: 'h-14 px-8 text-lg rounded-xl',
            icon: 'h-10 w-10 rounded-lg',
            'icon-sm': 'h-8 w-8 rounded-md',
            'icon-lg': 'h-12 w-12 rounded-xl',
        };

        // Animation styles
        const animationStyles = {
            none: '',
            pulse: 'animate-gentle-pulse',
            bounce: 'animate-soft-bounce',
            shimmer: 'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent overflow-hidden',
            float: 'animate-float-gentle',
        };

        return (
            <button
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    animationStyles[animation],
                    className
                )}
                ref={ref}
                disabled={isDisabled}
                onClick={handleOptimisticClick}
                aria-describedby={loading ? 'button-loading' : undefined}
                {...props}
            >
                {/* Loading state */}
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
            </button>
        );
    }
);

TherapeuticButton.displayName = 'TherapeuticButton';

export { TherapeuticButton };
