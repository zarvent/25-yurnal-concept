'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookHeart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="flex flex-col items-center text-center">
        <BookHeart className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Yurnal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4 mb-10">
          Tu espacio privado y seguro para entender tus pensamientos sin ser juzgado.
        </p>
      </div>
      <div className="flex justify-center">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/patient/today">Entrar a mi espacio</Link>
        </Button>
      </div>
      <footer className="absolute bottom-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Yurnal. Todos los derechos reservados.
      </footer>
    </div>
  );
}
