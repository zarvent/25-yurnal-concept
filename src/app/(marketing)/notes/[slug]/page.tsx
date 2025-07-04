import { promises as fs } from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const notesDirectory = path.join(process.cwd(), 'src', 'notes');

export async function generateStaticParams() {
    const filenames = await fs.readdir(notesDirectory);
    return filenames.map((filename) => ({
        slug: path.parse(filename).name,
    }));
}

async function getNote(slug: string) {
    const filePath = path.join(notesDirectory, `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');
    return { source };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { source } = await getNote(resolvedParams.slug);

    return (
        <div className="prose dark:prose-invert mx-auto p-6">
            <MDXRemote
                source={source}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [rehypeKatex, rehypeHighlight],
                    },
                }}
            />
        </div>
    );
}
