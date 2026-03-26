import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import React from 'react';

type Props = {
  content: { node: any } | any[];
};

export function ArticleBody({ content }: Props) {
  // Content from Keystatic is a Markdoc AST node
  const node = 'node' in content ? content.node : content;

  const renderable = Markdoc.transform(node);

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert">
      {Markdoc.renderers.react(renderable, React)}
    </div>
  );
}
