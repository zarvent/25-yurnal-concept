'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

// Base Block component for Notion/Obsidian style
export type BlockType = 'heading' | 'paragraph' | 'callout' | 'toggle' | 'code';

interface BlockProps {
    type: BlockType;
    children: React.ReactNode;
    className?: string;
}

export function Block({ type, children, className }: BlockProps) {
    const base = 'w-full my-4';
    const variants: Record<BlockType, string> = {
        heading: 'text-therapeutic-h2 font-bold',
        paragraph: 'text-therapeutic-body',
        callout: 'bg-primary-light border-l-4 border-primary p-4 rounded-lg',
        toggle: 'cursor-pointer select-none',
        code: 'bg-muted p-4 rounded-md font-mono text-sm overflow-auto',
    };

    return (
        <div className={cn(base, variants[type], className)}>
            {children}
        </div>
    );
}
