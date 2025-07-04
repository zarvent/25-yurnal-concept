# Tool Detail View (`[toolId]`)

## Análisis del INGENIERO CATO

Este directorio representa una **ruta dinámica** en Next.js, capturando el `toolId` desde la URL para mostrar los detalles de una herramienta específica.

-   **Propósito Técnico**: Renderizar la vista detallada de una herramienta del marketplace. Idealmente, este sería un **Server Component** que obtendría los datos de la herramienta específica desde la API o la base de datos basándose en el `toolId` de los `params`.
-   **Seguridad Crítica**: Como se renderizará contenido Markdown (`description`) proveniente de la base de datos, es **absolutamente imperativo** que este contenido sea sanitizado para prevenir ataques de Cross-Site Scripting (XSS). La práctica estándar es usar una librería como `react-markdown` en conjunto con `rehype-sanitize` o `DOMPurify` para asegurar que solo se renderice HTML seguro.
-   **Lógica de Interacción**: El botón "He usado esta herramienta" es el punto de interacción principal, que desencadenaría una llamada al endpoint `POST /api/tools/{toolId}/use`. Este es un buen candidato para una **Server Action** en Next.js para manejar la mutación de datos con una experiencia de usuario optimista.

## Análisis del PSICÓLOGO CATO

Esta página es la **"Sala de Práctica Individual"**. Es donde el usuario pasa de explorar una herramienta a estudiarla y prepararse para aplicarla.

-   **Profundización del Aprendizaje**: Mientras que la vista del marketplace es para el descubrimiento, esta vista es para la **comprensión profunda**. El contenido detallado (`description`) funciona como una sesión de psicoeducación individualizada, explicando el "porqué" y el "cómo" de una técnica específica.
-   **Refuerzo Positivo y Auto-monitoreo**: El botón "He usado esta herramienta" cumple una función psicológica crucial. Es un acto de **auto-refuerzo** que solidifica la acción en la mente del usuario. Marca un logro y contribuye a la construcción de un historial de auto-cuidado, lo cual puede ser muy motivador y es un dato valioso para el análisis de reflexiones de la IA.
-   **Seguridad y Consentimiento Informado**: La alerta para herramientas "Avanzadas" es un excelente ejemplo de **consentimiento informado digital**. Advierte al usuario sobre la posible dificultad o intensidad de una técnica, permitiéndole tomar una decisión informada sobre si está preparado para usarla. Esto respeta la autonomía del usuario y fomenta un uso seguro y consciente de la plataforma.
