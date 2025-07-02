# Custom React Hooks (`hooks`)

## Análisis del INGENIERO CATO

Este directorio es para los **hooks de React personalizados**, una característica fundamental de React para encapsular y reutilizar lógica con estado (stateful logic).

-   **Propósito**: El objetivo principal de los hooks es extraer la lógica de los componentes para que pueda ser probada de forma independiente y reutilizada en toda la aplicación. Esto mantiene los componentes de la UI más limpios y centrados en la presentación.
-   **`use-journal.ts`**: Un hook que actúa como una interfaz para el `journal-store`. Abstrae la interacción con el store de Zustand, proporcionando una API limpia (`entries`, `addEntry`, etc.) a los componentes que necesitan acceder a los datos del diario. También maneja el efecto secundario de cargar las entradas desde el `localStorage` al montar el componente.
-   **`use-toast.ts`**: Un hook personalizado para gestionar notificaciones (toasts). Encapsula la lógica de añadir, actualizar y eliminar toasts del estado global, proporcionando una simple función `toast()` a los componentes.
-   **`use-mobile.ts`**: Un hook que detecta si el usuario está en un dispositivo móvil basándose en el ancho de la ventana. Encapsula la interacción con la API del navegador `window.matchMedia`, un efecto secundario que no debería estar directamente en un componente de renderizado.

El uso de hooks es una piedra angular de la arquitectura moderna de React, promoviendo la composición sobre la herencia y llevando a un código más declarativo y mantenible.

## Análisis del PSICÓLOGO CATO

La carpeta `hooks` representa las **"Habilidades de Afrontamiento Internas"** o los **"Procesos Mentales Automáticos"** de la aplicación. Son las rutinas internas que Yurnal utiliza para gestionar situaciones recurrentes de manera eficiente y consistente.

-   **`use-journal.ts` (La Habilidad de la Memoria y el Recuerdo)**: Este hook es el proceso por el cual la aplicación "recuerda" las entradas pasadas del diario y "aprende" a guardar nuevas. Abstrae el complejo proceso de interactuar con la memoria a largo plazo (`localStorage` o una base de datos) en una habilidad simple y accesible para cualquier componente que la necesite.
-   **`use-toast.ts` (La Capacidad de Dar Retroalimentación)**: La retroalimentación es esencial para el aprendizaje y el cambio. Este hook gestiona cómo la aplicación se comunica con el usuario en momentos clave (ej. "¡Entrada Guardada!"). Una buena retroalimentación refuerza el comportamiento positivo y construye la autoeficacia del usuario.
-   **`use-mobile.ts` (La Capacidad de Adaptación al Contexto)**: Este hook permite a la aplicación ser consciente de su entorno (¿estoy en un escritorio o en un teléfono?) y adaptar su comportamiento en consecuencia. Psicológicamente, esta adaptabilidad es una señal de inteligencia y sensibilidad. Muestra que la aplicación puede ajustar su "lenguaje corporal" (la UI) para ser más cómoda y efectiva en diferentes contextos sociales (o de dispositivo).
