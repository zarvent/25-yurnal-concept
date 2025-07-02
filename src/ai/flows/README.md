# Genkit Flows (`ai/flows`)

## Análisis del INGENIERO CATO

Este directorio contiene las implementaciones concretas de los flujos de Genkit, que son el núcleo de la funcionalidad de IA de la aplicación. Cada archivo en este directorio representa un "agente" o una "herramienta" de IA específica y autónoma.

-   **`generate-insights.ts`**: Un ejemplo canónico. Este flujo define un contrato claro para una tarea de IA:
    1.  **Esquemas de Entrada/Salida (Zod)**: Define rigurosamente los tipos de datos de entrada (`GenerateInsightsInputSchema`) y salida (`GenerateInsightsOutputSchema`). Esto garantiza la seguridad de tipos (type-safety) y actúa como documentación y validación automática.
    2.  **Prompt Engineering**: El `prompt` es una plantilla cuidadosamente diseñada que instruye al modelo de lenguaje (LLM) sobre su rol, la tarea a realizar y el formato de salida deseado. La directiva `'use server'` es crucial, ya que indica que este código se ejecuta exclusivamente en el servidor, protegiendo la lógica y las claves de API.
    3.  **Definición del Flujo (`ai.defineFlow`)**: Envuelve la lógica, conectando la entrada, el prompt y la salida en una unidad ejecutable y reutilizable.

Arquitectónicamente, cada flujo es un microservicio de IA desacoplado, lo que permite un desarrollo, testing y despliegue granular.

## Análisis del PSICÓLOGO CATO

El directorio `flows` es el corazón de la **"Intervención Psicoeducativa Asistida por IA"** de Yurnal. Cada archivo es un ejercicio terapéutico estructurado, traducido a un lenguaje que la IA puede ejecutar.

-   **`generate-insights.ts` (El Espejo Reflexivo)**: Este flujo no es un terapeuta; es un espejo. Su diseño está basado en principios de la terapia narrativa y el análisis temático.
    1.  **Rol Asignado**: El prompt "You are a compassionate and insightful AI assistant... You are an analyst, not a therapist" establece un límite ético fundamental. Define el rol de la IA como un observador de patrones, no como un clínico que diagnostica o aconseja.
    2.  **Identificación de Temas y Fortalezas**: El flujo busca activamente no solo problemas, sino también "momentos de resiliencia". Esto se alinea con la Psicología Positiva, equilibrando el análisis de dificultades con el reconocimiento de los recursos internos del usuario.
    3.  **Preguntas Socráticas**: La instrucción de generar "gentle, Socratic questions" es clave. La IA no da respuestas; formula preguntas abiertas que invitan al usuario a profundizar en su propia reflexión, promoviendo la autoeficacia y el insight personal.
    4.  **Alerta de Crisis**: La bandera `crisisAlert` es un mecanismo de seguridad ético no negociable. Es un "disyuntor" que detecta riesgo potencial y permite que la interfaz de usuario tome el control con un mensaje seguro y predefinido, derivando a ayuda profesional.
