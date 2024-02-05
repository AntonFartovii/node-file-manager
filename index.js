import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import process from 'node:process';

const readline = createInterface({input, output});
readline.on('line', async (data) => {
    readline.pause();
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


