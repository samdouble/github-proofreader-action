import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseHtml, readNode } from './parsers/html';
import { parseMarkdown } from './parsers/markdown';

const config = {
  exclude: ['node_modules/**'],
  patterns: ['src/**/*.md'],
  rules: {
    "max-sentence-length": {
      "warn-value": 20,
      "error-value": 25,
    },
  },
};

type LintingError = {
  line: string;
  nbWords: number;
  sentence: string;
}

export async function parseTextNodes(textNodes: string[]): Promise<{ errors: LintingError[]; sentences: string[] }> {
  const errors: LintingError[] = [];
  const sentences: string[] = [];
  for (const textNode of textNodes) {
    const matches = [...textNode.matchAll(/([^\?!\.]+[\?!\.]?)/g)];
    const textNodeSentences: any[] = matches.map((match) => match[0]);
    sentences.push(...textNodeSentences);
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      const words = trimmedSentence.split(' ');
      if (words.length > 25) {
        errors.push({
          line: 'TODO',
          nbWords: words.length,
          sentence,
        });
      }
    }
  }
  return {
    errors,
    sentences,
  };
}

export async function parse(): Promise<LintingError[]> {
  const errors: LintingError[] = [];
  const warnings = [];
  const fileNames = await glob('src/**/*.md', { ignore: config.exclude });
  for (const fileName of fileNames) {
    const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
    const extension = path.extname(fileName);
    let textNodes: string[] = [];
    if (extension === '.html') {
      const parsedHtml = parseHtml(fileContents);
      textNodes = readNode(parsedHtml);
    } else if (extension === '.md') {
      const parsedHtml = await parseMarkdown(fileContents);
      textNodes = readNode(parsedHtml);
    }
    const { errors: fileErrors } = await parseTextNodes(textNodes);
    errors.push(...fileErrors);
  }
  return errors;
}

export default {
  parse,
  parseTextNodes,
};
