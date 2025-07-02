# Patient Onboarding (`onboarding`)

## Análisis del INGENIERO CATO

Esta ruta implementa un paso crucial en el flujo de incorporación del usuario (onboarding) para el rol de paciente. Es un componente de cliente (`"use client"`) ya que su función principal es capturar la interacción del usuario y gestionar el estado local.

-   **Gestión de Estado**: Utiliza el hook `useState` para rastrear la intención seleccionada por el usuario (`selected`). Este estado local es simple, eficiente y está aislado a este componente, lo cual es apropiado para esta tarea.
-   **Renderizado Condicional**: El estado `selected` controla el atributo `disabled` del botón "Continuar". Esto es una buena práctica de UX, ya que guía al usuario a completar la acción requerida antes de poder avanzar.
-   **Estilo Dinámico**: Hace uso de la utilidad `cn` para aplicar clases de forma condicional. El borde y la sombra de la `Card` seleccionada cambian (`border-primary shadow-lg`), proporcionando una retroalimentación visual clara e inmediata a la selección del usuario.
-   **Componentización**: La lista de intenciones se genera a través de un `map` sobre un array de objetos, lo que hace que el código sea limpio, declarativo y fácil de actualizar si se necesitan añadir o modificar opciones en el futuro.

## Análisis del PSICÓLOGO CATO

La página de onboarding es el equivalente a la **primera sesión de terapia o la "fase de admisión"**. Su diseño y lenguaje son fundamentales para establecer el tono de la relación terapéutica y construir rapport.

-   **Enfoque Centrado en la Persona**: La pregunta "¿Qué te trae a tu santuario digital?" es una versión digital del "¿En qué puedo ayudarte?" de un terapeuta. Inmediatamente centra la experiencia en las necesidades y objetivos del usuario.
-   **Validación y Normalización**: Las opciones presentadas ("Entenderme mejor", "Manejar emociones") normalizan las razones comunes por las que las personas buscan apoyo. Le comunican al usuario que sus luchas son válidas y compartidas, reduciendo el posible estigma. La opción "Solo estoy explorando" es particularmente importante, ya que ofrece una "puerta abierta" de baja presión para los usuarios que aún no están seguros de su compromiso, respetando su autonomía.
-   **Establecimiento de un Contrato Terapéutico Implícito**: Al seleccionar una intención, el usuario comienza a formular sus objetivos. Este acto de elección es el primer paso para establecer un contrato implícito con la aplicación (y consigo mismo) sobre el propósito de su "trabajo" en Yurnal. Esto aumenta la motivación intrínseca y la probabilidad de un uso significativo.
