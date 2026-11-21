import chalk from 'chalk';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

// eslint-disable-next-line @typescript-eslint/no-var-requires -- require() to avoid package.json being included in build output.
const packageJson = require('../package.json');

import { extname, HarRequest, HTTPSnippet } from './httpsnippet';
import { ClientId, TargetId, targets } from './targets/targets';

const { cyan, green, red, yellow } = chalk;

const bad = (message: string) => console.error(`${red('✖')} ${message}`);
const good = (message: string) => console.log(`${green('✓')} ${message}`);

interface CliOptions {
  target: TargetId;
  client?: ClientId;
  output?: string;
  harFilePaths: string[];
  options?: any;
}

export const go = () =>
  yargs(hideBin(process.argv))
    .version(packageJson.version)
    .command<CliOptions>(
      '$0 <harFilePaths..>',
      'the default command',
      builder => {
        builder
          .positional('harFilePaths', {
            type: 'string',
            describe: 'HAR input files',
          })
          .option('target', {
            alias: 't',
            type: 'string',
            description: 'target output',
            requiresArg: true,
          })
          .option('client', {
            alias: 'c',
            type: 'string',
            description: 'language client',
            requiresArg: true,
          })
          .option('output', {
            alias: 'o',
            type: 'string',
            description: 'write output to directory',
          })
          .option('options', {
            alias: 'x',
            type: 'string',
            description: 'provide extra options for the target/client',
            requiresArg: true,
          })
          .demandOption(['target'], 'please provide a target')
          .strict()
          .showHelpOnFail(true)
          .help();
      },
      ({ target: targetId, client, output, options, harFilePaths }) => {
        try {
          if (options) {
            options = JSON.parse(options);
          }
        } catch (error) {
          if (error instanceof Error) {
            bad(`failed to parse --options as JSON: ${red(error.message)}`);
          }
          return;
        }

        if (output) {
          mkdirSync(output, { recursive: true });
        }

        for (const harFilePath of harFilePaths) {
          const har = JSON.parse(readFileSync(harFilePath, 'utf8')) as HarRequest;
          const result = new HTTPSnippet(har).convert(targetId, client, options);

          if (!result) {
            throw new Error('something went wrong');
          }

          if (!output) {
            console.log(result);
            continue;
          }

          const file = path.parse(harFilePath).name;
          const writeFilePath = path.join(output, `${file}${extname(targetId)}`);
          writeFileSync(writeFilePath, String(result));
          const target = targets[targetId];
          const clientId = target.clientsById[client || target.info.default].info.key;
          good(
            `converted ${cyan.bold(harFilePath)} with ${yellow(targetId)}[${yellow(
              clientId,
            )}] at ${cyan(writeFilePath)}\n\n${result}`,
          );
        }
      },
    )
    .example('$0 my_har.json', '--target rust --client actix --output my_src_directory').argv;
