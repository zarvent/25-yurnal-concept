# Library Utilities (`lib`)

## Análisis del INGENIERO CATO

Este directorio, `src/lib`, sirve como una librería de propósito general para funciones de utilidad puras y helpers que son utilizados en toda la aplicación.

-   **`utils.ts`**: Este es el archivo principal y contiene una función de utilidad esencial:
    -   **`cn(...inputs)`**: Esta función es una pieza clave para trabajar con Tailwind CSS en un sistema de componentes de React. Combina dos utilidades: `clsx` (para construir cadenas de clases condicionales) y `tailwind-merge` (para fusionar inteligentemente clases de Tailwind, resolviendo conflictos de estilo de manera predecible). Por ejemplo, si un componente tiene `p-4` por defecto y se le pasa `p-2` como prop, `tailwind-merge` asegura que `p-2` anule a `p-4`, en lugar de aplicar ambas.
-   **Características del Código en `lib`**:
    1.  **Pureza**: Las funciones aquí deben ser "puras", lo que significa que para la misma entrada, siempre devuelven la misma salida y no tienen efectos secundarios observables (como modificar el estado global o hacer llamadas de red).
    2.  **Agnosticismo del Framework**: Idealmente, la lógica aquí es independiente de React. Podría ser utilizada en cualquier proyecto de JavaScript/TypeScript.
    3.  **Testeabilidad**: Al ser funciones puras, son extremadamente fáciles de probar unitariamente.

Centralizar estas utilidades aquí mantiene el código organizado y promueve la reutilización.

## Análisis del PSICÓLOGO CATO

La carpeta `lib` puede ser entendida como los **"Principios Fundamentales de la Comunicación Clara"** o las **"Reglas Gramaticales"** del lenguaje de la aplicación.

-   **`utils.ts` y la función `cn` (Coherencia y Claridad)**: La función `cn` asegura que el "lenguaje visual" de la aplicación sea siempre coherente y sin ambigüedades. Psicológicamente, la inconsistencia en la comunicación (visual o verbal) genera confusión y ansiedad. Un mensaje contradictorio (como dos estilos en conflicto) requiere que el receptor (el usuario) gaste energía mental para descifrar la intención.
    -   **Prevención de "Dobles Vínculos" Visuales**: En terapia familiar sistémica, un "doble vínculo" es un mensaje contradictorio que genera confusión. La función `cn` previene estos dobles vínculos a nivel de UI, asegurando que la intención del diseño siempre se exprese de forma clara y unificada.
-   **Lógica Fundamental**: Este directorio contiene la lógica subyacente que, aunque invisible para el usuario, garantiza que la experiencia sea fluida y predecible. Es como las reglas gramaticales de un idioma: no somos conscientes de ellas mientras hablamos, pero son las que hacen que la comunicación sea posible y efectiva.
