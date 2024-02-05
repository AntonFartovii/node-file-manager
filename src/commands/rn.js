import {rename, access} from 'fs/promises';
import {resolve} from 'path';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const rn = async(args) => {
  let [from, to, ...empty] = args;

  if (!to.length || empty.length) {
    return stdout.write(messages.inval + '\n')
  }
  try {
    await access (resolve(from));
    await rename(resolve(from), resolve(to));
  } catch {
    return stdout.write(messages.fail + '\n');
  }
}

// rn path_to_file new_filename
// Rename file (content should remain unchanged):

