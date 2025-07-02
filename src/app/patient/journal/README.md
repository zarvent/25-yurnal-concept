# Patient Journal View (`journal`)

## Análisis del INGENIERO CATO

Esta ruta implementa la vista del historial del diario del paciente. El componente `JournalPage` es un componente de cliente (`"use client"`) debido a su alta interactividad y dependencia del estado del lado del cliente.

-   **Gestión de Estado**: Utiliza el hook `useState` para manejar la fecha seleccionada en la vista de calendario. El estado de los `entries` se obtiene del hook `useJournal`, que a su vez se conecta al store global de Zustand.
-   **Optimización del Renderizado**: Emplea `useMemo` para recalcular `entryDates` y `selectedEntries` solo cuando sus dependencias (`entries`, `selectedDate`) cambian. Esta es una optimización de rendimiento clave para evitar recálculos innecesarios en cada renderizado.
-   **Manejo de Estados de UI**: El componente maneja de forma explícita varios estados:
    1.  **`JournalLoadingSkeleton`**: Se muestra mientras los datos se cargan, mejorando la Experiencia de Usuario Percibida (Perceived UX).
    2.  **`EmptyState`**: Se muestra si no hay entradas, proporcionando una guía clara y un Call to Action (CTA).
    3.  **Renderizado Principal**: Se muestra cuando los datos están disponibles.
-   **Componentización**: Descompone la UI en subcomponentes como `JournalEntryCard`, lo que promueve la reutilización y la legibilidad del código.
-   **Manejo de Hidratación**: El `useEffect` para establecer la fecha inicial (`setSelectedDate(new Date())`) es una técnica crucial para evitar errores de hidratación en Next.js, ya que el servidor y el cliente no renderizarán la misma fecha si se genera en el momento del renderizado.

## Análisis del PSICÓLOGO CATO

La página del `journal` es el **"Archivo de la Narrativa Personal"** del usuario. Es un espacio para la auto-observación y la construcción de significado a lo largo del tiempo.

-   **Dos Modos de Visualización, Dos Funciones Psicológicas**:
    1.  **Vista de Lista (`BookOpen`)**: Fomenta una **revisión cronológica y narrativa**. Permite al usuario leer su historia, ver cómo los eventos se conectan y cómo sus sentimientos han evolucionado. Es similar a la relectura de un diario personal, una práctica clave en la terapia narrativa.
    2.  **Vista de Calendario (`CalendarDays`)**: Promueve la **visualización de patrones y la consistencia**. El resaltado de los días con entradas (`hasEntry`) actúa como un refuerzo positivo, una pequeña celebración de la constancia (el principio de "Progreso, no Perfección"). Permite al usuario ver objetivamente su compromiso con su propio proceso y puede ayudar a correlacionar estados de ánimo con días o eventos específicos.
-   **`EmptyState` (La Invitación a Empezar)**: El estado vacío no es un error, es una oportunidad. El lenguaje utilizado ("Tu diario está esperando su primera historia") es cálido y no presiona. En lugar de un mensaje de "No hay datos", se enmarca como una invitación a comenzar un "viaje", lo cual es mucho más motivador.
