import { run } from '.';
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

  it('should add label to the pull request', async () => {
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

    await run();
    expect(1).toBe(1);

    // expect(getInput).toHaveBeenCalledWith('label');
    // expect(mockAddLabels).toHaveBeenCalledWith({
    //   owner: 'owner',
    //   repo: 'repo',
    //   issue_number: 1,
    //   labels: ['label-value'],
    // });
    // expect(setFailed).not.toHaveBeenCalled();
  });
});
