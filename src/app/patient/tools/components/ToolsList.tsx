'use client';

import { useToast } from '@/hooks/use-toast';
import { useToolsStore } from '@/store/tools-store';
import { Tool } from '@/types';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react';

const SortableToolItem = React.memo(({ tool }: { tool: Tool }) => {
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
});
SortableToolItem.displayName = 'SortableToolItem';

const ToolItemOverlay = ({ tool }: { tool: Tool }) => {
    return (
        <div className="p-4 bg-card border rounded-lg shadow-xl cursor-grabbing">
            {tool.name}
        </div>
    );
};

export const ToolsList = () => {
    const { tools, status, error, moveTool, saveToolsOrder, setActiveToolId, activeToolId } = useToolsStore();
    const { toast } = useToast();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        if (status === 'error' && error) {
            toast({ variant: 'destructive', title: 'Error de Sincronización', description: error });
        }
        if (status === 'success') {
            toast({ variant: 'default', title: 'Orden Guardado', description: 'El nuevo orden de las herramientas ha sido guardado.' });
        }
    }, [status, error, toast]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveToolId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveToolId(null);

        if (over && active.id !== over.id) {
            moveTool(String(active.id), String(over.id));
            saveToolsOrder();
        }
    };

    const activeTool = tools.find((t) => t.id === activeToolId);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={tools.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tools.map((tool) => (
                        <SortableToolItem key={tool.id} tool={tool} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay dropAnimation={{ duration: 250, easing: 'ease' }}>
                {activeTool ? <ToolItemOverlay tool={activeTool} /> : null}
            </DragOverlay>
        </DndContext>
    );
};
