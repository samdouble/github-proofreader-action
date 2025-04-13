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
const _1 = require(".");
describe('parse', () => {
    it('should return 0 errors for a single short sentence', () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors, sentences } = yield (0, _1.parseTextNodes)(['Hello world']);
        expect(errors.length).toBe(0);
        expect(sentences.length).toBe(1);
    }));
    it('should correctly split sentences with ., ? and !', () => __awaiter(void 0, void 0, void 0, function* () {
        const { errors, sentences } = yield (0, _1.parseTextNodes)(['Hello. This is a sentence! Or multiple sentences? Whatever']);
        expect(errors.length).toBe(0);
        expect(sentences.length).toBe(4);
        expect(sentences[0]).toBe('Hello.');
        expect(sentences[1]).toBe(' This is a sentence!');
        expect(sentences[2]).toBe(' Or multiple sentences?');
        expect(sentences[3]).toBe(' Whatever');
    }));
});
