'use client';

import GraphView from '@/components/graph-view';
import { getAllNotesData } from '@/lib/notes';
import type { ElementDefinition } from 'cytoscape';

export default function GraphPage() {
    const allNotesData = getAllNotesData();

    const elements: ElementDefinition[] = [];

    allNotesData.forEach(note => {
        elements.push({ data: { id: note.slug, label: note.title } });
        if (note.backlinks) {
            note.backlinks.forEach(backlink => {
                elements.push({ data: { source: note.slug, target: backlink } });
            });
        }
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Graph Visualization</h1>
            <div className="border rounded-lg overflow-hidden">
                <GraphView elements={elements} />
            </div>
        </div>
    );
}
