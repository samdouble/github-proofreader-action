import dedent from 'dedent';
import { parseHtml, readNode } from './html';

describe('parseHtml', () => {
  it('should add label to the pull request', async () => {
    const html = dedent(`
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <p>A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
    `);
    const parsedHtml = parseHtml(html);
    const textNodes = readNode(parsedHtml);
    expect(textNodes).toEqual(dedent(`
      <h1 data-source-line="0">Heading 1</h1>
      <h2 data-source-line="1">Heading 2</h2>
      <p data-source-line="2">A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
    `) + '\n');
  });
});
