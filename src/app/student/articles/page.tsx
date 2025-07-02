import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function ArticlesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artículos de Divulgación</CardTitle>
        <CardDescription>Contenido en lenguaje claro y sencillo sobre temas de interés masivo (ansiedad, estrés, inteligencia emocional, etc.).</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <Newspaper className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Contenido en construcción</h3>
        <p className="text-muted-foreground mt-2">Estamos preparando los mejores artículos para ti. ¡Vuelve pronto!</p>
      </CardContent>
    </Card>
  )
}
