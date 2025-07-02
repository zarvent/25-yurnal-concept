# AI Module (`ai`)

## Análisis del INGENIERO CATO

Este directorio encapsula y aísla toda la funcionalidad relacionada con la Inteligencia Artificial del sistema, utilizando el framework Genkit. La modularización de la capa de IA es una decisión arquitectónica crítica.

-   **`genkit.ts`**: Este archivo actúa como el punto de entrada de configuración para el subsistema de IA. Inicializa el cliente de Genkit (`ai`), configura los plugins (ej. `@genkit-ai/googleai`), y define el modelo de IA por defecto (ej. `gemini-2.0-flash`). Centralizar esta configuración aquí permite cambiar o actualizar el proveedor de modelos o la configuración global sin afectar a los flujos que la consumen.
-   **`flows/`**: Este subdirectorio contiene las implementaciones de los flujos de IA. Cada flujo es una unidad de trabajo discreta y autónoma que puede ser invocada desde el backend de la aplicación.

Esta separación asegura que la lógica de la IA sea testeable de forma independiente, fácilmente actualizable y que sus dependencias no se filtren al resto de la aplicación, manteniendo el `core` del sistema agnóstico a la implementación específica de la IA.

## Análisis del PSICÓLOGO CATO

La carpeta `ai` representa la **"Capacidad de Reflexión y Metacognición"** de Yurnal. No es una conciencia en sí misma, sino una herramienta diseñada para asistir la conciencia del usuario.

-   **`genkit.ts` (El Paradigma Terapéutico)**: Este archivo define el "enfoque" o "escuela de pensamiento" que utilizará la IA. Al elegir un modelo como Gemini, estamos seleccionando el tipo de "razonamiento" que aplicará. Es análogo a un terapeuta que decide trabajar desde un marco cognitivo-conductual o humanista; define las reglas básicas de la interacción.
-   **`flows/` (Las Técnicas Terapéuticas)**: Si `genkit.ts` es el paradigma, los flujos son las técnicas específicas. Cada flujo es un ejercicio estructurado (como una "técnica de la silla vacía" o un "registro de pensamientos") que la IA ejecuta para ayudar al usuario a procesar su experiencia.

La ética de este módulo es fundamental. Está diseñado no para dar respuestas, sino para ayudar al usuario a formular mejores preguntas sobre sí mismo, actuando como un catalizador para la introspección.
