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
        default: 'bg-white border border-neutral-light shadow-sm hover:shadow-lg rounded-xl',
        gradient: 'bg-gradient-to-br from-primary/5 to-accent-calm/5 border-0 shadow-md hover:shadow-lg rounded-xl',
        minimal: 'bg-transparent border-0 shadow-none hover:bg-neutral-light rounded-xl',
    };

    return (
        <Card className={cn(
            'transition-all duration-300 hover:scale-105 cursor-default',
            variants[variant],
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                <CardTitle className="text-neutral-medium text-sm font-medium">
                    {title}
                </CardTitle>
                {Icon && (
                    <div className="rounded-xl bg-secondary p-3 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6">
                <div className="h2 font-bold mb-1 text-neutral-dark">
                    {value}
                </div>
                {description && (
                    <p className="caption text-neutral-medium mb-2">
                        {description}
                    </p>
                )}
                {trend && (
                    <div className="flex items-center caption">
                        <span className={cn(
                            'font-medium',
                            trend.isPositive === false ? 'text-semantic-danger' : 'text-accent-calm'
                        )}>
                            {trend.isPositive !== false ? '+' : ''}{trend.value}%
                        </span>
                        <span className="text-neutral-medium ml-1">
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
