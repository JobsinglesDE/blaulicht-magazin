import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import React, { type ReactNode } from 'react';

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

const proseClasses = "prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert";

type Props = {
  content: { node: any } | any[];
  /** Insert this element after the Nth H2 heading */
  insertAfterH2?: number;
  /** The element to insert */
  insertElement?: ReactNode;
};

export function ArticleBody({ content, insertAfterH2, insertElement }: Props) {
  const node = 'node' in content ? content.node : content;
  const renderable = Markdoc.transform(node, markdocConfig);

  if (!insertAfterH2 || !insertElement) {
    return (
      <div className={proseClasses}>
        {Markdoc.renderers.react(renderable, React)}
      </div>
    );
  }

  // Split the Markdoc tree at the Nth H2, before rendering
  const topChildren = Array.isArray(renderable) ? renderable : (renderable as any)?.children ?? [];
  let h2Count = 0;
  let splitIndex = -1;

  for (let i = 0; i < topChildren.length; i++) {
    const child = topChildren[i];
    const tag = typeof child === 'object' && child !== null && 'name' in child ? (child as any).name : null;
    if (tag === 'h2') {
      h2Count++;
      if (h2Count === insertAfterH2) {
        // Insert before the NEXT h2
        for (let j = i + 1; j < topChildren.length; j++) {
          const next = topChildren[j];
          const nextTag = typeof next === 'object' && next !== null && 'name' in next ? (next as any).name : null;
          if (nextTag === 'h2') {
            splitIndex = j;
            break;
          }
        }
        if (splitIndex === -1) splitIndex = Math.min(i + 4, topChildren.length);
        break;
      }
    }
  }

  if (splitIndex === -1) {
    return (
      <div className={proseClasses}>
        {Markdoc.renderers.react(renderable, React)}
      </div>
    );
  }

  // Build two separate trees
  const firstHalf = { ...renderable as any, children: topChildren.slice(0, splitIndex) };
  const secondHalf = { ...renderable as any, children: topChildren.slice(splitIndex) };

  return (
    <>
      <div className={proseClasses}>
        {Markdoc.renderers.react(firstHalf, React)}
      </div>
      {insertElement}
      <div className={proseClasses}>
        {Markdoc.renderers.react(secondHalf, React)}
      </div>
    </>
  );
}
