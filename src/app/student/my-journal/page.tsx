import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookUser } from "lucide-react";
import Link from "next/link";

export default function MyJournalPage() {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <BookUser className="h-16 w-16 text-muted-foreground mb-4" />
        <CardTitle>Tu Espacio de Autoconocimiento</CardTitle>
        <CardDescription>Aquí puedes usar las herramientas de Yurnal para tu propio proceso de introspección.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        <p className="max-w-prose text-muted-foreground mb-6">
          Como estudiante de psicología, experimentar las herramientas en primera persona es una forma poderosa de aprender. Esta sección te da acceso completo a las funcionalidades de notas y reflexión, tal como las usaría un paciente.
        </p>
        <Button asChild>
          <Link href="/patient/today">
            Ir a mis Notas <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          (Serás dirigido a la sección de paciente, que es tu espacio personal y privado)
        </p>
      </CardContent>
    </Card>
  )
}
