# UI Primitives (`ui`)

## Análisis del INGENIERO CATO

Este directorio contiene la implementación de nuestro sistema de diseño, basado en **ShadCN/UI**. No son componentes en el sentido tradicional de "cajas negras", sino más bien "primitivas de UI".

-   **Filosofía de ShadCN/UI**: La clave es que no es una librería de componentes que se instala como una dependencia. En su lugar, el código de estos componentes se copia directamente en nuestro proyecto.
-   **Ventajas Arquitectónicas**:
    1.  **Propiedad del Código**: Tenemos control total sobre el código de nuestros componentes. Podemos modificarlos, estilizarlos y extenderlos sin estar limitados por las decisiones de una librería externa.
    2.  **Mantenibilidad**: Es fácil ver exactamente qué código se está ejecutando. No hay abstracciones ocultas.
    3.  **Composición sobre Herencia**: Los componentes están construidos sobre primitivas de UI sin estilo y accesibles de Radix UI, y se estilizan con Tailwind CSS. Esto los hace extremadamente componibles y personalizables.
    4.  **Ejemplos**: `Button.tsx`, `Card.tsx`, `Dialog.tsx`, `Input.tsx`, etc. Son los bloques de construcción atómicos de toda nuestra interfaz.

Este enfoque nos da la flexibilidad de una solución a medida con la velocidad y robustez de una librería bien establecida.

## Análisis del PSICÓLOGO CATO

La carpeta `ui` representa el **"Vocabulario No Verbal"** o el **"Lenguaje Corporal"** de la aplicación Yurnal. Son los elementos fundamentales y consistentes de la comunicación que construyen la confianza y la facilidad de uso.

-   **Previsibilidad y Seguridad**: Un `Button` siempre parece y se comporta como un botón. Una `Card` siempre enmarca el contenido de la misma manera. Esta consistencia a través de toda la aplicación crea un entorno predecible. Para el usuario, especialmente uno que puede estar experimentando ansiedad, esta previsibilidad reduce la carga cognitiva y crea una sensación de seguridad y dominio sobre la herramienta.
-   **Comunicación Silenciosa**: La apariencia de estos componentes (definida por las variables de color en `globals.css` y las clases de Tailwind) comunica la atmósfera de "Calma por Defecto" de la marca. Los bordes redondeados, los colores suaves y las transiciones sutiles son señales no verbales que le dicen al usuario: "Este es un espacio seguro y tranquilo".
-   **Accesibilidad como Inclusión**: Al estar basados en Radix UI, estos componentes están diseñados con la accesibilidad (WAI-ARIA) en mente. Esto es un acto de inclusión, asegurando que el santuario digital esté abierto y sea utilizable por personas con diversas habilidades, lo cual es un principio ético fundamental en la prestación de cualquier servicio de salud.
