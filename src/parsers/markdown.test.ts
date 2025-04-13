import dedent from 'dedent';
import { parseMarkdown } from './markdown';

describe('parseMarkdown', () => {
  it('should add label to the pull request', async () => {
    const markdown = dedent(`
      # Heading 1
      ## Heading 2
      A simple paragraph. With a few words.
      <ul>
        <li>And HTML even</li>
      </ul>
      ![Image](https://imgurl.com/img.png)
      - Here is
      - another list
      <div>
        <p>Then a div with a paragraph.</p>
      </div>
      <div><p>Another one, but on one line.</p></div>

      | Month    | Savings |
      | -------- | ------- |
      | January  | $250    |
      | February | $80     |
      | March    | $420    |

      Good bye! See you soon.
    `);
    const html = await parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <h1 class="source-line" data-source-line="0">Heading 1</h1>
      <h2 class="source-line" data-source-line="1">Heading 2</h2>
      <p class="source-line" data-source-line="2">A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
      ![Image](https://imgurl.com/img.png)
      - Here is
      - another list
      <div>
        <p>Then a div with a paragraph.</p>
      </div>

      <p class="source-line" data-source-line="14">Good bye! See you soon.</p>
    `) + '\n');
  });
});
