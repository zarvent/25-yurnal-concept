# Skills Toolbox Page (`tools`)

## Análisis del INGENIERO CATO

Esta ruta (`/patient/tools`) implementa una "Caja de Herramientas" de habilidades terapéuticas interactiva. Es un componente de cliente (`"use client"`) técnicamente sofisticado.

-   **Drag-and-Drop (DnD)**: Utiliza la librería `dnd-kit` (`@dnd-kit/core`, `@dnd-kit/sortable`) para permitir al usuario reordenar las tarjetas de herramientas. La implementación sigue las mejores prácticas, incluyendo sensores para puntero y teclado (`PointerSensor`, `KeyboardSensor`) para garantizar la accesibilidad.
-   **Gestión de Estado Local**: Mantiene el orden de las herramientas en el estado del componente (`useState`). La función `handleDragEnd` actualiza este estado cuando el usuario suelta una tarjeta, volviendo a renderizar la lista en el nuevo orden.
-   **Componentización Avanzada**: Descompone la lógica de DnD en un componente `SortableToolCard`, que encapsula los hooks de `useSortable`. Esto mantiene la página principal más limpia y la lógica de ordenamiento contenida.
-   **UI Modal**: Utiliza el componente `Dialog` de ShadCN para mostrar información detallada sobre los marcos terapéuticos (TCC, TDC) sin sacar al usuario de la página. Esto es eficiente y proporciona una buena experiencia de usuario.
-   **Estructura de Datos**: La información de las herramientas y los marcos teóricos está bien estructurada en arrays y objetos (`initialTools`, `frameworkInfo`), lo que facilita su gestión y renderizado.

## Análisis del PSICÓLOGO CATO

La página de "Herramientas" es la **"Sala de Entrenamiento de Habilidades"** de Yurnal. Es donde la psicoeducación se convierte en práctica y empoderamiento.

-   **Psicoeducación Interactiva**: En lugar de simplemente leer sobre técnicas, el usuario interactúa con ellas. Cada tarjeta es una "ficha" de una habilidad concreta (ej. "Verificar los Hechos", "Habilidad STOP"), que son pilares de terapias basadas en la evidencia como la Terapia Dialéctico Conductual (TDC) y la Terapia Cognitivo-Conductual (TCC).
-   **Personalización y Agencia**: La capacidad de arrastrar y soltar las herramientas es psicológicamente muy poderosa. Permite al usuario **jerarquizar y personalizar su propio plan de tratamiento implícito**. Puede mover las herramientas que más le sirven a la parte superior, creando un "kit de primeros auxilios" emocional a su medida. Esto fomenta un locus de control interno y la autoeficacia.
-   **Desmitificación de la Terapia**: Los `Dialog` que explican qué es la TCC o la TDC en lenguaje sencillo ("Es como aprender a ser un detective de tu propia mente") desmitifican la terapia. Hacen que conceptos complejos sean accesibles y menos intimidantes, reduciendo la barrera para buscar ayuda profesional.
-   **Gamificación Sutil**: La interactividad del DnD introduce un elemento lúdico y de compromiso que puede aumentar la probabilidad de que el usuario explore y recuerde las habilidades disponibles.
