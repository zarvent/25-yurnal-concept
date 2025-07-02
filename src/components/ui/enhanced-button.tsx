'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const enhancedButtonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95',
                destructive: 'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg',
                outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md',
                ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm',
                link: 'text-primary underline-offset-4 hover:underline',
                gradient: 'bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg hover:scale-105 glow',
                glass: 'glass text-foreground shadow-md hover:shadow-lg backdrop-blur-md',
                premium: 'bg-gradient-to-r from-primary via-primary-light to-accent text-white shadow-lg hover:shadow-xl hover:scale-105 glow-accent animate-gradient-shift bg-size-200',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 rounded-lg px-3 text-xs',
                lg: 'h-12 rounded-xl px-8 text-base',
                xl: 'h-14 rounded-2xl px-10 text-lg',
                icon: 'h-10 w-10',
            },
            animation: {
                none: '',
                pulse: 'animate-pulse-glow',
                float: 'animate-float',
                shimmer: 'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            animation: 'none',
        },
    }
);

export interface EnhancedButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
    ({
        className,
        variant,
        size,
        animation,
        asChild = false,
        loading = false,
        loadingText,
        leftIcon,
        rightIcon,
        children,
        disabled,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className={cn(enhancedButtonVariants({ variant, size, animation, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {!loading && leftIcon && leftIcon}
                {loading ? (loadingText || 'Cargando...') : children}
                {!loading && rightIcon && rightIcon}
            </Comp>
        );
    }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, enhancedButtonVariants };

