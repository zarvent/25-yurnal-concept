'use client';

import React from 'react';

import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Mic, MicOff, Paperclip } from 'lucide-react';

interface TranscriptionControlsProps {
    isRecording: boolean;
    isTranscribing: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onAttachFile: (file: File) => void;
}

export function TranscriptionControls({
    isRecording,
    isTranscribing,
    onStartRecording,
    onStopRecording,
    onAttachFile,
}: TranscriptionControlsProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onAttachFile(file);
        }
    };

    return (
        <TooltipProvider>
            <div className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <EnhancedButton
                            variant="outline"
                            size="icon"
                            onClick={isRecording ? onStopRecording : onStartRecording}
                            disabled={isTranscribing}
                            aria-label={isRecording ? 'Detener grabación' : 'Iniciar grabación'}
                        >
                            {isRecording ? (
                                <MicOff className="h-5 w-5 text-destructive animate-pulse" />
                            ) : (
                                <Mic className="h-5 w-5" />
                            )}
                        </EnhancedButton>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isRecording ? 'Detener grabación' : 'Grabar audio'}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <EnhancedButton
                            variant="outline"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isTranscribing || isRecording}
                            aria-label="Adjuntar archivo de audio"
                        >
                            <Paperclip className="h-5 w-5" />
                        </EnhancedButton>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Adjuntar archivo de audio</p>
                    </TooltipContent>
                </Tooltip>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="audio/*"
                />
            </div>
        </TooltipProvider>
    );
}
