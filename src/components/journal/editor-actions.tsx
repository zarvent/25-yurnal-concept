'use client';

import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Loader2, PartyPopper } from 'lucide-react';

interface EditorActionsProps {
    isSaving: boolean;
    isSuccess: boolean;
    onSave: () => void;
    onReset: () => void;
}

export function EditorActions({ isSaving, isSuccess, onSave, onReset }: EditorActionsProps) {
    return (
        <div className="flex items-center justify-end gap-4">
            {isSuccess ? (
                <div className="flex items-center gap-2 text-green-600">
                    <PartyPopper className="h-5 w-5" />
                    <span>¡Guardado con éxito!</span>
                </div>
            ) : (
                <EnhancedButton onClick={onSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? 'Guardando...' : 'Guardar Entrada'}
                </EnhancedButton>
            )}
            <EnhancedButton variant="ghost" onClick={onReset} disabled={isSaving}>
                Limpiar
            </EnhancedButton>
        </div>
    );
}
