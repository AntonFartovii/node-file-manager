import process from 'node:process'

import {cd} from './commands/cd.js';
import {up} from './commands/up.js';
import {add} from './commands/add.js';
import {cat} from './commands/cat.js';
import {cp} from './commands/cp.js';
import {ls} from './commands/ls.js';
import {mv} from './commands/mv.js';
import {rm} from './commands/rm.js';
import {rn} from './commands/rn.js';
import {hash} from './commands/hash.js';
import {osFn} from './commands/os.js';
import {compress} from './commands/compress.js';
import {decompress} from './commands/decompress.js'

export const commandsRouter = {
    'cd': cd,
    'up': up,
    'add': add,
    'cat': cat,
    'cp': cp,
    'ls': ls,
    'mv': mv,
    'rm': rm,
    'rn': rn,
    '.exit': () => {
        process.exit(0);
    },
    'hash': hash,
    'os': osFn,
    'compress': compress,
    'decompress': decompress,
}