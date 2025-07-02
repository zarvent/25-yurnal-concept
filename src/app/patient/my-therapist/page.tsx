import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function MyTherapistPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conecta con tu Terapeuta</CardTitle>
        <CardDescription>
          Comparte tus reflexiones de forma segura y colabora con un profesional para un cuidado más informado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-[300px]">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aún no has conectado con un terapeuta</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Encuentra y conecta con un profesional para empezar tu viaje terapéutico.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">
          Buscar Terapeutas
        </Button>
      </CardFooter>
    </Card>
  );
}
