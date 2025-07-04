# Patient User Flow (`patient`)

## Análisis del INGENIERO CATO

Este directorio es un **grupo de rutas** que encapsula todas las vistas y funcionalidades destinadas al arquetipo de usuario "Paciente". La pieza central de este directorio es su `layout.tsx`.

-   **`layout.tsx`**: Este archivo es fundamental para la arquitectura de la UI. Define la estructura de dashboard persistente para el rol de paciente.
    1.  **Componente Reutilizable**: Utiliza el componente genérico `DashboardLayout`, pasándole como `props` los elementos de navegación (`navItems`), los títulos de página (`pageTitles`) y los componentes de pie de página (`SidebarFooter`, `MainFooter`) específicos para el paciente.
    2.  **Abstracción y DRY**: Este enfoque es un ejemplo de aplicación del principio DRY (Don't Repeat Yourself). En lugar de duplicar la lógica del dashboard en cada rol, se centraliza en `DashboardLayout`, y este archivo solo proporciona la configuración.
    3.  **Estado del Lado del Cliente**: La directiva `"use client"` es necesaria aquí porque el layout contiene componentes interactivos y hooks que dependen de APIs del navegador (como `usePathname` o `useState`).

El resto de los subdirectorios (`today/`, `journal/`, etc.) definen las páginas específicas que se renderizarán dentro de este layout consistente.

## Análisis del PSICÓLOGO CATO

La carpeta `patient` es, en esencia, el **"Santuario Personal de Ana"** (nuestra paciente arquetípica). Es el espacio más íntimo y central de la aplicación, diseñado para fomentar la seguridad, la confianza y la introspección.

-   **`layout.tsx` (El Entorno Terapéutico Constante)**: El layout funciona como el "encuadre" o "setting" terapéutico. Su consistencia a través de las diferentes secciones (Hoy, Diario, Reflexiones) proporciona una sensación de estabilidad y previsibilidad, que es fundamental para reducir la ansiedad y permitir que el usuario se sienta seguro para explorar su mundo interior.
    -   **Navegación Intuitiva**: Los íconos y etiquetas (`Hoy`, `Diario`) son claros y están orientados a la acción, minimizando la carga cognitiva.
    -   **Recordatorios Éticos**: El `MainFooter` con la nota sobre Yurnal no siendo un reemplazo de la terapia y proporcionando una línea de ayuda es una intervención ética crucial. Establece límites claros y responsables.
    -   **Sello de Privacidad**: El `SidebarFooter` con el mensaje de "Encriptación de Extremo a Extremo" no es solo un detalle técnico; es una comunicación activa que busca construir la alianza terapéutica con el usuario, asegurándole que su espacio es verdaderamente privado.
