import {access} from 'fs/promises';
import {resolve} from 'path';
import {chdir, stdout} from 'node:process';
import {stat} from 'fs/promises';
import {messages} from '../messages.js';

export async function cd(args) {
        let [src, ...empty] = args;
        if (src === '' || empty.length ) {
                return stdout.write(messages.inval)
        }

        const pathToDir = resolve(src);
        try {
                await access (pathToDir);
        } catch {
                return stdout.write(messages.fail)
        }

        let stats = await stat(pathToDir);
        if (stats.isFile()) {
                return stdout.write(messages.fail)
        }

        await chdir( pathToDir );
}

// cd path_to_directory
// cd 'Some folder'
// cd directory/directory
// cd 'directory\directory'

// Go to dedicated folder from current directory (path_to_directory can be relative or absolute)

// Invalid input - incorrect command
// Operation failed - not exist path
