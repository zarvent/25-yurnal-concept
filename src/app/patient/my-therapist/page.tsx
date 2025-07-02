import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartHandshake } from 'lucide-react';

export default function MyTherapistPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle>Conecta con tu Terapeuta</CardTitle>
          <CardDescription>
            Próximamente, podrás compartir de forma segura tus reflexiones con tu terapeuta para enriquecer tus sesiones.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Esta funcionalidad está en desarrollo. Estamos creando un puente seguro y confidencial entre tu viaje de introspección y el acompañamiento profesional. Tu privacidad es nuestra máxima prioridad.
          </p>
          <Button disabled>Invitar a mi terapeuta</Button>
        </CardContent>
      </Card>
    </div>
  );
}
