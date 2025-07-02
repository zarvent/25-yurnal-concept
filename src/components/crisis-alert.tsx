/**
 * @fileoverview Sistema de Alertas de Crisis - Componente crítico para la seguridad del usuario
 * Implementa detección de crisis y mecanismos de respuesta inmediata
 */

'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { detectCrisisKeywords } from '@/types';
import { AlertTriangle, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CrisisResource {
    name: string;
    phone: string;
    description: string;
    available: string;
    url?: string;
}

const CRISIS_RESOURCES: CrisisResource[] = [
    {
        name: 'Teléfono de la Esperanza',
        phone: '717 003 717',
        description: 'Atención gratuita 24 horas para crisis emocionales',
        available: '24 horas',
        url: 'https://telefonodelaesperanza.org'
    },
    {
        name: 'Línea de Prevención del Suicidio',
        phone: '024',
        description: 'Línea nacional de prevención del suicidio',
        available: '24 horas'
    },
    {
        name: 'SAMUR Social',
        phone: '112',
        description: 'Emergencias médicas y psicológicas',
        available: '24 horas'
    }
];

interface CrisisAlertProps {
    isVisible: boolean;
    onClose: () => void;
    userText?: string;
    therapistContact?: {
        name: string;
        phone?: string;
        email?: string;
    };
}

export function CrisisAlert({
    isVisible,
    onClose,
    userText,
    therapistContact
}: CrisisAlertProps) {
    const [hasContactedHelp, setHasContactedHelp] = useState(false);

    useEffect(() => {
        if (isVisible) {
            // Log crisis event (sin exponer contenido sensible)
            console.warn('[CRISIS ALERT] Crisis detection activated');

            // TODO: En producción, enviar notificación segura al terapeuta
            // notifyTherapist(therapistContact);
        }
    }, [isVisible, therapistContact]);

    if (!isVisible) return null;

    const handleResourceContact = (resource: CrisisResource) => {
        setHasContactedHelp(true);
        // Registrar que el usuario accedió a recursos de ayuda
        console.log(`[CRISIS SUPPORT] User accessed: ${resource.name}`);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-red-500 shadow-2xl">
                <CardHeader className="bg-red-50 border-b border-red-200">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                            <CardTitle className="text-red-800">
                                Detectamos que podrías necesitar apoyo inmediato
                            </CardTitle>
                            <CardDescription className="text-red-700 mt-2">
                                Tu bienestar es lo más importante. No estás solo/a en esto.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                    <Alert className="border-amber-200 bg-amber-50">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">
                            Mensaje importante
                        </AlertTitle>
                        <AlertDescription className="text-amber-700 space-y-2">
                            <p>
                                Si estás experimentando pensamientos de autolesión o suicidio,
                                es crucial que busques ayuda profesional inmediatamente.
                            </p>
                            <p className="font-medium">
                                Esta aplicación NO sustituye la atención médica profesional.
                            </p>
                        </AlertDescription>
                    </Alert>

                    {/* Recursos de Crisis Inmediatos */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">
                            🆘 Recursos de Ayuda Inmediata
                        </h3>
                        <div className="space-y-3">
                            {CRISIS_RESOURCES.map((resource) => (
                                <div
                                    key={resource.name}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{resource.name}</h4>
                                        <p className="text-sm text-gray-600">{resource.description}</p>
                                        <p className="text-xs text-gray-500">Disponible: {resource.available}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                window.open(`tel:${resource.phone}`, '_self');
                                                handleResourceContact(resource);
                                            }}
                                            className="flex items-center gap-1"
                                        >
                                            <Phone className="h-3 w-3" />
                                            {resource.phone}
                                        </Button>
                                        {resource.url && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    window.open(resource.url, '_blank');
                                                    handleResourceContact(resource);
                                                }}
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contacto con Terapeuta */}
                    {therapistContact && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-lg mb-3 text-gray-900">
                                👨‍⚕️ Tu Terapeuta
                            </h3>
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="font-medium text-blue-900">{therapistContact.name}</p>
                                <div className="flex gap-2 mt-2">
                                    {therapistContact.phone && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                window.open(`tel:${therapistContact.phone}`, '_self');
                                                setHasContactedHelp(true);
                                            }}
                                            className="flex items-center gap-1"
                                        >
                                            <Phone className="h-3 w-3" />
                                            Llamar
                                        </Button>
                                    )}
                                    {therapistContact.email && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                window.open(`mailto:${therapistContact.email}?subject=Necesito ayuda urgente`, '_self');
                                                setHasContactedHelp(true);
                                            }}
                                            className="flex items-center gap-1"
                                        >
                                            <MessageCircle className="h-3 w-3" />
                                            Email
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mensaje de Esperanza */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">💚 Recuerda</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• Los sentimientos difíciles son temporales</li>
                            <li>• Buscar ayuda es un acto de valentía</li>
                            <li>• Mereces apoyo y cuidado</li>
                            <li>• No estás solo/a en esto</li>
                        </ul>
                    </div>

                    {/* Botón de Cierre */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={!hasContactedHelp}
                            className={hasContactedHelp ? '' : 'opacity-50 cursor-not-allowed'}
                        >
                            {hasContactedHelp ? 'Cerrar' : 'Contacta ayuda primero'}
                        </Button>
                        {hasContactedHelp && (
                            <Button onClick={onClose}>
                                He contactado ayuda
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/**
 * Hook para detectar y manejar alertas de crisis
 */
export function useCrisisDetection() {
    const [showCrisisAlert, setShowCrisisAlert] = useState(false);

    const checkForCrisis = (text: string): boolean => {
        const hasCrisisKeywords = detectCrisisKeywords(text);

        if (hasCrisisKeywords) {
            setShowCrisisAlert(true);
            return true;
        }

        return false;
    };

    const dismissCrisisAlert = () => {
        setShowCrisisAlert(false);
    };

    return {
        showCrisisAlert,
        checkForCrisis,
        dismissCrisisAlert
    };
}

/**
 * Función conceptual para notificar al terapeuta
 * En producción, implementaría notificaciones seguras
 */
async function notifyTherapist(therapistContact?: CrisisAlertProps['therapistContact']) {
    if (!therapistContact) return;

    // TODO: Implementar notificación segura
    // - Email cifrado al terapeuta
    // - Notificación push si está disponible
    // - Registro en sistema de auditoría

    console.log('[CRISIS NOTIFICATION] Therapist notification sent (conceptual)');
}
