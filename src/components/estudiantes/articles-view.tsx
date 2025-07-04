"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

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

function ArticleCard({ article }: { article: Article }) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{article.authors.join(', ')} - {article.year}</p>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm">{article.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    {article.likes}
                </div>
                <Link href={`/academic/articles/${article.id}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                    Leer más <ArrowRight className="h-4 w-4" />
                </Link>
            </CardFooter>
        </Card>
    );
}

export function ArticlesView({ initialArticles }: { initialArticles: Article[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = useMemo(() => {
        if (!searchTerm) return initialArticles;
        return initialArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, initialArticles]);

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar artículos por título, autor o tag..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
