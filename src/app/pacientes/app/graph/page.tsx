import ClientGraphView from '@/components/graph/client-graph-view';
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

    return <ClientGraphView elements={elements} />;
}
