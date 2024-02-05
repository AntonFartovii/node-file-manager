import {stdout} from 'node:process';
import {resolve} from 'path';
import {createWriteStream, constants} from 'fs';
import {access} from 'fs/promises';
import {messages} from '../messages.js';

export const add = async (args) => {

    let [from, ...empty] = args;
    if (from.length === 0 || empty.length) {
        return stdout.write(messages.inval);
    }

    const filePath = resolve(from);
    try {
        await access( filePath, constants.F_OK);
    } catch {
        const writeStream = createWriteStream(filePath);
        writeStream.on('error', () => {
            return stdout.write(messages.fail);
        })
        writeStream.write('');
        writeStream.end('');
    }


}

// add new_file_name
// Task: Create empty file in current working directory:

// test commands:
// add fartovii.txt
// add C:\Users\fartovii.txt'
// add 'C:/Users/fartovii.txt'

// Invalid input - неверная команда (отсутствует путь) или лишние аргументы
// Operation filed - не существует например папку указанная в пути или существует уже файл (защита от перезаписи)

