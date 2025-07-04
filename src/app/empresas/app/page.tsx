/**
 * Dashboard principal de la aplicación de empresas
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, UserCheck, Users } from 'lucide-react';

export default function EmpresasDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Empresarial</h1>
                <p className="text-muted-foreground">
                    Visión general del bienestar y productividad organizacional
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Empleados Activos
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">254</div>
                        <p className="text-xs text-muted-foreground">
                            +12% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Programas Activos
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            +2 nuevos este trimestre
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Índice de Bienestar
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">
                            +5% desde el trimestre anterior
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Participación
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">73%</div>
                        <p className="text-xs text-muted-foreground">
                            +8% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Programas Destacados</CardTitle>
                        <CardDescription>
                            Los programas de bienestar con mayor impacto
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Mindfulness Matutino</span>
                                <span className="text-sm font-medium">92% participación</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Coaching Nutricional</span>
                                <span className="text-sm font-medium">78% participación</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Gestión del Estrés</span>
                                <span className="text-sm font-medium">85% participación</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximas Acciones</CardTitle>
                        <CardDescription>
                            Tareas y eventos importantes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Evaluación trimestral</span>
                                <span className="text-sm text-muted-foreground">En 5 días</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Sesión de feedback</span>
                                <span className="text-sm text-muted-foreground">Próxima semana</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Renovación de licencias</span>
                                <span className="text-sm text-muted-foreground">En 2 semanas</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
