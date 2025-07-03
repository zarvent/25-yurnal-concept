'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const templates = [
    {
        name: 'Entrada Libre',
        prompt: '¿Qué tienes en mente?',
        content: '',
    },
    {
        name: 'Análisis de un Día Estresante',
        prompt: 'Describe un evento estresante y cómo te hizo sentir.',
        content:
            'Hoy fue un día estresante.\n\nEl evento principal fue: \n\nMe sentí: \n\nCómo reaccioné: \n\nQué podría hacer diferente la próxima vez: ',
    },
    {
        name: 'Registro de Gratitud',
        prompt: 'Enumera tres cosas por las que estás agradecido hoy.',
        content: 'Hoy estoy agradecido por:\n\n1. \n2. \n3. \n\nEsto me hizo sentir: ',
    },
    {
        name: 'Técnica CBT (Terapia Cognitivo-Conductual)',
        prompt: 'Identifica un pensamiento negativo y reestructúralo.',
        content:
            'Situación: \n\nPensamiento Automático Negativo: \n\nEmociones que sentí: \n\nEvidencia que apoya este pensamiento: \n\nEvidencia que contradice este pensamiento: \n\nPensamiento Alternativo y más equilibrado: ',
    },
    {
        name: 'Verificar los Hechos',
        prompt: 'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
        content:
            'Emoción que siento: \nIntensidad (0-100): \n\nEvento Desencadenante (objetivamente): \n\nMis Interpretaciones y Pensamientos: \n\nEvidencia que apoya mi emoción: \n\nEvidencia que NO apoya mi emoción: \n\nUna visión más equilibrada es: \n',
    },
    {
        name: 'Notas de Mindfulness',
        prompt: 'Registra tus prácticas de mindfulness, enfocándote en observar y describir sin juicio.',
        content:
            'Actividad Específica:\n\n' +
            'Habilidad Enfocada (Observar/Describir/Ambas):\n\n' +
            'Observaciones (Qué noté: sentidos, pensamientos, emociones, cuerpo - descripción sin juicio):\n\n' +
            'Dificultad / Nivel de Juicio (0-5):\n\n' +
            'Notas/Aprendizajes:\n',
    },
    {
        name: 'Mi Ola Emocional',
        prompt: 'Analiza una emoción intensa para entenderla mejor, desde su origen hasta sus consecuencias.',
        content:
            'Evento Desencadenante (¿Qué pasó?):\n\n' +
            'Interpretación (¿Qué pensé sobre el evento?):\n\n' +
            'Emoción Principal (Nombre e intensidad 0-100):\n\n' +
            'Sensaciones Físicas (¿Qué sentí en mi cuerpo?):\n\n' +
            'Impulso de Acción (¿Qué me urgía hacer?):\n\n' +
            'Mi Conducta (¿Qué hice finalmente?):\n\n' +
            'Consecuencias (¿Qué pasó después, a corto y largo plazo?):\n\n' +
            'Reflexión (¿Qué aprendí de esto?):\n',
    },
    {
        name: 'Acción Opuesta',
        prompt: 'Identifica una emoción intensa que no sea eficaz y planifica cómo actuar de forma opuesta para cambiarla.',
        content:
            'Situación:\n\n' +
            'Emoción y su intensidad (0-100):\n\n' +
            '¿Está justificada por los hechos? (Sí/No):\n\n' +
            '¿Actuar según la emoción sería eficaz a largo plazo? (Sí/No):\n\n' +
            'Impulso de Acción (¿Qué me pide hacer la emoción?):\n\n' +
            'Acción Opuesta Identificada:\n\n' +
            'Plan detallado para la Acción Opuesta (cuerpo, palabras, pensamientos):\n',
    },
    {
        name: 'Mis Prioridades en la Interacción',
        prompt: 'Antes de una conversación importante, clarifica qué es lo más crucial para ti: el objetivo, la relación o tu autorespeto.',
        content:
            'Situación (¿Con quién y sobre qué?):\n\n' +
            '1. Mi Objetivo (Importancia 0-5): \n   Descripción de mi objetivo: \n\n' +
            '2. La Relación (Importancia 0-5): \n   Cómo quiero que quede la relación: \n\n' +
            '3. Mi Autorespeto (Importancia 0-5): \n   Cómo quiero sentirme conmigo mismo/a: \n\n' +
            'Mi Prioridad Principal es: (OBJETIVO / RELACIÓN / AUTORESPETO)\n',
    },
    {
        name: 'Reflexión de Habilidad GIVE',
        prompt: 'Analiza una interacción reciente donde tu prioridad era cuidar la relación y evalúa cómo usaste la habilidad GIVE.',
        content:
            'Situación:\n\n' +
            '¿Fui Gentil y respetuoso/a? (Sí/No/Cómo):\n\n' +
            '¿Mostré Interés y escuché? (Sí/No/Cómo):\n\n' +
            '¿Intenté Validar su perspectiva? (Sí/No/Cómo):\n\n' +
            '¿Usé un Tono Amable (Easy Manner)? (Sí/No/Cómo):\n\n' +
            '¿Qué funcionó bien y qué podría mejorar?:\n\n',
    },
];

interface TemplateSelectorProps {
    onSelectTemplate: (content: string, prompt: string) => void;
    isDisabled: boolean;
}

export function TemplateSelector({ onSelectTemplate, isDisabled }: TemplateSelectorProps) {
    const handleSelect = (templateName: string) => {
        const selected = templates.find(t => t.name === templateName);
        if (selected) {
            onSelectTemplate(selected.content, selected.prompt);
        }
    };

    return (
        <Select onValueChange={handleSelect} disabled={isDisabled}>
            <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Selecciona una plantilla..." />
            </SelectTrigger>
            <SelectContent>
                {templates.map(template => (
                    <SelectItem key={template.name} value={template.name}>
                        {template.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
