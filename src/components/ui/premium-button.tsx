'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'gradient' | 'glass' | 'outline' | 'ghost';
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon';
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({
        className,
        variant = 'default',
        size = 'default',
        loading = false,
        loadingText,
        leftIcon,
        rightIcon,
        children,
        disabled,
        ...props
    }, ref) => {

        const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden';

        const variants = {
            default: 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95',
            gradient: 'bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg hover:scale-105',
            glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-foreground shadow-md hover:shadow-lg',
            outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md',
            ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            default: 'h-10 px-4 py-2 text-sm',
            lg: 'h-12 px-8 text-base',
            xl: 'h-14 px-10 text-lg',
            icon: 'h-10 w-10',
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {!loading && leftIcon && leftIcon}
                {loading ? (loadingText || 'Cargando...') : children}
                {!loading && rightIcon && rightIcon}
            </button>
        );
    }
);

PremiumButton.displayName = 'PremiumButton';

export { PremiumButton };

