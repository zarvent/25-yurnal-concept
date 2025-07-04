# Therapist Onboarding (`onboarding`)

## Análisis del INGENIERO CATO

Esta ruta implementa la pantalla de selección de intención para el usuario terapeuta, un paso clave en su flujo de incorporación. Es un componente de cliente (`"use client"`) diseñado para capturar la interacción del usuario.

-   **Patrón de Componente Consistente**: La arquitectura de este componente es consistente con los otros flujos de onboarding (paciente, estudiante). Utiliza `useState` para el estado de selección, un array de datos para renderizar las opciones de forma declarativa y `cn` para la retroalimentación visual dinámica.
-   **Reutilización de Lógica y Estilo**: La consistencia en el patrón de implementación no solo es estéticamente agradable, sino que también es eficiente desde el punto de vista del desarrollo. Un ingeniero que entienda el onboarding del paciente puede entender y modificar inmediatamente el del terapeuta.
-   **Guía del Usuario**: El botón "Continuar" permanece deshabilitado hasta que se realiza una selección, lo que obliga suavemente al usuario a tomar una decisión y asegura que el flujo de onboarding se complete como fue diseñado.

## Análisis del PSICÓLOGO CATO

La página de onboarding del terapeuta es el equivalente a una **"Entrevista de Orientación Profesional"** o una "demostración inicial de la plataforma". Su objetivo es alinear las expectativas del terapeuta con las capacidades de la herramienta.

-   **Validación de Necesidades Profesionales**: Las opciones ("Gestión de Pacientes", "Análisis de Datos", "Organización de la Práctica") validan las diversas necesidades y tareas de un clínico moderno. Reconoce que la terapia implica no solo la interacción directa, sino también la administración, el análisis y la organización.
-   **Segmentación para la Personalización**: La elección del terapeuta puede usarse en el futuro para personalizar su dashboard. Por ejemplo, un terapeuta que elige "Análisis de Datos" podría ver los gráficos de tendencias con más prominencia, mientras que uno que elige "Organización de la Práctica" podría ver su agenda o lista de tareas primero.
-   **Opción de Baja Presión**: La opción "Evaluación de la Herramienta" es crucial. Reconoce que muchos profesionales querrán explorar y evaluar la plataforma antes de comprometerse a integrarla en su práctica. Ofrecer esta opción de "solo mirar" respeta su juicio profesional y reduce la presión, lo que puede aumentar la tasa de adopción. Es una invitación, no una demanda.
