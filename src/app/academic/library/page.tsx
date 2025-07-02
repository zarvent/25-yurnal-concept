import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Library, Search } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de Tesis y Papers</CardTitle>
          <CardDescription>Explora el repositorio completo de tesis, disertaciones y papers de acceso abierto de la región.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Buscar por autor, título, palabra clave..." className="pl-10 text-base h-11" />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center min-h-[400px]">
        <Library className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">La biblioteca está creciendo</h3>
        <p className="text-muted-foreground mt-2">Realiza una búsqueda para empezar a explorar. Pronto añadiremos más contenido.</p>
      </div>
    </div>
  )
}
