'use client';

import GraphView from '@/components/graph-view';
import type { ElementDefinition } from 'cytoscape';

interface ClientGraphViewProps {
    elements: ElementDefinition[];
}

export default function ClientGraphView({ elements }: ClientGraphViewProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Mapa de Conocimiento</h1>
                <p className="text-muted-foreground">
                    Visualización interactiva de las conexiones entre tus notas
                </p>
            </div>
            
            <div className="h-[600px] border rounded-lg">
                <GraphView elements={elements} />
            </div>
        </div>
    );
}
