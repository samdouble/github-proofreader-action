import markdownit from 'markdown-it';
// @ts-ignore
import { addLineNumbersPlugin } from 'markdown-it-add-line-numbers';
import { parseHtml } from './html';

export const parseMarkdown = (markdown: string) => {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  });
  md.use(addLineNumbersPlugin);
  const parsedMarkdown = md.render(markdown);
  return parseHtml(parsedMarkdown);
};
