import {resolve} from 'path';
import {access} from 'fs/promises';
import {createReadStream, createWriteStream} from 'fs';
import {getFileName} from '../utils.js';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const cp = async (args, deleteFrom= false) => {
    const [from, to, ...empty] = args;
    const filename = getFileName(from);

    if (to.length === 0 || from.length === 0 || empty.length ) {
        return stdout.write(messages.inval);
    }
    try {
        await access(resolve(from));
        await access(resolve(to));
        const readStream  = createReadStream(resolve(from));
        const writeStream = createWriteStream(resolve(to, filename));

        writeStream.on('error', () => {
            return stdout.write(messages.fail);
        })
        readStream.on('data', (chunk) => {
            writeStream.write(chunk);
        });
        readStream.on('error', () => {
            return stdout.write(messages.fail);
        });
        readStream.on('end',  () => {
            writeStream.end();
        });
    } catch  {
        return stdout.write(messages.fail)
    }
}

// cp path_to_file path_to_new_directory
// cp anyfile.txt path_to_new_directory

// Operation failed - если не указан путь или не существует файл

