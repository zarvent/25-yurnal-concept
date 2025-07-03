'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useJournalStore } from '@/store/journal-store';
import { JournalEntry } from '@/types';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

// Datos de prueba que se ajustan estrictamente al tipo `JournalEntry` de `src/types/index.ts`
const mockEntries: JournalEntry[] = [
	{
		id: '1a-mock-uuid',
		content: 'Hoy fue mi primera sesión. Hablamos sobre mis metas y lo que espero lograr. Me sentí un poco nervioso al principio, pero la terapeuta fue muy amable y me sentí escuchado. Exploramos algunos de los desafíos que he estado enfrentando últimamente, como la ansiedad en el trabajo y los problemas para dormir. Fue un buen primer paso.',
		mood: 'neutral',
		tags: ['ansiedad', 'terapia', 'trabajo'],
		createdAt: new Date('2025-06-20T10:00:00Z'),
		updatedAt: new Date('2025-06-20T10:00:00Z'),
		userId: 'mock-user-1',
		isPrivate: true,
	},
	{
		id: '2b-mock-uuid',
		content: 'Esta semana ha sido estresante. Mucha presión en el trabajo y un proyecto importante con fecha límite. He notado que mi ansiedad ha aumentado. Intenté usar la técnica de respiración que aprendimos. Ayudó un poco a calmarme en el momento, pero la sensación de agobio vuelve. Necesito encontrar mejores maneras de manejar el estrés.',
		mood: 'sad',
		tags: ['estrés', 'trabajo', 'ansiedad'],
		createdAt: new Date('2025-06-25T18:30:00Z'),
		updatedAt: new Date('2025-06-25T18:30:00Z'),
		userId: 'mock-user-1',
		isPrivate: true,
	},
	{
		id: '3c-mock-uuid',
		content: 'Hoy logré terminar una tarea que había estado posponiendo durante días. Me sentí muy bien al respecto, una pequeña victoria. Aunque todavía me siento abrumado a veces, esto me recuerda que puedo hacer las cosas paso a paso. Quizás celebrar estos pequeños éxitos es importante.',
		mood: 'happy',
		tags: ['logro', 'procrastinación', 'motivación'],
		createdAt: new Date('2025-06-28T15:00:00Z'),
		updatedAt: new Date('2025-06-28T15:00:00Z'),
		userId: 'mock-user-1',
		isPrivate: true,
	},
	{
		id: '4d-mock-uuid',
		content: 'Tuve una conversación difícil con un amigo. Fue incómodo, pero necesario. Me di cuenta de que he estado evitando el conflicto. Aunque fue duro, me siento aliviado de haberlo hecho. La comunicación honesta es clave, incluso cuando da miedo.',
		mood: 'neutral',
		tags: ['comunicación', 'relaciones', 'conflicto'],
		createdAt: new Date('2025-07-01T20:00:00Z'),
		updatedAt: new Date('2025-07-01T20:00:00Z'),
		userId: 'mock-user-1',
		isPrivate: true,
	},
];

// Simulación de la llamada a la API de Genkit
async function generateInsights(prompt: string): Promise<{ insights: string }> {
	console.log('Enviando a la IA para análisis:', prompt);
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({
				insights: `Este es un análisis generado por IA basado en el contenido seleccionado:\n\n"${prompt.substring(
					0,
					250
				)}..."`,
			});
		}, 1500)
	);
}

export function AnalysisGenerator() {
	const {
		entries,
		selectedEntries,
		toggleEntrySelection,
		getSelectedEntriesContent,
		setEntries,
	} = useJournalStore();

	// Cargar datos de prueba en el montaje del componente si el store está vacío
	useEffect(() => {
		if (entries.length === 0) {
			setEntries(mockEntries);
		}
	}, [entries.length, setEntries]);

	const [isLoading, setIsLoading] = useState(false);
	const [reflection, setReflection] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleGenerate = async () => {
		setIsLoading(true);
		setError(null);
		setReflection(null);

		const content = getSelectedEntriesContent();
		if (content.trim().length === 0) {
			setError('Por favor, selecciona al menos una nota para analizar.');
			setIsLoading(false);
			return;
		}

		try {
			const result = await generateInsights(content);
			setReflection(result.insights);
		} catch (err) {
			setError('Ocurrió un error al generar el análisis. Inténtalo de nuevo.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Columna de Selección de Notas */}
			<Card>
				<CardHeader>
					<CardTitle>Selecciona tus Notas</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[500px] p-4 border rounded-md">
						{entries.length > 0 ? (
							entries.map((entry) => (
								<div
									key={entry.id}
									className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-colors"
								>
									<Checkbox
										id={`entry-${entry.id}`}
										checked={selectedEntries.has(entry.id)}
										onCheckedChange={() => toggleEntrySelection(entry.id)}
										aria-label={`Seleccionar nota del ${entry.createdAt.toLocaleDateString()}`}
									/>
									<label
										htmlFor={`entry-${entry.id}`}
										className="flex-1 cursor-pointer space-y-1"
									>
										<p className="font-semibold text-sm">
											{entry.createdAt.toLocaleDateString('es-ES', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</p>
										<p className="text-sm text-muted-foreground truncate">
											{entry.content.substring(0, 120)}...
										</p>
									</label>
								</div>
							))
						) : (
							<p className="text-center text-muted-foreground py-8">
								No hay notas en tu diario.
							</p>
						)}
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Columna de Análisis */}
			<Card>
				<CardHeader>
					<CardTitle>Tu Análisis Generado</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Button
							onClick={handleGenerate}
							disabled={isLoading || selectedEntries.size === 0}
							className="w-full"
						>
							{isLoading
								? 'Generando...'
								: `Analizar ${selectedEntries.size} nota(s)`}
						</Button>

						{error && (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="p-4 border rounded-md min-h-[400px] bg-muted/20 flex items-center justify-center">
							{isLoading && (
								<div className="space-y-2 w-full">
									<Skeleton className="h-4 w-[80%]" />
									<Skeleton className="h-4 w-[90%]" />
									<Skeleton className="h-4 w-[75%]" />
								</div>
							)}
							{reflection && (
								<p className="whitespace-pre-wrap text-sm">{reflection}</p>
							)}
							{!reflection && !isLoading && (
								<p className="text-muted-foreground text-center px-4">
									El análisis de tus reflexiones aparecerá aquí.
								</p>
							)}
						</div>
						<Alert>
							<Terminal className="h-4 w-4" />
							<AlertTitle>Nota sobre la IA</AlertTitle>
							<AlertDescription>
								Esta es una reflexión generada por IA y no debe sustituir el
								consejo profesional. Solo el contenido de las notas seleccionadas
								se envía para su análisis.
							</AlertDescription>
						</Alert>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
