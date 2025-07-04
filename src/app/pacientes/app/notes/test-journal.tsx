import { useJournal } from '@/hooks/use-journal';
import { useJournalDataStore } from '@/store/journal-data.store';
import { useState } from 'react';

// Función modular para exportar a diferentes formatos y cantidad de entradas
function exportJournal(entries: any | any[], format: 'markdown' | 'pdf' | 'json' = 'markdown', filename = 'journal-notes.md') {
    const exportEntries = Array.isArray(entries) ? entries : [entries];
    if (format === 'markdown') {
        const markdownContent = exportEntries.map(entry => {
            return `# Nota ID: ${entry.id}\n\n**Fecha de creación:** ${new Date(entry.createdAt).toISOString()}\n**Última actualización:** ${new Date(entry.updatedAt).toISOString()}\n**Estado de ánimo:** ${entry.mood || 'No especificado'}\n**Etiquetas:** ${entry.tags?.join(', ') || 'Sin etiquetas'}\n\n${entry.content}\n\n---\n`;
        }).join('\n');
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
        alert('Exportar a PDF aún no está implementado.');
    } else if (format === 'json') {
        const jsonContent = JSON.stringify(exportEntries, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename.endsWith('.json') ? filename : 'journal-notes.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

const formatOptions = [
    { value: 'markdown', label: 'Markdown (.md)' },
    { value: 'json', label: 'JSON (.json)' },
    // { value: 'pdf', label: 'PDF (.pdf)' }, // Descomentar cuando esté implementado
];

function ExportAllJournalButton({ entries }: { entries: any[] }) {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('markdown');

    const handleExport = () => {
        exportJournal(
            entries,
            selectedFormat as 'markdown' | 'json' | 'pdf',
            selectedFormat === 'json' ? 'journal-notes.json' : 'journal-notes.md'
        );
        setShowSelect(false);
    };

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <button
                onClick={() => setShowSelect((v) => !v)}
                style={{ background: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: 4 }}
            >
                Exportar
            </button>
            {showSelect && (
                <div style={{ position: 'absolute', top: '110%', left: 0, background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 10, padding: 12 }}>
                    <label htmlFor="export-format-select" style={{ fontWeight: 500, fontSize: 14 }}>Formato:</label>
                    <select
                        id="export-format-select"
                        value={selectedFormat}
                        onChange={e => setSelectedFormat(e.target.value)}
                        style={{ marginLeft: 8, padding: 4, borderRadius: 4 }}
                    >
                        {formatOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleExport}
                        style={{ marginLeft: 12, background: '#059669', color: 'white', padding: '4px 12px', borderRadius: 4 }}
                    >
                        Descargar
                    </button>
                </div>
            )}
        </div>
    );
}

const TestJournal = () => {
    const { entries } = useJournal();
    const addEntry = useJournalDataStore(state => state.addEntry);
    const getEntriesAsText = useJournalDataStore(state => state.getEntriesAsText);

    const handleAddEntry = () => {
        const newEntry = {
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            content: 'This is a test entry',
            tags: [],
            userId: 'test-user',
            isPrivate: false,
            mood: 'neutral' as 'neutral',
        };
        addEntry(newEntry);
        console.log('Entry added:', newEntry);
    };

    return (
        <div>
            <h1>Test Journal</h1>
            <button onClick={handleAddEntry}>Add Test Entry</button>
            <ExportAllJournalButton entries={entries} />
            <pre>{getEntriesAsText()}</pre>
            <ul>
                {entries.map(entry => (
                    <li key={entry.id} style={{ marginBottom: 16, border: '1px solid #e5e7eb', borderRadius: 6, padding: 12 }}>
                        <h2>{entry.mood || 'Sin estado de ánimo'}</h2>
                        <p>{entry.content}</p>
                        <ExportAllJournalButton entries={[entry]} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestJournal;

export { exportJournal };

