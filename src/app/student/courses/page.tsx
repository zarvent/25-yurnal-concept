import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const placeholderCourses = [
  {
    title: "Introducción a las Terapias Contextuales",
    description: "Un curso fundamental sobre las terapias de tercera generación.",
    image: "https://placehold.co/600x400",
    hint: "psychology textbook",
    tag: "Próximamente"
  },
  {
    title: "Herramientas Digitales en la Práctica Clínica",
    description: "Aprende a integrar la tecnología en tu práctica profesional de forma ética y eficaz.",
    image: "https://placehold.co/600x400",
    hint: "therapist laptop",
    tag: "Próximamente"
  },
  {
    title: "Manejo de la Ansiedad: Un Enfoque Práctico",
    description: "Estrategias y técnicas basadas en evidencia para el manejo de la ansiedad.",
    image: "https://placehold.co/600x400",
    hint: "calm meditation",
    tag: "Próximamente"
  }
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Cursos y Formación</CardTitle>
          <CardDescription>Formaciones, workshops y masterclasses para llevar tu conocimiento al siguiente nivel.</CardDescription>
        </CardHeader>
       </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {placeholderCourses.map((course, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="relative">
              <Image 
                src={course.image}
                alt={course.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
                data-ai-hint={course.hint}
              />
              <Badge className="absolute top-2 right-2">{course.tag}</Badge>
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
