"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdx-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    const mdxComponents = useMDXComponents({});
    return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
