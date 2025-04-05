import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseHtml, readNode } from './parsers/html';
import { parseMarkdown } from './parsers/markdown';
// import { getInput, setFailed } from '@actions/core';

const config = [{
  patterns: ['src/**/*.md'],
  rules: [{
    "max-sentence-length": 25,
  }],
}];

export async function run() {
  // const label = getInput('label');

  const fileNames = await glob('src/**/*.md', { ignore: 'node_modules/**' });
  for (const fileName of fileNames) {
    const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
    const extension = path.extname(fileName);
    console.log(fileName);
    let textNodes: string[] = [];
    if (extension === '.html') {
      const parsedHtml = parseHtml(fileContents);
      textNodes = readNode(parsedHtml);
    } else if (extension === '.md') {
      const parsedHtml = await parseMarkdown(fileContents);
      textNodes = readNode(parsedHtml);
    }
    for (const textNode of textNodes) {
      console.log(textNode);
      const sentences = textNode.split('.');
      for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
        const words = trimmedSentence.split(' ');
        if (words.length > 25) {
          //console.log(sentence);
        }
      }
    }
  }
}

run();

export default {
  run,
};
