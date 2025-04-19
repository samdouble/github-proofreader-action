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
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <h1 data-source-line="0">Heading 1</h1>
      <h2 data-source-line="1">Heading 2</h2>
      <p data-source-line="2">A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
      <figure><img src="https://imgurl.com/img.png" alt="Image" ></figure>
      <ul data-source-line="7">
      <li data-source-line="7">
      <p data-source-line="7">Here is</p>
      </li>
      <li data-source-line="8">
      <p data-source-line="8">another list</p>
      </li>
      </ul>
      <div>
        <p>Then a div with a paragraph.</p>
      </div>
      <div><p>Another one, but on one line.</p></div>
      <table data-source-line="14">
      <thead>
      <tr data-source-line="14">
      <th>Month</th>
      <th>Savings</th>
      </tr>
      </thead>
      <tbody>
      <tr data-source-line="16">
      <td>January</td>
      <td>$250</td>
      </tr>
      <tr data-source-line="17">
      <td>February</td>
      <td>$80</td>
      </tr>
      <tr data-source-line="18">
      <td>March</td>
      <td>$420</td>
      </tr>
      </tbody>
      </table>
      <p data-source-line="20">Good bye! See you soon.</p>
    `) + '\n');
  });
});
