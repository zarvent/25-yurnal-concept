'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Search, ThumbsUp, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Based on Yurnal v2.0 Spec
const mockArticles = [
  {
    articleId: '1',
    title: 'La Neurociencia de la Terapia Cognitivo-Conductual',
    content: 'Este artículo explora en profundidad los mecanismos neuronales subyacentes a la TCC...',
    authorId: 'user123',
    authorName: 'Dr. Aaron Beck',
    isAnonymous: false,
    tags: ['neurociencia', 'tcc', 'investigación'],
    upvoteCount: 152,
    publicationDate: new Date('2025-06-15T10:00:00Z'),
  },
  {
    articleId: '2',
    title: 'Una crítica al concepto de "Self" desde el Psicoanálisis Lacaniano',
    content: 'Jacques Lacan revolucionó el psicoanálisis con su retorno a Freud...',
    authorId: 'user456',
    isAnonymous: false,
    authorName: 'Dra. Elena Rodríguez',
    tags: ['psicoanálisis', 'lacan', 'teoría'],
    upvoteCount: 210,
    publicationDate: new Date('2025-05-20T14:30:00Z'),
  },
  {
    articleId: '3',
    title: 'Aplicaciones Prácticas de Mindfulness en el Tratamiento de la Ansiedad',
    content: 'El mindfulness, o atención plena, ha demostrado ser una herramienta eficaz...',
    authorId: 'user789',
    isAnonymous: true,
    authorName: null,
    tags: ['mindfulness', 'ansiedad', 'clínica'],
    upvoteCount: 350,
    publicationDate: new Date('2025-06-28T09:00:00Z'),
  },
  {
    articleId: '4',
    title: 'El Rol del Apego en las Relaciones Adultas',
    content: 'La teoría del apego de John Bowlby no solo se aplica a la infancia...',
    authorId: 'user101',
    authorName: 'Ps. Sofía Morales',
    isAnonymous: false,
    tags: ['apego', 'relaciones', 'desarrollo'],
    upvoteCount: 180,
    publicationDate: new Date('2025-04-10T11:00:00Z'),
  },
];

type SortByType = 'publicationDate' | 'upvoteCount';

function ArticleCard({ article }: { article: (typeof mockArticles)[number] }) {
  const formattedDate = article.publicationDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
          Por {article.isAnonymous ? 'Anónimo' : article.authorName} - {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{article.upvoteCount}</span>
        </div>
        <Button asChild variant="secondary">
          <Link href={`/academic/articles/${article.articleId}`}>
            Leer Más <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ArticleFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  tags,
  activeTag,
  setActiveTag
}: any) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Explorar Contenido</CardTitle>
                <CardDescription>Busca, filtra y ordena para encontrar el conocimiento que necesitas.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título..."
                        className="pl-10 text-base h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-[180px] h-11">
                            <SelectValue placeholder="Ordenar por..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="publicationDate">Más Recientes</SelectItem>
                            <SelectItem value="upvoteCount">Más Populares</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                 <Button variant={activeTag === 'all' ? 'default' : 'outline'} onClick={() => setActiveTag('all')}>Todos</Button>
                {tags.map((tag: string) => (
                    <Button key={tag} variant={activeTag === tag ? 'default' : 'outline'} onClick={() => setActiveTag(tag)}>
                        {tag}
                    </Button>
                ))}
            </CardFooter>
        </Card>
    )
}

export default function ArticlesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortByType>('publicationDate');
    const allTags = useMemo(() => Array.from(new Set(mockArticles.flatMap(a => a.tags))), []);
    const [activeTag, setActiveTag] = useState('all');


    const filteredAndSortedArticles = useMemo(() => {
        return mockArticles
            .filter(article => {
                const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesTag = activeTag === 'all' || article.tags.includes(activeTag);
                return matchesSearch && matchesTag;
            })
            .sort((a, b) => {
                if (sortBy === 'upvoteCount') {
                    return b.upvoteCount - a.upvoteCount;
                }
                return b.publicationDate.getTime() - a.publicationDate.getTime();
            });
    }, [searchTerm, sortBy, activeTag]);

  return (
    <div className="space-y-6">
      <ArticleFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        tags={allTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedArticles.length > 0 ? (
          filteredAndSortedArticles.map((article) => (
            <ArticleCard key={article.articleId} article={article} />
          ))
        ) : (
            <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold">No se encontraron artículos</h3>
                <p className="text-muted-foreground mt-2">Intenta ajustar tu búsqueda o filtros.</p>
            </div>
        )}
      </div>
    </div>
  )
}
