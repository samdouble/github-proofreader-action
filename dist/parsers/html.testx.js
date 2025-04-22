"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
const html_1 = require("./html");
describe('parseHtml', () => {
    it('should add label to the pull request', () => __awaiter(void 0, void 0, void 0, function* () {
        const html = (0, dedent_1.default)(`
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <p>A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
    `);
        const parsedHtml = (0, html_1.parseHtml)(html);
        const textNodes = (0, html_1.readNode)(parsedHtml);
        expect(textNodes).toEqual((0, dedent_1.default)(`
      <h1 data-source-line="0">Heading 1</h1>
      <h2 data-source-line="1">Heading 2</h2>
      <p data-source-line="2">A simple paragraph. With a few words.</p>
      <ul>
        <li>And HTML even</li>
      </ul>
    `) + '\n');
    }));
});
