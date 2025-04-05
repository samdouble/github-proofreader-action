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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = void 0;
const marked_1 = require("marked");
const html_1 = require("./html");
const parseMarkdown = (markdown) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedMarkdown = yield marked_1.marked.parse(markdown);
    return (0, html_1.parseHtml)(parsedMarkdown);
});
exports.parseMarkdown = parseMarkdown;
