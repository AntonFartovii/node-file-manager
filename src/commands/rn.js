import {rename, access} from 'fs/promises';
import {resolve} from 'path';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const rn = async(args) => {
  let [from, to, ...empty] = args;

  if (!to || empty.length) {
    return stdout.write(messages.inval)
  }
  try {
    await access (resolve(from));
    await rename(resolve(from), resolve(to));
  } catch {
    return stdout.write(messages.fail);
  }
}

// rn path_to_file new_filename
// Rename file (content should remain unchanged):

