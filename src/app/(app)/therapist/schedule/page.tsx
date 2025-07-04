import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda y Citas</CardTitle>
        <CardDescription>Administra tu disponibilidad y tus próximas sesiones.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">La funcionalidad para gestionar tu agenda estará disponible aquí.</p>
      </CardContent>
    </Card>
  )
}
