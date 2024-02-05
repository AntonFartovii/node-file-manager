import {stdout} from 'node:process';
import * as os from 'os';
import {messages} from '../messages.js';

export const osFn = async (args) => {
    const [command] = args;
    switch (command) {
      case '--EOL': {
        stdout.write( JSON.stringify(os.EOL) + '\n' );
        break;
      }
      case '--cpus': {
        const cpusInfo = os.cpus()
        console.table(cpusInfo.map((cp) =>  {
          return {
            'Model': cp.model.trim(),
            'Speed': cp.speed/1000 + ' GHz',
          };
        }));
        break;
      }
      case '--homedir': {
        console.log(os.homedir());
        break;
      }
      case '--username': {
        console.log(os.userInfo().username);
        break;
      }
      case '--architecture': {
        console.log(os.arch());
        break;
      }
      default:
        return stdout.write(messages.inval);
        break;
    }
}
