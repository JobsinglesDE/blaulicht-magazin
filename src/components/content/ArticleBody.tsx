import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import React from 'react';

function toId(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function collectText(children: any[]): string {
  return children
    .map((c) => (typeof c === 'string' ? c : ''))
    .join('');
}

const markdocConfig = {
  nodes: {
    heading: {
      render: 'heading',
      attributes: {
        level: { type: Number, required: true },
      },
      transform(node: any, config: any) {
        const children = node.transformChildren(config);
        const level = node.attributes.level;
        const attrs = level === 2 ? { id: toId(collectText(children)) } : {};
        return new Markdoc.Tag(`h${level}`, attrs, children);
      },
    },
  },
};

type Props = {
  content: { node: any } | any[];
};

export function ArticleBody({ content }: Props) {
  const node = 'node' in content ? content.node : content;

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert">
      {Markdoc.renderers.react(renderable, React)}
    </div>
  );
}
