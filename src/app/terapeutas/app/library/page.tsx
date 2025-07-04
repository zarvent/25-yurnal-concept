import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Library } from "lucide-react";

export default function LibraryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biblioteca de Recursos</CardTitle>
        <CardDescription>Explora, gestiona y asigna recursos y ejercicios a tus pacientes.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <Library className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Contenido en construcción</h3>
        <p className="text-muted-foreground mt-2">Próximamente, podrás crear y compartir colecciones de herramientas con tus pacientes.</p>
      </CardContent>
    </Card>
  )
}
