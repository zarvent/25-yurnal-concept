'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { journalService } from '@/services/journal.service';
import { useJournalDataStore } from '@/store/journal-data.store';
import { Insight, JournalEntry } from '@/types';
import { useState, useTransition } from 'react';

interface AnalysisGeneratorProps {
	selectedEntries?: JournalEntry[];
}

export function AnalysisGenerator({ selectedEntries = [] }: AnalysisGeneratorProps) {
	const [insights, setInsights] = useState<Insight[] | null>(null);
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();
	const addEntry = useJournalDataStore(state => state.addEntry);

	const handleGenerateClick = () => {
		if (selectedEntries.length === 0) {
			toast({ variant: 'destructive', title: 'Seleccione al menos una entrada' });
			return;
		}
		startTransition(async () => {
			try {
				const entry = selectedEntries[0];
				const generated = await journalService.generateInsightsForEntry(entry.id);
				setInsights([generated]);
				toast({ title: 'Éxito', description: 'Insights generados correctamente.' });
			} catch (e) {
				toast({ variant: 'destructive', title: 'Error', description: (e as Error).message });
			}
		});
	};

	const handleSaveAnalysis = (insight: Insight) => {
		const content = `Temas: ${insight.themes.join(', ')}\n\nPreguntas: ${insight.questions.join(', ')}\n\nFortalezas: ${insight.strengths.join(', ')}`;
		addEntry({
			id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
			content,
			mood: 'neutral',
			tags: ['análisis', 'reflexión'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 'user',
			isPrivate: true,
		});
		toast({ title: 'Análisis guardado', description: 'El análisis se ha guardado en tu diario.' });
	};

	return (
		<div className="p-4 border rounded-lg">
			<Button onClick={handleGenerateClick} disabled={isPending || selectedEntries.length === 0}>
				{isPending ? 'Generando...' : `Analizar (${selectedEntries.length})`}
			</Button>

			<div className="mt-6">
				{isPending && <p>Procesando IA…</p>}
				{!isPending && insights === null && <p>Los resultados aparecerán aquí.</p>}
				{insights?.map((insight: Insight, idx: number) => (
					<Card key={insight.id} className="mb-4">
						<CardHeader><CardTitle>IA Insights</CardTitle></CardHeader>
						<CardContent>
							<h4>Temas:</h4>
							<ul>{insight.themes.map((t, i) => <li key={i}>{t}</li>)}</ul>
							<h4>Preguntas:</h4>
							<ul>{insight.questions.map((q, i) => <li key={i}>{q}</li>)}</ul>
							<Button className="mt-4" onClick={() => handleSaveAnalysis(insight)}>
								Guardar análisis en mi diario
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
