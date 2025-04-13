"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = exports.readNode = void 0;
const node_html_parser_1 = require("node-html-parser");
const readNode = (node) => {
    const nodes = [];
    for (const childNode of node.childNodes) {
        if (childNode.nodeType === node_html_parser_1.NodeType.TEXT_NODE) {
            nodes.push(childNode.rawText);
        }
        else if (childNode.nodeType === node_html_parser_1.NodeType.ELEMENT_NODE) {
            if (childNode.rawTagName === 'img') {
                // console.log((childNode as HTMLElement).rawAttributes.src);
            }
            (0, exports.readNode)(childNode);
        }
    }
    return nodes;
};
exports.readNode = readNode;
const parseHtml = (html) => {
    const root = (0, node_html_parser_1.parse)(html);
    return root;
};
exports.parseHtml = parseHtml;
