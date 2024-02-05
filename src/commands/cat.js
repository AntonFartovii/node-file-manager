import {stdout} from 'node:process';
import {createReadStream} from 'fs';
import {resolve} from 'path';
import {access} from 'fs/promises';
import {messages} from '../messages.js';

export const cat = async (args) => {
    let [from, ...empty] = args;
    if ( from.length === 0 || empty.length ) {
        return stdout.write(messages.inval + '\n');
    }

    const filePath = resolve(from);
    try {
        await access(filePath);
    } catch {
        stdout.write(messages.fail+'\n');
    }

    const stream = createReadStream(filePath);

    let body = ''
    stream.on('data', (chunk) => {
        body += chunk;
    });

    stream.on('end', () => {
        stdout.write (`File's content:\n`);
        stdout.write (body + '\n');
        return stdout.write(messages.curDir + '\n');
    });

    stream.on('error', () => {
        return stdout.write(messages.fail + '\n');
    });

    stream.on('finish', () => {
        return stdout.write(messages.curDir + '\n');
    });
}

// cat path_to_file
// cat 'path_to_file'

// Read file and print it's content in console (should be done using Readable stream)
// Invalid input - неверная команда (отсутствует путь) или лишние аргументы
// Operation filed - не существует файл или путь
