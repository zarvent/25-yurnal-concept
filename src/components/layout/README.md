# Reusable Layout Components

## Análisis del INGENIERO CATO

Este directorio está dedicado a componentes de layout de alto nivel. Su existencia es un signo de madurez arquitectónica en un proyecto de React.

-   **`DashboardLayout.tsx`**: Este es el componente principal aquí y es un ejemplo perfecto de abstracción y reutilización de código.
    -   **Propósito**: Centralizar la estructura visual y funcional que es común a todos los paneles de control de los diferentes roles de usuario (paciente, terapeuta, estudiante). Esto incluye la barra lateral, la cabecera, el área de contenido principal y los pies de página.
    -   **API de Componente**: Está diseñado para ser configurable a través de `props`. Acepta `navItems`, `pageTitles`, `brandName`, etc., lo que permite que cada layout de rol (`/patient/layout.tsx`, etc.) simplemente lo invoque con su configuración específica.
    -   **Impacto**: Esta abstracción elimina la duplicación masiva de código. Antes de esta refactorización, cada rol tenía su propio layout casi idéntico. Ahora, cualquier cambio en la estructura del dashboard se realiza en un solo lugar, lo que reduce drásticamente el esfuerzo de mantenimiento y el riesgo de inconsistencias.

Este patrón es fundamental para construir aplicaciones a gran escala que sean mantenibles y escalables.

## Análisis del PSICÓLOGO CATO

La carpeta `layout` contiene el **"Modelo Arquitectónico del Encuadre Terapéutico"**. En psicología, el "encuadre" o "setting" se refiere a los elementos constantes de la terapia (el lugar, la duración, la frecuencia) que proporcionan una base segura y predecible para el trabajo terapéutico.

-   **`DashboardLayout.tsx` (El Principio de Consistencia)**: Este componente es la encarnación del encuadre. Asegura que, sin importar el rol del usuario o la tarea que esté realizando, la estructura fundamental de su entorno digital permanezca constante.
    -   **Seguridad Psicológica**: Esta consistencia es crucial. Reduce la carga cognitiva ("¿Dónde estoy ahora? ¿Cómo vuelvo atrás?") y genera una sensación de seguridad y previsibilidad. El usuario no tiene que gastar energía mental en navegar por la interfaz y puede dedicarla por completo a su tarea introspectiva o de aprendizaje.
    -   **Identidad y Orientación**: Aunque la estructura es la misma, se personaliza con el nombre de la marca (`brandName`) y los elementos de navegación para cada rol. Esto es como tener diferentes señales en las puertas de diferentes alas de un edificio; ayuda al usuario a saber que está en el "ala de pacientes" o en el "ala de estudiantes", orientándolo dentro del espacio más grande y reforzando su identidad de rol.
