'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        label: string;
        isPositive?: boolean;
    };
    className?: string;
    variant?: 'default' | 'gradient' | 'minimal';
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    className,
    variant = 'default'
}: StatsCardProps) {
    const variants = {
        default: 'bg-card border shadow-sm hover:shadow-md',
        gradient: 'bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-md hover:shadow-lg',
        minimal: 'bg-transparent border-0 shadow-none hover:bg-muted/50',
    };

    return (
        <Card className={cn(
            'transition-all duration-300 hover:scale-105 cursor-default',
            variants[variant],
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {Icon && (
                    <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold mb-1">{value}</div>

                {description && (
                    <p className="text-xs text-muted-foreground mb-2">
                        {description}
                    </p>
                )}

                {trend && (
                    <div className="flex items-center text-xs">
                        <span className={cn(
                            'font-medium',
                            trend.isPositive === false ? 'text-destructive' : 'text-success'
                        )}>
                            {trend.isPositive !== false ? '+' : ''}{trend.value}%
                        </span>
                        <span className="text-muted-foreground ml-1">
                            {trend.label}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface StatsGridProps {
    children: React.ReactNode;
    className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
    return (
        <div className={cn(
            'grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
            className
        )}>
            {children}
        </div>
    );
}
