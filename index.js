import {createInterface} from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';
import process from 'node:process';
import {messages} from './src/messages.js';
import {FileManager} from './src/app.js';
import {parseArgs} from './src/utils.js';
import {commandsRouter} from "./src/commandsRouter.js";
const readline = createInterface({input, output});

const fileManager = new FileManager();
fileManager.useCommandRouter(commandsRouter);

readline.on('line', async (data) => {
    readline.pause();
    const [command, ...args] = parseArgs(data);
    try {
        await fileManager.execCommand(command, args);
    } catch (error) {
        output.write(messages.inval);
    }
    output.write(messages.curDir);
    readline.prompt();
})

readline.on('SIGINT', () => {
    readline.close();
})

readline.on('close', () => {
    process.exit(0);
})

readline.on('error', () => {
});

process.on('exit', () => {
});


