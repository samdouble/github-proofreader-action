"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
// @ts-ignore
const markdown_it_add_line_numbers_1 = require("markdown-it-add-line-numbers");
const html_1 = require("./html");
const parseMarkdown = (markdown) => {
    const md = (0, markdown_it_1.default)({
        html: true,
        linkify: true,
        typographer: true,
        xhtmlOut: true,
    });
    md.use(markdown_it_add_line_numbers_1.addLineNumbersPlugin);
    const parsedMarkdown = md.render(markdown);
    return (0, html_1.parseHtml)(parsedMarkdown);
};
exports.parseMarkdown = parseMarkdown;
