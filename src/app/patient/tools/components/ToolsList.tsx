'use client';

import { Tool } from '@/types';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { DndContext, DragOverlay, DropAnimation, KeyboardSensor, PointerSensor, closestCenter, defaultDropAnimation, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect } from 'react';
import { debouncedSave, useToolsStore } from '@/store/tools-store';

const SortableToolItem = ({ tool }: { tool: Tool }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tool.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 bg-card border rounded-lg shadow-sm cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            {tool.name}
        </div>
    );
};

const ToolItemOverlay = ({ tool }: { tool: Tool }) => {
    return (
        <div className="p-4 bg-card border rounded-lg shadow-xl cursor-grabbing">
            {tool.name}
        </div>
    );
}

export const ToolsList = () => {
    const { tools, status, error, moveTool, saveToolsOrder, setActiveToolId, activeToolId } = useToolsStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        if (status === 'error' && error) {
            showToast('destructive', 'Error de Sincronización', error);
        }
        if (status === 'success') {
            showToast('default', 'Orden Guardado', 'El nuevo orden de las herramientas ha sido guardado.');
        }
    }, [status, error]);

    const handleDragStart = (event: { active: { id: string } }) => {
        setActiveToolId(event.active.id);
        debouncedSave.cancel();
    };

    const handleDragEnd = (event: { active: { id: string }, over: { id: string } | null }) => {
        const { active, over } = event;
        setActiveToolId(null);

        if (over && active.id !== over.id) {
            moveTool(active.id, over.id);
            saveToolsOrder();
        }
    };

    const dropAnimation: DropAnimation = {
        ...defaultDropAnimation,
        dragSourceOpacity: 1,
    };

    const activeTool = tools.find(t => t.id === activeToolId);

    const showToast = (variant: 'default' | 'destructive', title: string, description: string) => {
        // Implementación básica para mostrar un toast
        console.log(`[Toast] ${variant}: ${title} - ${description}`);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={tools.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tools.map(tool => (
                        <SortableToolItem key={tool.id} tool={tool} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeTool ? <ToolItemOverlay tool={activeTool} /> : null}
            </DragOverlay>
        </DndContext>
    );
};
