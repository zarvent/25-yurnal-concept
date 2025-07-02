import { Toolbox } from '@/components/toolbox';

const improveCategories = [
    { name: "I - Con Imaginería", prompt: "Usar tu mente para crear o recordar escenas agradables, seguras o exitosas.", storageKey: "toolbox-improve-imagery" },
    { name: "M - Buscando un Significado", prompt: "Encontrar o crear un propósito, valor o aprendizaje en medio de la dificultad.", storageKey: "toolbox-improve-meaning" },
    { name: "P - Con Oración o Intención Positiva", prompt: "Conectar con algo espiritual, recitar un mantra o enfocarte en la esperanza.", storageKey: "toolbox-improve-prayer" },
    { name: "R - Con Relajación", prompt: "Hacer algo deliberado para relajar tu cuerpo (respiración, estiramientos, música tranquila).", storageKey: "toolbox-improve-relaxation" },
    { name: "O - Haciendo Una cosa en el momento", prompt: "Enfocar toda tu atención en la tarea o experiencia presente, sea cual sea.", storageKey: "toolbox-improve-one-thing" },
    { name: "V - Tomando unas Vacaciones breves", prompt: "Darte un pequeño respiro programado de la dificultad (15 min para leer, un café, etc.).", storageKey: "toolbox-improve-vacation" },
    { name: "E - Con Auto-aliento (Encouragement)", prompt: "Darte mensajes realistas pero amables y motivadores.", storageKey: "toolbox-improve-encouragement" }
];

const acceptsCategories = [
    { name: "A - Con Actividades", prompt: "Sumergirte en algo que requiera tu atención (leer, cocinar, jugar, etc.).", storageKey: "toolbox-accepts-activities" },
    { name: "C - Contribuyendo", prompt: "Hacer algo por otros, ayudar, ser voluntario/a.", storageKey: "toolbox-accepts-contributing" },
    { name: "C - Con Comparaciones", prompt: "Poner tu situación en perspectiva (sin invalidar tu dolor).", storageKey: "toolbox-accepts-comparisons" },
    { name: "E - Con Emociones diferentes", prompt: "Generar intencionalmente una emoción opuesta (ver comedia, escuchar música alegre).", storageKey: "toolbox-accepts-emotions" },
    { name: "P - Apartando la situación (Pushing Away)", prompt: "Decidir no pensar en el problema por un tiempo definido.", storageKey: "toolbox-accepts-pushing-away" },
    { name: "T - Con otros Pensamientos", prompt: "Ocupar tu mente con algo neutro que requiera concentración (contar, puzzles, etc.).", storageKey: "toolbox-accepts-thoughts" },
    { name: "S - Con Sensaciones intensas", prompt: "Usar sensaciones físicas fuertes pero seguras (hielo, ducha fría, sabor fuerte).", storageKey: "toolbox-accepts-sensations" }
];

const sensesCategories = [
    { name: "Visión", prompt: "Cosas agradables de ver que te calmen (fotos, naturaleza, colores suaves).", storageKey: "toolbox-senses-vision" },
    { name: "Oído", prompt: "Sonidos, música o voces que te relajen o te gusten.", storageKey: "toolbox-senses-hearing" },
    { name: "Olfato", prompt: "Aromas que te resulten placenteros o te traigan buenos recuerdos.", storageKey: "toolbox-senses-smell" },
    { name: "Gusto", prompt: "Sabores que disfrutes de forma consciente y con moderación.", storageKey: "toolbox-senses-taste" },
    { name: "Tacto", prompt: "Texturas o sensaciones físicas que te resulten reconfortantes.", storageKey: "toolbox-senses-touch" }
];


export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <Toolbox 
        title="Mis Estrategias para Mejorar el Momento (IMPROVE)"
        description="Cuando estés atravesando una situación dolorosa que no puedes cambiar ahora mismo, utiliza estas categorías para crear tu lista personal de estrategias y hacer el momento más tolerable."
        categories={improveCategories}
      />
      <Toolbox 
        title="Mi Caja de Herramientas de Distracción (ACCEPTS)"
        description="Cuando una emoción dolorosa te abrume y no puedas resolver el problema de inmediato, usa estas ideas para distraerte temporalmente y evitar actuar impulsivamente."
        categories={acceptsCategories}
      />
      <Toolbox 
        title="Mi Kit Personal de Autocalma con los 5 Sentidos"
        description="En momentos de malestar, usa tus sentidos para reconfortarte. Crea una lista de cosas específicas y saludables que te resulten agradables o tranquilizadoras para cada sentido."
        categories={sensesCategories}
      />
    </div>
  );
}
