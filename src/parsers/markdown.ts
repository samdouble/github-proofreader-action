import markdownit, { Options, Renderer, Token } from 'markdown-it';
// @ts-ignore
import imageFigures from 'markdown-it-image-figures';
import { parseHtml } from './html';

function x(md: markdownit) {
  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    console.log("C", tokens);
    for (const token of tokens) {
      if (token.type === "html_block") {
        const x = markdownit({
          html: true,
          linkify: true,
          typographer: true,
          xhtmlOut: true,
        }).render('\n' + token.content.replace(/\n/g, '\n\n') + '\n');
        console.log("D", x);
      }
    }
    return slf.renderToken(tokens, idx, options);
  };
}

function inject_linenumbers_plugin(md: markdownit) {
  function injectLineNumbers(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    if (tokens[idx].map) {
      const line = tokens[idx].map[0];
      tokens[idx].attrJoin('class', 'source-line');
      tokens[idx].attrSet('data-source-line', String(line));
    }
    return slf.renderToken(tokens, idx, options);
  }

  md.renderer.rules.heading_open   = injectLineNumbers;
  //md.renderer.rules.html_block     = injectLineNumbers;
  md.renderer.rules.list_item_open = injectLineNumbers;
  md.renderer.rules.paragraph_open = injectLineNumbers;
  md.renderer.rules.table_open     = injectLineNumbers;
};

export const parseMarkdown = async (markdown: string) => {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  });
  md.use(x);
  md.use(imageFigures);
  md.use(inject_linenumbers_plugin);
  const parsedMarkdown = md.render(markdown);
  return parseHtml(parsedMarkdown);
};
