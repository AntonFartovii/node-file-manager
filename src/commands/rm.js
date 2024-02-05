import {unlink, access} from 'fs/promises';
import {resolve} from 'path';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const rm = async (args) => {
  let [from, ...empty] = args;
  if ( from.length === 0 || empty.length ) {
    return stdout.write(messages.inval);
  }

  const filePath = resolve(from);
  try {
    await access(filePath);
  } catch {
    return stdout.write(messages.fail);
  }
  await unlink(filePath);
}

// rm path_to_file
// Invalid input - неверная команда (отсутствует путь) или лишние аргументы
