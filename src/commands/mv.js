import {unlink} from 'fs/promises';
import {resolve} from 'path';
import {createReadStream, createWriteStream} from 'fs';
import {getFileName} from '../utils.js';
import {access} from 'fs/promises';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const mv = async (args) => {
        const [from, to, ...empty] = args;

        if (!to || !from || empty.length) {
                return stdout.write(messages.inval);
        }

        const filename = getFileName(from);

        try {
                await access(resolve(from));
                await access(resolve(to));
                const readStream  = createReadStream(resolve(from));
                const writeStream = createWriteStream(resolve(to, filename));

                writeStream.on('error', () => {
                        return stdout.write(messages.fail);
                });

                readStream.on('data', (chunk) => {
                        writeStream.write(chunk);
                });

                readStream.on('error', () => {
                        return stdout.write(messages.fail);
                });

                readStream.on('end',  () => {
                        writeStream.end();
                })

                readStream.on('close',  () => {
                        unlink(resolve(from));
                });
        } catch  {
                return stdout.write(messages.fail);
        }
}

// mv path_to_file path_to_new_directory
// Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams):

// mv C:/Users/anton/Test/555.txt C:/Users/anton/Test2/555.txt
