import {createBrotliDecompress} from 'zlib';
import {createReadStream, createWriteStream} from 'fs';
import {access} from 'fs/promises';
import {resolve} from 'path';
import {getFileName} from '../utils.js';
import {messages} from '../messages.js';
import {stdout} from 'node:process';

export const decompress = async (args) => {

    const [from, to, ...empty] = args;
    if (to.length === 0 || from.length === 0 || empty.length ) {
        return stdout.write(messages.inval + '\n');
    }
    try {
        await access(resolve(from));
        await access(resolve(to));
    } catch {
        return stdout.write(messages.fail + '\n');
    }
    const fileName = getFileName(from);
    const brotli = createBrotliDecompress();
    const rs = createReadStream(resolve(from));
    const ws = createWriteStream(resolve(to, fileName.replace('.br', '')));

    rs.pipe(brotli).pipe(ws);
}

// compress path_to_file path_to_destination
// Compress file (using Brotli algorithm, should be done using Streams API)

