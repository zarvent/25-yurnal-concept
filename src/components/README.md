# Application-Specific Components

## Análisis del INGENIERO CATO

Este directorio, `src/components`, es el hogar de los componentes de React que son específicos de la lógica de negocio y la funcionalidad de Yurnal. A diferencia de `components/ui`, que contiene bloques de construcción genéricos, los componentes aquí son más complejos, a menudo con estado (`stateful`) y encapsulan una pieza significativa de la experiencia del usuario.

-   **`JournalEditor`**: Un componente complejo que maneja la entrada de texto del diario, la selección de plantillas y la lógica de guardado.
-   **`ReflectionsGenerator`**: Encapsula toda la interacción con el flujo de IA de Genkit, incluyendo el manejo de estados de carga, error y la visualización de los resultados.
-   **`UserNav`**: Gestiona la visualización del usuario autenticado y el menú desplegable de acciones.
-   **`DashboardLayout`**: Un componente de layout de alto nivel que fue refactorizado para ser reutilizable en todos los roles.

**Principio Arquitectónico**: La separación entre componentes de "UI" (genéricos) y componentes "de aplicación" (específicos) es una práctica fundamental en el diseño de sistemas de frontend a gran escala. Permite que el sistema de diseño (`ui`) permanezca agnóstico a la lógica de negocio, mientras que estos componentes orquestan la UI para cumplir con los requisitos funcionales.

## Análisis del PSICÓLOGO CATO

Si `components/ui` son los ladrillos y las ventanas, este directorio `components` contiene las **"Salas Funcionales"** del santuario digital. Cada componente aquí es una herramienta o un espacio diseñado para una interacción terapéutica o de aprendizaje específica.

-   **`JournalEditor` (El Diario Íntimo)**: Este no es un simple campo de texto. Es el espacio sagrado para la escritura. La funcionalidad de las plantillas actúa como un "guía" o "terapeuta sutil", ofreciendo estructuras (como un registro de gratitud o un análisis TCC) para ayudar al usuario a superar el bloqueo del escritor y a enfocar su introspección.
-   **`ReflectionsGenerator` (El Espejo Socrático)**: Este componente es la interfaz para el diálogo con la parte más reflexiva de uno mismo, asistida por la IA. El diseño de sus estados de carga y error es crucial psicológicamente: un buen spinner puede transmitir "estoy pensando", mientras que un mensaje de error claro y empático puede prevenir la frustración.
-   **`UserNav` (El Sentido de Identidad)**: Muestra el avatar y el nombre del usuario. Esto refuerza el sentido de "este espacio es mío". El menú proporciona acceso rápido a funciones de auto-gestión (Ajustes) y crecimiento (Yurnal+), reforzando la autonomía.
-   **`DashboardLayout` (La Consistencia del Entorno)**: Es el "arquitecto" que asegura que todas las salas se sientan parte del mismo edificio, proporcionando una experiencia predecible y segura que reduce la carga cognitiva.
