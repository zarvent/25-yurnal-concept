import { ArrowLeft, ThumbsUp, MessageSquare, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


// In a real app, this data would be fetched from the backend.
const getArticleDetails = (articleId: string) => {
    const mockArticles = [
      {
        articleId: '1',
        title: 'La Neurociencia de la Terapia Cognitivo-Conductual',
        content: 'Este artículo explora en profundidad los mecanismos neuronales subyacentes a la TCC, examinando cómo las intervenciones cognitivas y conductuales pueden remodelar las vías neuronales asociadas con la ansiedad y la depresión. Se discuten estudios de fMRI que muestran cambios en la actividad de la amígdala y la corteza prefrontal después de un tratamiento exitoso con TCC.\n\n### Principios Clave\n\n1.  **Reestructuración Cognitiva:** El proceso de identificar y desafiar pensamientos automáticos negativos.\n2.  **Activación Conductual:** La importancia de programar actividades placenteras y significativas.\n3.  **Plasticidad Neuronal:** Cómo el cerebro se adapta y cambia en respuesta a nuevas experiencias y patrones de pensamiento.',
        authorName: 'Dr. Aaron Beck',
        isAnonymous: false,
        tags: ['neurociencia', 'tcc', 'investigación'],
        upvoteCount: 152,
        publicationDate: new Date('2025-06-15T10:00:00Z'),
        comments: [],
      },
      {
        articleId: '2',
        title: 'Una crítica al concepto de "Self" desde el Psicoanálisis Lacaniano',
        content: 'Jacques Lacan revolucionó el psicoanálisis con su retorno a Freud y su enfoque en el lenguaje. Este artículo argumenta que el "yo" (ego) no es una entidad autónoma, sino una construcción imaginaria formada en el "estadio del espejo". El verdadero sujeto, para Lacan, es el sujeto del inconsciente, estructurado como un lenguaje.\n\n- **El Imaginario:** El reino de la identificación y la imagen especular.\n- **Lo Simbólico:** El orden del lenguaje y la ley social.\n- **Lo Real:** Aquello que escapa a la simbolización, el trauma.',
        authorName: 'Dra. Elena Rodríguez',
        isAnonymous: false,
        tags: ['psicoanálisis', 'lacan', 'teoría'],
        upvoteCount: 210,
        publicationDate: new Date('2025-05-20T14:30:00Z'),
        comments: [
            {
                commentId: 'c1',
                authorName: 'Ps. Jacques Lacan',
                isAnonymous: false,
                content: 'Una lectura precisa. El sujeto no es quien piensa, sino donde se piensa. El "yo" es una ficción necesaria, pero una ficción al fin y al cabo.',
                createdAt: new Date('2025-05-21T10:00:00Z'),
            },
            {
                commentId: 'c2',
                authorName: 'Un lector',
                isAnonymous: true,
                content: 'Siempre me ha costado entender a Lacan, pero este artículo y el comentario anterior lo hacen mucho más claro. ¿Recomiendan alguna lectura introductoria?',
                createdAt: new Date('2025-05-21T14:20:00Z'),
            },
        ],
      },
      {
        articleId: '3',
        title: 'Aplicaciones Prácticas de Mindfulness en el Tratamiento de la Ansiedad',
        content: 'El mindfulness, o atención plena, ha demostrado ser una herramienta eficaz para la gestión de la ansiedad. Esta no es una técnica de relajación, sino de aceptación y observación sin juicio de las experiencias internas, incluyendo los pensamientos y sensaciones ansiosas.\n\n#### Técnicas Comunes:\n*   **Escaneo Corporal:** Para reconectar con las sensaciones físicas.\n*   **Atención a la Respiración:** Como ancla al momento presente.\n*   **Observación de Pensamientos:** Ver los pensamientos como eventos mentales pasajeros.',
        isAnonymous: true,
        authorName: null,
        tags: ['mindfulness', 'ansiedad', 'clínica'],
        upvoteCount: 350,
        publicationDate: new Date('2025-06-28T09:00:00Z'),
        comments: [],
      },
       {
        articleId: '4',
        title: 'El Rol del Apego en las Relaciones Adultas',
        content: 'La teoría del apego de John Bowlby, desarrollada posteriormente por Mary Ainsworth, no solo se aplica a la infancia. Los patrones de apego (seguro, ansioso-preocupado, evitativo-despreciativo, desorganizado) formados en la niñez tienden a persistir en las relaciones románticas adultas, influyendo en la intimidad, la comunicación y la resolución de conflictos.',
        authorName: 'Ps. Sofía Morales',
        isAnonymous: false,
        tags: ['apego', 'relaciones', 'desarrollo'],
        upvoteCount: 180,
        publicationDate: new Date('2025-04-10T11:00:00Z'),
        comments: [],
      },
    ];
    return mockArticles.find(a => a.articleId === articleId) || null;
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params;
  const article = getArticleDetails(articleId);

  if (!article) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
            <p className="text-muted-foreground">El artículo que buscas no existe o ha sido movido.</p>
            <Button asChild variant="link" className="mt-4">
              <Link href="/academic/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a todos los artículos
              </Link>
            </Button>
        </div>
    );
  }
  
  const formattedDate = article.publicationDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div>
            <Button asChild variant="ghost" className="-ml-4">
              <Link href="/academic/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Artículos
              </Link>
            </Button>
       </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <CardTitle className="text-3xl md:text-4xl">{article.title}</CardTitle>
          <CardDescription className="pt-2">
            Publicado por {article.isAnonymous ? 'Anónimo' : article.authorName} el {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* NOTE: In a real app, this MUST be rendered from Markdown with a library like react-markdown + rehype-sanitize or DOMPurify to prevent XSS attacks. */}
            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                {article.content}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" variant="outline">
                <ThumbsUp className="mr-2 h-5 w-5" />
                Votar ({article.upvoteCount})
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="outline">
                    <Download className="mr-2 h-5 w-5" />
                    Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
                <DropdownMenuItem>Exportar como Markdown (.md)</DropdownMenuItem>
                <DropdownMenuItem>Exportar como Texto (.txt)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare />
                Discusión ({(article.comments || []).length})
            </CardTitle>
            <CardDescription>Comparte tus pensamientos y preguntas sobre este artículo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Textarea placeholder="Escribe tu comentario aquí..." />
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="anonymous" />
                        <Label htmlFor="anonymous" className="text-sm font-normal">Comentar de forma anónima</Label>
                    </div>
                    <Button>Enviar Comentario</Button>
                </div>
            </div>
            <Separator />
            <div className="space-y-6">
                {(article.comments || []).length > 0 ? (
                    (article.comments || []).map((comment: any) => (
                        <div key={comment.commentId} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src="https://placehold.co/100x100" data-ai-hint="user avatar" />
                                <AvatarFallback>{comment.isAnonymous ? 'AN' : comment.authorName.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{comment.isAnonymous ? 'Anónimo' : comment.authorName}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-4">
                        Aún no hay comentarios. ¡Sé el primero en iniciar la conversación!
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
