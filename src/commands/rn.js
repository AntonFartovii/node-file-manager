import {rename} from 'fs/promises';
import {resolve} from 'path';
import {messages} from '../messages.js';
import {stdout} from 'node:process';
import {checkFile} from "../utils.js";

export const rn = async(args) => {
  let [from, to, ...empty] = args;

  if (!to || empty.length) {
    return stdout.write(messages.inval)
  }
  try {
    const isFile = await checkFile(from);
    if (!isFile) {
      return stdout.write(messages.fail);
    }
    await rename(resolve(from), resolve(to));
  } catch {
    return stdout.write(messages.fail);
  }
}

// rn path_to_file new_filename
// Rename file (content should remain unchanged):

