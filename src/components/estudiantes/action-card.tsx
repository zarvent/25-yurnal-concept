'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ActionCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
    linkText: string;
}

export function ActionCard({ icon, title, description, link, linkText }: ActionCardProps) {
    return (
        <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    <span>{title}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild variant="secondary" className="w-full sm:w-auto">
                    <Link href={link}>
                        {linkText} <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
