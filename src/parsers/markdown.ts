import markdownit, { Options, Renderer, Token } from 'markdown-it';
// @ts-ignore
import imageFigures from 'markdown-it-image-figures';
import { parseHtml } from './html';

function parseHtmlBlockPlugin(md: markdownit, level = 0) {
  function parsehtmlBlock(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    const parser = build_parser(level + 1);
    return parser.render('\n' + tokens[idx].content.replace(/\n/g, '\n\n') + '\n');
  }
  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    return parsehtmlBlock(tokens, idx, options, env, slf);
  };
  md.renderer.rules.html_inline = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    return parsehtmlBlock(tokens, idx, options, env, slf);
  };
}

function addLineNumbersPlugin(md: markdownit, level = 0) {
  function addLineNumbers(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    if (tokens[idx].map) {
      const line = level === 0 ? tokens[idx].map[0] : (tokens[idx].map[0] - 1) / 2 + 3;
      tokens[idx].attrSet('data-source-line', String(line));
    }
    return slf.renderToken(tokens, idx, options);
  }
  md.renderer.rules.blockquote_open = addLineNumbers;
  md.renderer.rules.bullet_list_open = addLineNumbers;
  md.renderer.rules.heading_open = addLineNumbers;
  md.renderer.rules.link_open = addLineNumbers;
  md.renderer.rules.list_item_open = addLineNumbers;
  md.renderer.rules.ordered_list_open = addLineNumbers;
  md.renderer.rules.paragraph_open = addLineNumbers;
  md.renderer.rules.table_open = addLineNumbers;
  md.renderer.rules.td_open = addLineNumbers;
  md.renderer.rules.th_open = addLineNumbers;
  md.renderer.rules.tr_open = addLineNumbers;
};

const build_parser = (level = 0) => {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  });
  md.use(imageFigures);
  md.use((md) => addLineNumbersPlugin(md, level));
  return md;
};

export const parseMarkdown = (markdown: string) => {
  const md = build_parser();
  md.use((md) => parseHtmlBlockPlugin(md, 0));
  const parsedMarkdown = md.render(markdown);
  return parseHtml(parsedMarkdown);
};
