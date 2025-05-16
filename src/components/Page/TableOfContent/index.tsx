import { useState } from 'react';

import { NotionBlock } from '@/types/notion/converted';

type HeadingNode = {
  id: string;
  level: number;
  content?: string;
  children: HeadingNode[];
};

export const TableOfContent = ({ blocks }: { blocks: NotionBlock[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  const buildHeadingTree = (blocks: NotionBlock[]): HeadingNode[] => {
    const root: HeadingNode[] = [];
    const stack: HeadingNode[] = [];

    blocks
      .filter((block) => block.type.startsWith('heading_'))
      .forEach((block, i) => {
        const level = parseInt(block.type.split('_')[1]);
        const node: HeadingNode = {
          id: `${level}-${i}`,
          level,
          content: block.data,
          children: [],
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          root.push(node);
        } else {
          stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
      });

    return root;
  };

  const headingTree = buildHeadingTree(
    blocks
      .filter((block) => block && block.type.startsWith('heading_'))
      .map((block) => ({
        ...block,
        level: parseInt(block.type.split('_')[1]),
      }))
  );

  if (headingTree.length === 0) return null;

  const renderNestedList = (nodes: HeadingNode[]) => (
    <ul className="list-none pl-4 space-y-1">
      {nodes.map((node) => (
        <li key={node.id} className="group">
          <a href={`#${node.id}`} className="transition-colors text-sm">
            {node.content || `Heading ${node.level}`}
          </a>
          {node.children.length > 0 && renderNestedList(node.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-neutral-600 bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer w-full text-left"
      >
        <div className="px-4 py-2">Table of Contents</div>
      </button>
      {isOpen && (
        <div className="py-4 border-l border-r border-b border-neutral-600">
          {renderNestedList(headingTree)}
        </div>
      )}
    </div>
  );
};
