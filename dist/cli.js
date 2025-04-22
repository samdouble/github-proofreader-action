#!/usr/bin/env node
"use strict";
//module/cli.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const _1 = require(".");
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Warning: Requires 2 arguments');
    console.log('node index.js [path/source.html] [targetfile]');
    process.exit();
}
const src = args[0];
const target = args[1];
const dirsrc = node_path_1.default.dirname(src);
if (!node_fs_1.default.existsSync(src)) {
    console.log(`Error: Source file doesn't exist. Given: ${src}`);
    process.exit();
}
(0, _1.parse)();
