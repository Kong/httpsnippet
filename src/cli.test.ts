import { mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { go } from './cli';

const fixtureDir = path.join(__dirname, 'fixtures', 'requests');
const shortHar = path.join(fixtureDir, 'short.json');
const httpsHar = path.join(fixtureDir, 'https.json');

const runCli = (...args: string[]) => {
  const originalArgv = process.argv;
  process.argv = [process.execPath, 'httpsnippet', ...args];
  try {
    return go();
  } finally {
    process.argv = originalArgv;
  }
};

describe('command line', () => {
  it('writes a snippet for each input file to a new output directory', () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), 'httpsnippet-'));
    const output = path.join(tempDir, 'snippets');
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(process, 'exit').mockImplementation(code => {
      throw new Error(`CLI exited with status ${code}`);
    });

    try {
      runCli(shortHar, httpsHar, '--target', 'shell', '--client', 'curl', '--output', output);

      expect(readFileSync(path.join(output, 'short.sh'), 'utf8')).toContain(
        'http://mockbin.com/har',
      );
      expect(readFileSync(path.join(output, 'https.sh'), 'utf8')).toContain(
        'https://mockbin.com/har',
      );
    } finally {
      jest.restoreAllMocks();
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('prints a single input snippet to stdout when no output directory is given', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    try {
      runCli(shortHar, '--target', 'shell');

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(expect.stringContaining('http://mockbin.com/har'));
    } finally {
      log.mockRestore();
    }
  });
});
