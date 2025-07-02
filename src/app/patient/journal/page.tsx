'use client';

import { useState, useMemo, useEffect } from 'react';
import { useJournal, type JournalEntry } from '@/hooks/use-journal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileQuestion, BookOpen, CalendarDays, Pencil } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const formattedDate = new Date(entry.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{entry.template}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm text-muted-foreground line-clamp-6">
          {entry.content}
        </p>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-[400px]">
      <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Tu diario está esperando su primera historia</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        Cada gran viaje comienza con un solo paso. Da el tuyo ahora.
      </p>
      <Button asChild size="lg">
        <Link href="/patient/today">
          <Pencil className="mr-2 h-4 w-4" />
          Empezar a Escribir
        </Link>
      </Button>
    </div>
  );
}

function JournalLoadingSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
}


export default function JournalPage() {
  const { entries, isLoaded } = useJournal();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    // Set the initial date only on the client to avoid hydration mismatch
    setSelectedDate(new Date());
  }, []);

  const entryDates = useMemo(() => {
    if (!entries) return [];
    return entries.map(entry => new Date(entry.date));
  }, [entries]);

  const selectedEntries = useMemo(() => {
    if (!selectedDate || !entries) return [];
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === selectedDate.getFullYear() &&
             entryDate.getMonth() === selectedDate.getMonth() &&
             entryDate.getDate() === selectedDate.getDate();
    });
  }, [entries, selectedDate]);


  if (!isLoaded) {
    return <JournalLoadingSkeleton />;
  }

  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="list">
          <BookOpen className="mr-2 h-4 w-4" />
          Vista de Lista
        </TabsTrigger>
        <TabsTrigger value="calendar">
          <CalendarDays className="mr-2 h-4 w-4" />
          Vista de Calendario
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </TabsContent>

      <TabsContent value="calendar" className="space-y-4">
        <Card>
          <CardContent className="p-0 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              modifiers={{ hasEntry: entryDates }}
              modifiersClassNames={{
                hasEntry: 'font-bold text-primary',
              }}
              initialFocus
            />
          </CardContent>
        </Card>
        
        {selectedDate && (
           <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Entradas para {format(selectedDate, 'PPP', { locale: es })}
            </h2>
            {selectedEntries.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {selectedEntries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay entradas para este día.</p>
            )}
           </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
