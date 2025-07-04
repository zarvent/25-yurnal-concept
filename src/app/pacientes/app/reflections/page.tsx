import { AnalysisGenerator } from '@/components/analysis-generator';
import { journalService } from '@/services/journal.service';

async function fetchEntries(idsParam: string | null) {
  const insights = await journalService.generateInsightsFromAllEntries(); // Adjusted to use existing method
  const entries = insights.journalEntriesIds.map(id => ({
    id,
    userId: insights.userId,
    content: '', // Placeholder, replace with actual content fetching logic
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPrivate: true,
  }));
  const selectedIds = idsParam ? idsParam.split(',') : null;
  return selectedIds ? entries.filter((e: { id: string }) => selectedIds.includes(e.id)) : entries;
}

export default async function AnalysisPage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const entries = await fetchEntries(resolvedSearchParams.ids || null);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Análisis de Patrones</h1>
        <p className="text-muted-foreground mt-2">
          Descubre patrones profundos en tus entradas del diario con inteligencia artificial.
        </p>
      </div>
      <AnalysisGenerator selectedEntries={entries} />
    </div>
  );
}
