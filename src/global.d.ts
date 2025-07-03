// Declare MDX modules for TypeScript
declare module '*.mdx' {
  import { MDXComponent } from 'mdx/types';
  const MDXComponentWithMeta: MDXComponent & { meta: Record<string, any> };
  export default MDXComponentWithMeta;
}
