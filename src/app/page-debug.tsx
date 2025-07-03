import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { StatsCard } from '@/components/ui/stats-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PartyPopper } from 'lucide-react';

export default function DebugPage() {
    return (
        <div className="min-h-screen bg-neutral-light p-8">
            <h1 className="h1 mb-6">Debug UI Kit</h1>
            <section className="mb-10">
                <h2 className="h2 mb-4">Botones</h2>
                <div className="flex gap-4 flex-wrap">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </section>
            <section className="mb-10">
                <h2 className="h2 mb-4">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Descripción de la tarjeta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="body">Contenido de la tarjeta. Usa la tipografía body y el nuevo sistema de espaciado.</p>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Acción</Button>
                        </CardFooter>
                    </Card>
                    <StatsCard title="Progreso" value={85} description="Completado" icon={PartyPopper} trend={{ value: 12, label: 'vs mes anterior', isPositive: true }} />
                    <StatsCard title="Alertas" value={2} description="Críticas" icon={PartyPopper} trend={{ value: -1, label: 'vs semana pasada', isPositive: false }} />
                </div>
            </section>
            <section className="mb-10">
                <h2 className="h2 mb-4">Skeletons</h2>
                <div className="flex gap-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>
            </section>
            <section className="mb-10">
                <h2 className="h2 mb-4">Inputs</h2>
                <div className="flex gap-4">
                    <Input placeholder="Input normal" />
                    <Input placeholder="Input deshabilitado" disabled />
                </div>
            </section>
            <section className="mb-10">
                <h2 className="h2 mb-4">Tooltips</h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>Este es un tooltip de ejemplo</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </section>
            <section className="mb-10">
                <h2 className="h2 mb-4">Tipografía</h2>
                <div className="space-y-2">
                    <div className="h1">H1 / Display</div>
                    <div className="h2">H2</div>
                    <div className="h3">H3</div>
                    <div className="body">Texto body principal</div>
                    <div className="small">Small / Label</div>
                    <div className="caption">Caption</div>
                </div>
            </section>
        </div>
    );
}
