import { marked } from 'marked';
import { parseHtml } from './html';

export const parseMarkdown = async (markdown: string) => {
  const parsedMarkdown = await marked.parse(markdown);
  return parseHtml(parsedMarkdown);
};
