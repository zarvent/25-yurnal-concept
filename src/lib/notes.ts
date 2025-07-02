import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const notesDirectory = path.join(process.cwd(), 'src', 'notes');

export function getAllNotesData() {
  const fileNames = fs.readdirSync(notesDirectory);
  const allNotesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const content = matterResult.content;
    const backlinkMatches = content.matchAll(/\[\[(.*?)\]\]/g);
    const backlinks = Array.from(backlinkMatches, (match) => match[1]);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; tags: string[] }),
      backlinks,
    };
  });

  return allNotesData;
}
