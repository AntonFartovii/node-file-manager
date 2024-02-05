import {cwd} from 'node:process';
export const messages = {
    'curDir': () => {
        return `You are currently in ${cwd()}\n`;
    },
    'welcome': (name) => {
        return `Welcome to the File Manager, ${name}!\n`;
    },
    'bye': (name) => {
        return `Thank you for using File Manager, ${name}, goodbye!\n`;
    },
    'inval':  `Invalid input\n`,
    'fail':   `Operation failed\n`,
    'test':    `Testing...`,
};