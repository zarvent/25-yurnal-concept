'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as BarChartIcon, Clock, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'Enero', stress: 80, anxiety: 65 },
  { month: 'Febrero', stress: 70, anxiety: 72 },
  { month: 'Marzo', stress: 75, anxiety: 60 },
  { month: 'Abril', stress: 60, anxiety: 55 },
  { month: 'Mayo', stress: 55, anxiety: 50 },
  { month: 'Junio', stress: 50, anxiety: 45 },
];

const chartConfig = {
  stress: {
    label: 'Estrés',
    color: 'hsl(var(--chart-1))',
  },
  anxiety: {
    label: 'Ansiedad',
    color: 'hsl(var(--chart-2))',
  },
};

export default function TherapistDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12 p-4 md:p-6 lg:p-8">
      <Card className="col-span-6 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 esta semana</p>
        </CardContent>
      </Card>
      <Card className="col-span-6 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Hoy, 15:00</div>
          <p className="text-xs text-muted-foreground">con J. Doe</p>
        </CardContent>
      </Card>
      <Card className="col-span-6 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tendencia General</CardTitle>
          <BarChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Estable</div>
          <p className="text-xs text-muted-foreground">Nivel de estrés promedio a la baja</p>
        </CardContent>
      </Card>
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Evolución Emocional Agregada</CardTitle>
          <CardDescription>
            Tendencia de los niveles de estrés y ansiedad reportados por los pacientes en los últimos 6 meses. (Datos de ejemplo)
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="stress" fill="var(--color-stress)" radius={4} />
                <Bar dataKey="anxiety" fill="var(--color-anxiety)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Actividad Reciente de Pacientes</CardTitle>
          <CardDescription>
            Resumen de las últimas reflexiones compartidas (con consentimiento).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-12">
            <p className="text-sm text-muted-foreground">Aún no hay actividad para mostrar.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
