# Global State Store (`store`)

## Análisis del INGENIERO CATO

Este directorio es el núcleo de la gestión de estado global de la aplicación, implementado con **Zustand**. Centralizar el estado es una decisión arquitectónica clave para evitar problemas como el "prop-drilling" y para crear una única fuente de verdad (Single Source of Truth) para los datos importantes de la aplicación.

-   **`session-store.ts`**: Gestiona el estado de la sesión del usuario. Esto incluye:
    -   `user`: El perfil del usuario autenticado.
    -   `isLoading`: Un booleano para rastrear el estado de carga inicial de la sesión.
    -   `login`, `logout`: Acciones para modificar el estado de la sesión.
-   **`journal-store.ts`**: Gestiona el estado de las entradas del diario del usuario.
    -   `entries`: El array de todas las entradas del diario.
    -   `isLoaded`: Un booleano para indicar si las entradas se han cargado desde el almacenamiento persistente.
    -   `loadEntries`, `addEntry`: Acciones para leer y escribir en el estado y, por extensión, en el `localStorage`.

**Por qué Zustand**: Zustand es una excelente elección porque es minimalista, no requiere envolver la aplicación en un `Context.Provider`, y su API basada en hooks es muy intuitiva. Permite a los componentes suscribirse solo a las partes del estado que les interesan, lo que optimiza los re-renders.

## Análisis del PSICÓLOGO CATO

La carpeta `store` representa la **"Memoria y el Sentido de Sí Mismo"** de la aplicación en su interacción con el usuario. Es donde reside la información persistente que define la identidad y la historia de la sesión actual.

-   **`session-store.ts` (El Sentido de Identidad / Self)**: Este store mantiene la respuesta a la pregunta "¿Quién soy yo en este momento?". Contiene el "self" del usuario (`user`), su rol y su estado actual (autenticado o no). Un sentido de identidad estable y accesible es fundamental para una interacción coherente. El estado `isLoading` es como un momento de "toma de conciencia" o "despertar" de la aplicación.
-   **`journal-store.ts` (La Memoria Autobiográfica)**: Este store contiene los recuerdos y las experiencias del usuario dentro de Yurnal. Es su narrativa personal. La acción `addEntry` es el proceso de codificar una nueva memoria, y `loadEntries` es el proceso de recuerdo o evocación.

La gestión centralizada del estado es psicológicamente análoga a tener una mente integrada. Cuando la memoria y la identidad están dispersas y descoordinadas, conduce a la confusión y la disfunción. Al centralizarlas en el `store`, aseguramos que la aplicación tenga una "mente" coherente, fiable y bien organizada, lo que a su vez proporciona una experiencia de usuario segura y estable.
