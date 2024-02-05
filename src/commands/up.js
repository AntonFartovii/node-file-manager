import {chdir,stdout} from 'node:process';
import {messages} from '../messages.js';

export async function up(args) {
  if (args.length !== 0) {
    return stdout.write(messages.inval + '\n');
  }
  await chdir('..');
}

// up
// Go upper from current directory
// (when you are in the root folder this operation shouldn't change working directory)
