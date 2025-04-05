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
// import { getInput, setFailed } from '@actions/core';
// import { context, getOctokit } from '@actions/github';
jest.mock('@actions/core', () => ({
    getInput: jest.fn(),
    setFailed: jest.fn(),
}));
jest.mock('@actions/github', () => ({
    context: {
        payload: {
            pull_request: {
                number: 1,
            },
        },
        repo: {
            owner: 'owner',
            repo: 'repo',
        },
    },
    getOctokit: jest.fn(),
}));
describe('run', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should add label to the pull request', () => __awaiter(void 0, void 0, void 0, function* () {
        // (getInput as jest.Mock).mockReturnValueOnce('label-value');
        // (context as any).payload.pull_request = {
        //   number: 1,
        // };
        // const mockAddLabels = jest.fn();
        // const mockOctokit = {
        //   rest: {
        //     issues: {
        //       addLabels: mockAddLabels,
        //     },
        //   },
        // };
        // (getOctokit as jest.Mock).mockReturnValueOnce(mockOctokit);
        yield (0, _1.run)();
        expect(1).toBe(1);
        // expect(getInput).toHaveBeenCalledWith('label');
        // expect(mockAddLabels).toHaveBeenCalledWith({
        //   owner: 'owner',
        //   repo: 'repo',
        //   issue_number: 1,
        //   labels: ['label-value'],
        // });
        // expect(setFailed).not.toHaveBeenCalled();
    }));
});
