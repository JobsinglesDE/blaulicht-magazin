import Markdoc, { type RenderableTreeNode } from '@markdoc/markdoc';
import React, { type ReactNode } from 'react';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

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

const BASE_PATH = '/magazin';

function prefixInternalHref(href: string): string {
  if (!href) return href;
  // Externe Links, Anchor-Links, mailto: unberührt
  if (href.startsWith('//') || /^[a-z]+:/i.test(href) || href.startsWith('#')) return href;
  // Bereits prefixed
  if (href.startsWith(`${BASE_PATH}/`) || href === BASE_PATH) return href;
  // Root-relative interne Links bekommen Prefix
  if (href.startsWith('/')) return `${BASE_PATH}${href}`;
  return href;
}

function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const videoId = url.match(/(?:v=|youtu\.be\/|shorts\/)([^&\s?]+)/)?.[1];
  if (!videoId) return null;
  return (
    <div className="my-8 flex justify-center">
      <AnimatedGradientBorder borderRadius={16} borderWidth={3} className="w-full max-w-xs">
        <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || 'YouTube Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </AnimatedGradientBorder>
    </div>
  );
}

const markdocConfig = {
  tags: {
    youtube: {
      render: 'YouTube',
      attributes: {
        url: { type: String, required: true },
        title: { type: String },
      },
    },
  },
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
    link: {
      render: 'a',
      attributes: {
        href: { type: String, required: true },
        title: { type: String },
      },
      transform(node: any, config: any) {
        const children = node.transformChildren(config);
        const rawHref = node.attributes.href as string;
        const href = prefixInternalHref(rawHref);
        const attrs: Record<string, string> = { href };
        if (node.attributes.title) attrs.title = node.attributes.title;
        // Externe Links (http/https mit Host != eigener Seite) erhalten automatisch
        // rel="nofollow noopener" + target="_blank" für E-E-A-T-Quellenangaben.
        const isExternal = /^https?:\/\//i.test(rawHref) && !/^https?:\/\/(www\.)?blaulichtsingles\.ch/i.test(rawHref);
        if (isExternal) {
          attrs.rel = 'nofollow noopener';
          attrs.target = '_blank';
        }
        return new Markdoc.Tag('a', attrs, children);
      },
    },
  },
};

const proseClasses = "prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-brand-orange prose-strong:text-foreground prose-code:text-brand-orange dark:prose-invert";

type Props = {
  content: { node: any } | any[];
  /** Insert this element after the Nth H2 heading (first insert — use for video in upper third) */
  insertAfterH2?: number;
  /** The element to insert at the first insert point */
  insertElement?: ReactNode;
  /** Insert this element after the Nth H2 heading (second insert — use for mid-article CTA) */
  insertAfterH2_2?: number;
  /** The element to insert at the second insert point */
  insertElement_2?: ReactNode;
};

const markdocComponents = {
  YouTube: YouTubeEmbed,
};

function findSplitIndex(topChildren: any[], afterH2: number): number {
  let h2Count = 0;
  for (let i = 0; i < topChildren.length; i++) {
    const tag = typeof topChildren[i] === 'object' && topChildren[i] !== null && 'name' in topChildren[i]
      ? (topChildren[i] as any).name : null;
    if (tag === 'h2') {
      h2Count++;
      if (h2Count === afterH2) {
        for (let j = i + 1; j < topChildren.length; j++) {
          const nextTag = typeof topChildren[j] === 'object' && topChildren[j] !== null && 'name' in topChildren[j]
            ? (topChildren[j] as any).name : null;
          if (nextTag === 'h2') return j;
        }
        return Math.min(i + 4, topChildren.length);
      }
    }
  }
  return -1;
}

export function ArticleBody({ content, insertAfterH2, insertElement, insertAfterH2_2, insertElement_2 }: Props) {
  const node = 'node' in content ? content.node : content;
  const renderable = Markdoc.transform(node, markdocConfig);

  const hasInsert1 = insertAfterH2 !== undefined && insertElement !== undefined;
  const hasInsert2 = insertAfterH2_2 !== undefined && insertElement_2 !== undefined;

  if (!hasInsert1 && !hasInsert2) {
    return (
      <div className={proseClasses}>
        {Markdoc.renderers.react(renderable, React, { components: markdocComponents })}
      </div>
    );
  }

  const topChildren = Array.isArray(renderable) ? renderable : (renderable as any)?.children ?? [];
  const split1 = hasInsert1 ? findSplitIndex(topChildren, insertAfterH2!) : -1;
  const split2 = hasInsert2 ? findSplitIndex(topChildren, insertAfterH2_2!) : -1;

  // Both valid and in order
  if (split1 !== -1 && split2 !== -1 && split2 > split1) {
    const part1 = { ...renderable as any, children: topChildren.slice(0, split1) };
    const part2 = { ...renderable as any, children: topChildren.slice(split1, split2) };
    const part3 = { ...renderable as any, children: topChildren.slice(split2) };
    return (
      <>
        <div className={proseClasses}>{Markdoc.renderers.react(part1, React, { components: markdocComponents })}</div>
        {insertElement}
        <div className={proseClasses}>{Markdoc.renderers.react(part2, React, { components: markdocComponents })}</div>
        {insertElement_2}
        <div className={proseClasses}>{Markdoc.renderers.react(part3, React, { components: markdocComponents })}</div>
      </>
    );
  }

  // Only first insert
  if (split1 !== -1) {
    const firstHalf = { ...renderable as any, children: topChildren.slice(0, split1) };
    const secondHalf = { ...renderable as any, children: topChildren.slice(split1) };
    return (
      <>
        <div className={proseClasses}>{Markdoc.renderers.react(firstHalf, React, { components: markdocComponents })}</div>
        {insertElement}
        <div className={proseClasses}>{Markdoc.renderers.react(secondHalf, React, { components: markdocComponents })}</div>
      </>
    );
  }

  // Only second insert
  if (split2 !== -1) {
    const firstHalf = { ...renderable as any, children: topChildren.slice(0, split2) };
    const secondHalf = { ...renderable as any, children: topChildren.slice(split2) };
    return (
      <>
        <div className={proseClasses}>{Markdoc.renderers.react(firstHalf, React, { components: markdocComponents })}</div>
        {insertElement_2}
        <div className={proseClasses}>{Markdoc.renderers.react(secondHalf, React, { components: markdocComponents })}</div>
      </>
    );
  }

  // Fallback: no valid split found
  return (
    <div className={proseClasses}>
      {Markdoc.renderers.react(renderable, React, { components: markdocComponents })}
    </div>
  );
}
