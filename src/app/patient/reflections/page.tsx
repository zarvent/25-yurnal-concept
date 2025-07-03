import { AnalysisGenerator } from '@/components/analysis-generator';

export default function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Análisis de Patrones</h1>
        <p className="text-muted-foreground mt-2">
          Descubre patrones profundos en tus entradas del diario con inteligencia artificial.
        </p>
      </div>
      <AnalysisGenerator />
    </div>
  );
}
