import process, {chdir, stdout} from 'node:process';
import {messages} from './messages.js';

export class FileManager {
  constructor() {
    this.function = {};
    this.homeDir = '';
    this.userName = '';
    this.prepare();
    this.init();
  }

  prepare() {
    this.setStartingDir();
    this.setUsername();
  }

  setUsername() {
    const argv = process.argv.slice(2).toString().trim();
    this.userName = !argv.startsWith('--') ?
      'Unknown' :
      argv.split('=')[1];
  }

  init() {
    stdout.write(messages.welcome + ' ' + this.userName || 'Unknown user');
    stdout.write(messages.curDir);
  }

  getHomedir() {
    return process.env.HOME || process.env.USERPROFILE;
  }

  setStartingDir() {
    this.homeDir = this.getHomedir();
    try {
      chdir (this.homeDir);
    } catch (err) {
      stdout.write(`chdir: ${err}`);
    }
  }

  async execCommand(name, args) {
    await this.function[name](args);
  }

  on(command, fn) {
    this.function[command] = fn;
  }
}
