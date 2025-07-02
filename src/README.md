# Source Code Root (`src`)

## Análisis del INGENIERO CATO

Este directorio, `src`, es el corazón de la aplicación. Alberga todo el código fuente que define la lógica, la interfaz y el comportamiento de Yurnal. La estructura de subdirectorios está diseñada siguiendo el principio de "Separación de Intereses" (Separation of Concerns), un pilar fundamental de la arquitectura de software limpia.

-   **`app/`**: Contiene la implementación del App Router de Next.js, manejando el enrutamiento y la estructura de las páginas.
-   **`components/`**: Alberga componentes de React reutilizables, cruciales para un sistema de diseño modular y mantenible (principio DRY - Don't Repeat Yourself).
-   **`ai/`**: Encapsula toda la lógica relacionada con la inteligencia artificial (Genkit), aislando esta capa compleja del resto de la aplicación.
-   **`hooks/`**: Define hooks de React personalizados para reutilizar lógica con estado (stateful logic) a través de la aplicación.
-   **`lib/`**: Una librería de funciones de utilidad puras y helpers.
-   **`store/`**: Centraliza la gestión del estado global de la aplicación utilizando Zustand.

Esta organización no es arbitraria; está diseñada para maximizar la mantenibilidad, la testeabilidad y la escalabilidad del sistema a largo plazo.

## Análisis del PSICÓLOGO CATO

La carpeta `src` puede ser entendida como la **"Conciencia y el Aparato Psíquico"** de la aplicación Yurnal. Es donde las ideas abstractas sobre el bienestar y la introspección se traducen en la estructura y funcionalidad tangible con la que el usuario interactúa.

-   **`app/` (El Yo - Ego)**: Gestiona la interacción con el mundo exterior (el usuario a través de las rutas URL) y media entre las diferentes partes del sistema.
-   **`components/` (Conductas Aprendidas)**: Son los patrones de comportamiento (interacciones de UI) que la aplicación ha aprendido a ejecutar de forma consistente y predecible.
-   **`ai/` (La Intuición y el Insight)**: Representa la capacidad de la aplicación para procesar información de manera no lineal y ofrecer "insights" o reflexiones que van más allá de los datos crudos.
-   **`store/` (La Memoria a Largo Plazo)**: Es el almacén de la identidad (`session-store`) y las experiencias pasadas (`journal-store`) del usuario dentro de la aplicación.

La estructura de esta carpeta refleja la organización de una mente sana: las diferentes funciones están diferenciadas pero interconectadas, trabajando en armonía para crear una experiencia coherente y unificada.
