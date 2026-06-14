import React from "react";

interface LexicalNode {
  type: string;
  tag?: string;
  listType?: "bullet" | "number";
  format?: number | string;
  text?: string;
  mode?: string;
  style?: string;
  detail?: number;
  children?: LexicalNode[];
  [key: string]: any;
}

interface LexicalParserProps {
  content: {
    root?: {
      children?: LexicalNode[];
    };
  };
}

export function LexicalParser({ content }: LexicalParserProps) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  return <div className="prose max-w-none text-zinc-800">{renderNodes(content.root.children)}</div>;
}

function renderNodes(nodes: LexicalNode[]): React.ReactNode[] {
  return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="mb-4 text-base leading-relaxed text-zinc-700">
          {node.children ? renderNodes(node.children) : ""}
        </p>
      );

    case "heading": {
      const Tag = (node.tag || "h2") as React.ElementType;
      const headingClasses: Record<string, string> = {
        h1: "text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mt-8 mb-4",
        h2: "text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-6 mb-3",
        h3: "text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 mt-5 mb-2",
        h4: "text-lg sm:text-xl font-semibold text-zinc-950 mt-4 mb-2",
        h5: "text-base sm:text-lg font-semibold text-zinc-950 mt-3 mb-1",
        h6: "text-sm sm:text-base font-semibold text-zinc-950 mt-2 mb-1",
      };
      const className = headingClasses[node.tag || "h2"] || headingClasses.h2;

      return (
        <Tag key={index} className={className}>
          {node.children ? renderNodes(node.children) : ""}
        </Tag>
      );
    }

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      const className =
        node.listType === "number"
          ? "list-decimal pl-6 mb-4 space-y-1 text-zinc-700"
          : "list-disc pl-6 mb-4 space-y-1 text-zinc-700";

      return (
        <Tag key={index} className={className}>
          {node.children ? renderNodes(node.children) : ""}
        </Tag>
      );
    }

    case "listitem":
      return (
        <li key={index} className="text-base leading-relaxed">
          {node.children ? renderNodes(node.children) : ""}
        </li>
      );

    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-zinc-200 pl-4 italic text-zinc-600 my-6">
          {node.children ? renderNodes(node.children) : ""}
        </blockquote>
      );

    case "text":
      return renderText(node, index);

    case "link":
      return (
        <a
          key={index}
          href={node.fields?.url || "#"}
          target={node.fields?.newTab ? "_blank" : undefined}
          rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
          className="text-red-600 hover:text-red-700 hover:underline transition-colors duration-150 font-medium"
        >
          {node.children ? renderNodes(node.children) : node.text || ""}
        </a>
      );

    case "linebreak":
      return <br key={index} />;

    default:
      if (node.children) {
        return <React.Fragment key={index}>{renderNodes(node.children)}</React.Fragment>;
      }
      return null;
  }
}

function renderText(node: LexicalNode, index: number): React.ReactNode {
  let text: React.ReactNode = node.text || "";

  // Lexical formatting flags
  const format = node.format;

  // Format can be a number (bitmask) or a string
  if (typeof format === "number") {
    const IS_BOLD = 1;
    const IS_ITALIC = 2;
    const IS_STRIKETHROUGH = 4;
    const IS_UNDERLINE = 8;
    const IS_CODE = 16;

    if (format & IS_BOLD) text = <strong key={index}>{text}</strong>;
    if (format & IS_ITALIC) text = <em key={index}>{text}</em>;
    if (format & IS_STRIKETHROUGH) text = <span key={index} className="line-through">{text}</span>;
    if (format & IS_UNDERLINE) text = <span key={index} className="underline">{text}</span>;
    if (format & IS_CODE) text = <code key={index} className="px-1.5 py-0.5 rounded bg-zinc-100 font-mono text-sm text-red-600">{text}</code>;
  } else if (typeof format === "string") {
    if (format.includes("bold")) text = <strong key={index}>{text}</strong>;
    if (format.includes("italic")) text = <em key={index}>{text}</em>;
    if (format.includes("strikethrough")) text = <span key={index} className="line-through">{text}</span>;
    if (format.includes("underline")) text = <span key={index} className="underline">{text}</span>;
    if (format.includes("code")) text = <code key={index} className="px-1.5 py-0.5 rounded bg-zinc-100 font-mono text-sm text-red-600">{text}</code>;
  }

  return <span key={index}>{text}</span>;
}
