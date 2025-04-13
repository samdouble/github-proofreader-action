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
exports.parseTextNodes = parseTextNodes;
exports.parse = parse;
const glob_1 = require("glob");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const html_1 = require("./parsers/html");
const markdown_1 = require("./parsers/markdown");
const config = {
    exclude: ['node_modules/**'],
    patterns: ['src/**/*.md'],
    rules: {
        "max-sentence-length": {
            "warn-value": 20,
            "error-value": 25,
        },
    },
};
function parseTextNodes(textNodes) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = [];
        const sentences = [];
        for (const textNode of textNodes) {
            const matches = [...textNode.matchAll(/([^\?!\.]+[\?!\.]?)/g)];
            const textNodeSentences = matches.map((match) => match[0]);
            sentences.push(...textNodeSentences);
            for (const sentence of sentences) {
                const trimmedSentence = sentence.trim();
                const words = trimmedSentence.split(' ');
                if (words.length > 25) {
                    errors.push({
                        line: 'TODO',
                        nbWords: words.length,
                        sentence,
                    });
                }
            }
        }
        return {
            errors,
            sentences,
        };
    });
}
function parse() {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = [];
        const warnings = [];
        const fileNames = yield (0, glob_1.glob)('src/**/*.md', { ignore: config.exclude });
        for (const fileName of fileNames) {
            const fileContents = yield promises_1.default.readFile(fileName, { encoding: 'utf8' });
            const extension = node_path_1.default.extname(fileName);
            let textNodes = [];
            if (extension === '.html') {
                const parsedHtml = (0, html_1.parseHtml)(fileContents);
                textNodes = (0, html_1.readNode)(parsedHtml);
            }
            else if (extension === '.md') {
                const parsedHtml = yield (0, markdown_1.parseMarkdown)(fileContents);
                textNodes = (0, html_1.readNode)(parsedHtml);
            }
            const { errors: fileErrors, sentences } = yield parseTextNodes(textNodes);
            console.log(fileName, sentences.length, fileErrors.length);
            errors.push(...fileErrors);
        }
        return errors;
    });
}
exports.default = {
    parse,
    parseTextNodes,
};
