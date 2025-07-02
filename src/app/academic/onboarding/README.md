# Student Onboarding (`onboarding`)

## Análisis del INGENIERO CATO

Esta ruta implementa la pantalla de selección de intención para el usuario académico. Es un componente de cliente (`"use client"`) que captura la entrada del usuario para personalizar su experiencia.

-   **Arquitectura de Componente**: Sigue el mismo patrón robusto que el onboarding del paciente:
    1.  **Estado Local**: `useState` para gestionar la opción seleccionada.
    2.  **Renderizado Declarativo**: Un `map` sobre un array de datos (`intentions`) para generar las opciones, lo que facilita el mantenimiento.
    3.  **Retroalimentación Visual**: Uso de `cn` para cambiar dinámicamente los estilos de la tarjeta seleccionada, proporcionando una respuesta inmediata a la interacción del usuario.
    4.  **Control de Flujo**: El botón de "Continuar" está deshabilitado hasta que se realiza una selección, guiando al usuario de manera efectiva.

Técnicamente, es un componente de formulario simple y bien encapsulado, enfocado en una única tarea.

## Análisis del PSICÓLOGO CATO

Esta página de onboarding es el equivalente a la **"Entrevista de Orientación Vocacional"** o la definición de un "Plan de Estudios Personalizado".

-   **Clarificación de Metas de Aprendizaje**: Al preguntar "¿Cómo quieres usar Yurnal Academic?", estamos ayudando al estudiante a clarificar sus propios objetivos de aprendizaje. Este acto de elección inicial aumenta la motivación intrínseca y el sentido de propósito.
-   **Reconocimiento de Múltiples Roles del Estudiante**: Las opciones ofrecidas ("Conectar Teoría y Práctica", "Biblioteca Académica", "Formación y Cursos", "Mi Propio Diario") reconocen que un "estudiante" no es un rol monolítico. Puede estar interesado en la investigación, la clínica, el aprendizaje estructurado o el crecimiento personal. Validar estas diferentes facetas es un acto de respeto a la individualidad del estudiante.
-   **Personalización de la Experiencia Educativa**: La selección del estudiante es el primer paso hacia un aprendizaje adaptativo. La plataforma puede, en el futuro, destacar las características más relevantes para la intención declarada del estudiante (por ejemplo, si elige "Biblioteca Académica", la función de búsqueda podría tener más prominencia en su dashboard). Esto se alinea con los principios de la educación personalizada.
