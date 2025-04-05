import { HTMLElement, Node, NodeType, parse } from 'node-html-parser';

export const readNode = (node: HTMLElement | Node): string[] => {
  const nodes = [];
  for (const childNode of node.childNodes) {
    if (childNode.nodeType === NodeType.TEXT_NODE) {
      console.log(childNode.rawText);
      nodes.push(childNode.rawText);
    } else if (childNode.nodeType === NodeType.ELEMENT_NODE) {
      if (childNode.rawTagName === 'img') {
        console.log((childNode as HTMLElement).rawAttributes.src);
      }
      readNode(childNode);
    }
  }
  return nodes;
};

export const parseHtml = (html: string) => {
  const root = parse(html);
  return root;
};
