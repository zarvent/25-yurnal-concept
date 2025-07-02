import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajustes de la Cuenta</CardTitle>
        <CardDescription>Configura tu perfil profesional, notificaciones y más.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <Settings className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">La funcionalidad para gestionar los ajustes de tu cuenta estará disponible aquí.</p>
      </CardContent>
    </Card>
  )
}
