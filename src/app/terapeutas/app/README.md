# Therapist User Flow (`therapist`)

## Análisis del INGENIERO CATO

Este directorio es el grupo de rutas que define la experiencia de usuario para el rol de "Terapeuta". El `layout.tsx` es la pieza arquitectónica clave.

-   **`layout.tsx`**: Siguiendo el mismo patrón de abstracción que los otros roles, este archivo utiliza el componente `DashboardLayout` genérico.
    1.  **Inyección de Configuración**: Proporciona los `navItems`, `pageTitles` y otros `props` que son específicos para el terapeuta (e.g., Dashboard, Pacientes, Biblioteca, Agenda). Esto configura el `DashboardLayout` para las necesidades precisas de este rol.
    2.  **Mantenibilidad**: La ventaja de este enfoque es inmensa. Si se necesita un cambio en la estructura general del dashboard (por ejemplo, añadir un nuevo elemento en la cabecera), solo se necesita modificar `DashboardLayout.tsx` una vez, y el cambio se propagará a los tres roles de usuario (paciente, estudiante, terapeuta).
    3.  **Código Limpio y Declarativo**: El `layout.tsx` del terapeuta es extremadamente legible. Su única responsabilidad es declarar la configuración del layout, no implementar su estructura.

Este es un ejemplo excelente de cómo una buena arquitectura de componentes conduce a un código más limpio, más seco (DRY) y más fácil de mantener.

## Análisis del PSICÓLOGO CATO

La carpeta `therapist` es el **"Consultorio Digital del Dr. Morales"** (nuestro terapeuta arquetípico). Cada elemento dentro de esta sección está diseñado para apoyar su práctica clínica, respetando siempre los principios éticos de confidencialidad y competencia profesional.

-   **`layout.tsx` (El Entorno Profesional)**: El layout en sí mismo está diseñado para ser profesional, ordenado y eficiente. A diferencia del santuario del paciente que busca la calma introspectiva, este entorno busca la claridad y la eficacia clínica.
    -   **Navegación Orientada a la Tarea**: Los ítems del menú (`Dashboard`, `Pacientes`, `Agenda`) reflejan las tareas centrales de un terapeuta. La navegación está optimizada para un acceso rápido a la información relevante para su trabajo.
    -   **Encuadre de Seguridad Profesional**: El `SidebarFooter` ("Plataforma segura y profesional") y el `MainFooter` (recordando la gestión de emergencias) establecen el encuadre profesional. Le recuerdan al terapeuta tanto las capacidades de la herramienta como sus limitaciones y responsabilidades éticas, como la de guiar a un paciente en crisis a los servicios adecuados. Esto refuerza el rol de Yurnal como una herramienta de *apoyo* a la terapia, no un sustituto de ella.
