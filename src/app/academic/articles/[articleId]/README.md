# Article Detail View (`[articleId]`)

## Análisis del INGENIERO CATO

Este directorio representa una **ruta dinámica** en Next.js, capturando el `articleId` desde la URL para mostrar los detalles de un artículo específico del "Yurnal Académico".

-   **Propósito Técnico**: Renderizar la vista detallada de un artículo. Es un Server Component que obtiene los datos del artículo basándose en el `articleId` de los `params`. Actualmente, obtiene los datos de una fuente estática (`mockArticles`), pero está diseñado para obtenerlos de una API en el futuro.
-   **Seguridad Crítica**: Se ha añadido una nota de seguridad en el código, indicando la necesidad de usar `react-markdown` junto con `rehype-sanitize` o `DOMPurify` para renderizar el contenido Markdown. Este es un recordatorio crucial para prevenir ataques de Cross-Site Scripting (XSS) cuando los datos provengan de una base de datos real.
-   **Lógica de Interacción**: Los botones de "Votar" y "Exportar", así como la sección de comentarios, son actualmente marcadores de posición visuales. En una implementación completa, estos elementos desencadenarían llamadas a las APIs correspondientes (`POST /api/articles/{articleId}/vote`, etc.), idealmente utilizando Server Actions de Next.js.

## Análisis del PSICÓLOGO CATO

Esta página es el **"Seminario de Discusión"** o el **"Club de Lectura Académico"**. Es donde el estudiante o profesional pasa de descubrir un tema a analizarlo en profundidad y (eventualmente) discutirlo con otros.

-   **Profundización del Conocimiento**: Esta vista permite una inmersión completa en un único tema. Proporciona el espacio y el foco necesarios para un estudio detenido, a diferencia de la vista de listado que fomenta la exploración amplia.
-   **Modelo de Discurso Académico**: La estructura de la página (artículo, metadatos, sección de comentarios) modela el proceso del discurso científico: leer la investigación, considerar a los autores, y luego participar en una discusión crítica y constructiva.
-   **Fomento de la Participación**: El botón de "voto" es una forma de participación de bajo esfuerzo que permite al usuario expresar su acuerdo o aprecio por un trabajo. La futura sección de comentarios abrirá la puerta a una participación más elaborada, crucial para el desarrollo del pensamiento crítico y las habilidades de argumentación.
-   **Herramientas para el Estudio**: La función de "Exportar" reconoce que el aprendizaje no ocurre solo en la pantalla. Permitir al usuario guardar una copia para leer sin conexión o para sus archivos personales apoya diversos estilos de estudio y trabajo académico.
