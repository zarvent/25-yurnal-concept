"use client";

import { CreditsDisplay } from "@/components/credits-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJournal } from '@/hooks/use-journal';
import { Bell, FileText, Info, User } from 'lucide-react';
import { exportJournal } from '@/app/(app)/patient/notes/test-journal';

export default function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="profile">
          <User className="mr-2 h-4 w-4" />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notificaciones
        </TabsTrigger>
        <TabsTrigger value="subscription">
          <FileText className="mr-2 h-4 w-4" />
          Suscripción
        </TabsTrigger>
        <TabsTrigger value="about">
          <Info className="mr-2 h-4 w-4" />
          Acerca de
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gestiona los ajustes de tu perfil público y privado. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <span>Próximamente...</span>
            <ExportJournalButton />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>Acerca de Yurnal</CardTitle>
            <CardDescription>
              Nuestra misión y el equipo detrás de este proyecto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreditsDisplay />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configura cómo y cuándo quieres recibir notificaciones. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-12 text-muted-foreground">
            Próximamente...
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Suscripción</CardTitle>
            <CardDescription>
              Gestiona tu plan de suscripción a Yurnal+. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-12 text-muted-foreground">
            Próximamente...
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function ExportJournalButton() {
  const { entries } = useJournal();
  if (!entries || entries.length === 0) return null;
  return (
    <button
      onClick={() => exportJournal(entries, 'markdown', 'journal-notes.md')}
      style={{ marginTop: 16, background: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: 4 }}
    >
      Exportar todas las notas como Markdown
    </button>
  );
}
