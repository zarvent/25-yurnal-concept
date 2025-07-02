import { ArrowLeft, Building, ShieldCheck, BarChart2, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function BusinessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <div className="flex justify-start w-full">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
        </div>
        <main>
          <Card className="w-full">
            <CardHeader className="text-center p-8">
              <Building className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl font-bold">Yurnal para Empresas</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Una visión para el futuro del bienestar laboral.
              </p>
            </CardHeader>
            <CardContent className="p-8 border-t">
              <div className="max-w-3xl mx-auto text-lg text-center mb-12">
                <p>
                  Estamos diseñando una solución B2B para que las empresas puedan ofrecer Yurnal como un beneficio corporativo. El objetivo es proporcionar una herramienta confidencial para que los empleados gestionen su bienestar, mientras que los equipos de RR.HH. reciben datos agregados y 100% anónimos para fomentar una cultura organizacional más saludable.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Privacidad Absoluta</h3>
                  <p className="text-muted-foreground">
                    La confianza es nuestro pilar. Los datos de los empleados son privados. La empresa solo ve estadísticas anónimas.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Dashboard de RR.HH.</h3>
                  <p className="text-muted-foreground">
                    Insights valiosos sobre el clima laboral, niveles de estrés y temas recurrentes, siempre de forma agregada.
                  </p>
                </div>
                 <div className="flex flex-col items-center">
                  <Gem className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Acceso Premium</h3>
                  <p className="text-muted-foreground">
                    Los empleados reciben acceso completo a las funcionalidades premium de Yurnal y la opción de conectar con terapeutas.
                  </p>
                </div>
              </div>

               <div className="text-center mt-16 p-4 bg-primary/5 rounded-lg">
                <p className="text-lg font-semibold">Esta funcionalidad está en fase de concepto y se desarrollará en el futuro.</p>
                <p className="text-muted-foreground">¡Gracias por tu interés en construir un mejor entorno laboral!</p>
               </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
