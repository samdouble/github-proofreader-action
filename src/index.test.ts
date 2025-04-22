import { parseTextNodes } from '.';

describe('parseTextNodes', () => {
  it('should return 0 errors for a single short sentence', async () => {
    const { errors, sentences } = await parseTextNodes(['Hello world']);
    expect(errors.length).toBe(0);
    expect(sentences.length).toBe(1);
  });

  it('should correctly split sentences with ., ? and !', async () => {
    const { errors, sentences } = await parseTextNodes(['Hello. This is a sentence! Or multiple sentences? Whatever']);
    expect(errors.length).toBe(0);
    expect(sentences.length).toBe(4);
    expect(sentences[0]).toBe('Hello.');
    expect(sentences[1]).toBe(' This is a sentence!');
    expect(sentences[2]).toBe(' Or multiple sentences?');
    expect(sentences[3]).toBe(' Whatever');
  });
});
