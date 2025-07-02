# Public Outreach Articles (`articles`)

## Análisis del INGENIERO CATO

Esta ruta (`/academic/articles`) ha sido implementada según las especificaciones de Yurnal v2.0 para alojar el "Blog/Foro de Conocimiento".

-   **Estado Actual**: Se ha construido una UI funcional con datos estáticos (`mockArticles`) que simulan la respuesta de una API. El componente de página es un `Server Component` por defecto, lo que es óptimo para el SEO y el rendimiento inicial de la carga.
-   **Componentización**: La UI está estructurada con componentes reutilizables como `ArticleCard` y `ArticleFilters`, demostrando una buena separación de intereses. El estado de los filtros se maneja localmente en `ArticleFilters`, un `Client Component`.
-   **Preparada para el Futuro**: La arquitectura está lista para ser conectada a un backend real. El `mockArticles` puede ser reemplazado por una llamada a `GET /api/articles`. La lógica de filtrado y ordenamiento en el cliente puede ser movida al backend a través de `query parameters`.
-   **Navegación**: Cada `ArticleCard` enlaza a la ruta dinámica `/academic/articles/[articleId]`, completando el flujo de navegación maestro-detalle.

## Análisis del PSICÓLOGO CATO

La sección de "Artículos" cumple una función de **"Psicoeducación y Divulgación a la Comunidad"**. Es el puente entre el conocimiento académico riguroso y el público general.

-   **Alfabetización en Salud Mental**: El propósito de esta sección es traducir conceptos psicológicos complejos (como ansiedad, estrés, inteligencia emocional) a un lenguaje claro, sencillo y accionable. Esto combate el estigma y empodera a las personas con conocimiento validado sobre su propio funcionamiento mental.
-   **Herramienta para el Estudiante**: Para el estudiante de psicología, esta sección tiene un doble valor:
    1.  **Fuente de Conocimiento**: Puede aprender de los artículos.
    2.  **Modelo de Comunicación**: Puede aprender *cómo* comunicar temas complejos de manera efectiva al público, una habilidad esencial para cualquier profesional de la salud.
-   **Fomento de la Curiosidad**: La interfaz, con filtros y opciones de ordenamiento, invita a la exploración activa. No es un repositorio pasivo; es un entorno de descubrimiento que fomenta la curiosidad intelectual.
