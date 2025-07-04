# Tools Marketplace (`tools`)

## Análisis del INGENIERO CATO

Esta ruta (`/patient/tools`) implementa el **marketplace de herramientas terapéuticas**. Ha sido refactorizada de una lista estática con drag-and-drop a una galería dinámica y escalable.

-   **Arquitectura de Datos**: La UI ahora se basa en un modelo de datos (`toolsData`) que simula la respuesta de una API, en línea con las especificaciones de Yurnal v2.0. Cada herramienta tiene propiedades como `category`, `riskLevel`, y `usageCount`.
-   **Interactividad del Frontend**: El componente es un **Client Component** (`"use client"`) que maneja la interactividad del lado del cliente.
    -   **Filtrado y Búsqueda**: Utiliza `useState` para gestionar el término de búsqueda y la categoría activa. `useMemo` se emplea para recalcular eficientemente la lista de herramientas mostradas solo cuando cambian las dependencias, optimizando el rendimiento del renderizado.
    -   **Navegación**: Cada `ToolCard` enlaza a una ruta dinámica (`/patient/tools/[toolId]`), sentando las bases para vistas de detalle dedicadas.
-   **Escalabilidad**: Esta arquitectura está preparada para el futuro. La lógica de filtrado y búsqueda puede ser fácilmente adaptada para delegar estas operaciones a una API de backend (agregando `debounce` a la búsqueda) a medida que el número de herramientas crezca. El uso de `useMemo` es una buena práctica de rendimiento frontend que seguirá siendo relevante.

## Análisis del PSICÓLOGO CATO

La "Biblioteca de Habilidades" ha evolucionado hacia un **"Marketplace de Bienestar"**. Este cambio de paradigma es psicológicamente significativo.

-   **De la Organización a la Exploración**: El modelo anterior de arrastrar y soltar se centraba en la *organización* personal de un conjunto limitado de herramientas. El nuevo modelo de marketplace se centra en la *exploración* y el *descubrimiento* dentro de un ecosistema de recursos en crecimiento. Esto fomenta la curiosidad y la autonomía del usuario.
-   **Validación Social y Guía**: La ordenación por `usageCount` (popularidad) actúa como una forma de **validación social sutil**. Ver qué herramientas son más utilizadas por otros puede reducir la ansiedad de la elección y guiar a los nuevos usuarios hacia técnicas probadas y efectivas.
-   **Personalización a través del Filtro**: La capacidad de filtrar por categorías ("Ansiedad", "Sueño", "TCC") permite al usuario personalizar su experiencia de búsqueda de una manera muy intencionada. Puede abordar un problema específico ("Hoy me siento ansioso, buscaré herramientas para eso"), lo que aumenta la relevancia y la eficacia percibida de la plataforma. Es un paso hacia un plan de tratamiento auto-dirigido.
-   **Indicadores de Seguridad (Risk Level)**: La inclusión de niveles de riesgo (`low`, `medium`, `high`) es una característica de seguridad ética fundamental. Enseña al usuario a autoevaluar su preparación para una técnica, promoviendo un enfoque de auto-cuidado que es a la vez valiente y prudente.
