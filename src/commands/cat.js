import {stdout} from 'node:process';
import {createReadStream} from 'fs';
import {resolve} from 'path';
import {messages} from '../messages.js';
import {checkFile} from "../utils.js";

export const cat = async (args) => {
    let [from, ...empty] = args;
    if (!from || empty.length ) {
        return stdout.write(messages.inval);
    }
    const filePath = resolve(from);
    const isFile = await checkFile(filePath);
    if (!isFile) {
        stdout.write(messages.fail);
    }

    const stream = createReadStream(filePath);

    let body = ''
    stream.on('data', (chunk) => {
        body += chunk;
    });

    stream.on('end', () => {
        stdout.write (`File's content:\n`);
        stdout.write (body + '\n');
        return stdout.write(messages.curDir());
    });

    stream.on('error', () => {
    });

    stream.on('finish', () => {
        return stdout.write(messages.curDir());
    });
}

// cat path_to_file
// cat 'path_to_file'

// Read file and print it's content in console (should be done using Readable stream)
// Invalid input - неверная команда (отсутствует путь) или лишние аргументы
// Operation filed - не существует файл или путь
