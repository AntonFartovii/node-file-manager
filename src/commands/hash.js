import {createReadStream} from 'fs'
import {stdout} from 'node:process';
import {resolve} from 'path';
import {createHash} from 'crypto';
import {messages} from '../messages.js';
import {checkFile} from '../utils.js';

export const hash = async (args) => {

    let [from, ...empty] = args;
    if (!from || empty.length) {
        return stdout.write(messages.inval)
    }
    let filePath = resolve(from);
    const isFile = await checkFile(from);
    if (!isFile) {
        return stdout.write(messages.fail);
    }
    const stream = createReadStream(filePath);

    let content = '';
    stream.on('error',() => {
    });

    stream.on('data', (chunk)=> {
        content += chunk;
    });

    stream.on('end',() => {
        const hash = createHash('sha256').update(content).digest('hex');
        stdout.write (`File's hash:\n`);
        stdout.write (hash + '\n' );
        return stdout.write(messages.curDir());
    });
}

// Invalid input - неверная команда или лишние аргументы
// Operation failed - не существует файл
