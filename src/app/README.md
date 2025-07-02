# Application Routes (`app`)

## Análisis del INGENIERO CATO

Este directorio es la implementación del **App Router de Next.js**, un paradigma de enrutamiento basado en el sistema de archivos que define la estructura de URLs de la aplicación. Es el esqueleto sobre el que se construye toda la interfaz de usuario navegable.

-   **`layout.tsx` (Root Layout)**: Define la estructura HTML fundamental (`<html>`, `<body>`) que envuelve a toda la aplicación. Es el lugar para incluir proveedores de contexto globales, metadatos por defecto y la importación de hojas de estilo globales.
-   **`globals.css` (Global Stylesheet)**: Contiene los estilos base de Tailwind CSS y las variables CSS para el theming (light/dark mode). Aplicar estilos aquí asegura una base visual consistente en toda la aplicación.
-   **`page.tsx` (Homepage)**: Es el punto de entrada de la aplicación, la página que se renderiza en la ruta raíz (`/`).
-   **Route Groups (`(group_name)`)**: Aunque no se utilizan actualmente, los grupos de rutas son un patrón para organizar rutas sin afectar la URL, útil para layouts compartidos.
-   **Subdirectorios de Rutas (`patient/`, `therapist/`, etc.)**: Cada subdirectorio corresponde a un segmento de la URL (ej. `/patient/dashboard`). La jerarquía de carpetas define directamente la jerarquía de la web.

Esta arquitectura declarativa simplifica la comprensión de la estructura de la aplicación y optimiza la división de código (code-splitting) y el renderizado en servidor (RSC) por ruta.

## Análisis del PSICÓLO CATO

La carpeta `app` puede entenderse como el **"Diseño Arquitectónico del Santuario Digital"**. Es el plano que define los diferentes espacios, cómo se conectan y la atmósfera general del lugar.

-   **`layout.tsx` (La Estructura del Edificio)**: Proporciona el contenedor seguro y consistente. Es la estructura física y el ambiente del santuario, asegurando que, sin importar en qué "habitación" se encuentre el usuario, las paredes y el techo son sólidos y familiares.
-   **`globals.css` (La Paleta de Colores y la Iluminación)**: Define la atmósfera emocional del espacio. La elección de colores (calmos, suaves) y tipografía está diseñada para reducir la ansiedad y crear un ambiente propicio para la introspección, un principio clave de la psicología ambiental.
-   **`page.tsx` (La Recepción o el Vestíbulo)**: Es el primer punto de contacto. Su diseño debe ser acogedor, claro y orientador, ayudando al usuario a comprender el propósito del lugar y a encontrar su camino hacia el espacio que necesita.
-   **Directorios de Rol (`patient/`, `therapist/`)**: Son las "alas" especializadas del santuario. Cada una está diseñada a medida para las necesidades específicas de su ocupante (Ana, el Dr. Morales, Sofía), asegurando que las herramientas y el entorno se ajusten a su rol y objetivos.
