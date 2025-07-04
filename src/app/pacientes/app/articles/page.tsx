"use client";

import { ArticlesView } from '@/components/estudiantes/articles-view';
import { Suspense } from 'react';

type Article = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  summary: string;
  tags: string[];
  likes: number;
};

async function getArticles(): Promise<Article[]> {
  const mockArticles = [
    { id: '1', title: 'The Impact of AI on Scientific Research', authors: ['Dr. Eva Rostova', 'Dr. Kenji Tanaka'], journal: 'Journal of Future Science', year: 2024, summary: 'A comprehensive analysis of how artificial intelligence is accelerating discovery across various scientific fields.', tags: ['AI', 'Research', 'Machine Learning'], likes: 125 },
    { id: '2', title: 'Quantum Entanglement in Macroscopic Systems', authors: ['Dr. Alistair Finch'], journal: 'Physics Today', year: 2023, summary: 'Exploring the theoretical and experimental evidence for quantum phenomena at a larger scale.', tags: ['Quantum Physics', 'Entanglement'], likes: 340 },
  ];
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockArticles;
}

function ArticlesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default async function AcademicArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Artículos Académicos</h1>
      <Suspense fallback={<ArticlesSkeleton />}>
        <ArticlesView initialArticles={articles} />
      </Suspense>
    </div>
  );
}
