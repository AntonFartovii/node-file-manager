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
const userName = fileManager.userName;

readline.on('line', async (data) => {
    readline.pause();
    const [command, ...args] = parseArgs(data);
    await fileManager.execCommand(command, args);
    output.write(messages.curDir());
    readline.prompt();
});

readline.on('SIGINT', () => {
    readline.close();
});

readline.on('close', () => {
    process.exit(0);
});

readline.on('error', () => {
    output.write(messages.fatal);
});

process.on('exit', () => {
    output.write(messages.bye(userName));
});
