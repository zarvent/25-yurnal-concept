import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function PatientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Pacientes</CardTitle>
        <CardDescription>Visualiza y gestiona la información de tus pacientes.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <Users className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">La funcionalidad para gestionar pacientes estará disponible aquí.</p>
      </CardContent>
    </Card>
  )
}
