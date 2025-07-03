'use client';
import { AnalysisGenerator } from '@/components/analysis-generator';
import { useJournal } from '@/hooks/use-journal';
import { useSearchParams } from 'next/navigation';

export default function AnalysisPage() {
  const { entries } = useJournal();
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const selectedIds = idsParam ? idsParam.split(',') : null;
  const selectedEntries = selectedIds ? entries.filter(e => selectedIds.includes(e.id)) : entries;
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Análisis de Patrones</h1>
        <p className="text-muted-foreground mt-2">
          Descubre patrones profundos en tus entradas del diario con inteligencia artificial.
        </p>
      </div>
      <AnalysisGenerator selectedEntries={selectedEntries} />
    </div>
  );
}
