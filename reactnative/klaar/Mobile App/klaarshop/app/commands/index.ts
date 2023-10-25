import { CustomCommand } from 'reactotron-core-client';
import { reactotron } from '~/config/ReactotronConfig';

type Command = CustomCommand & {removeHandler?: () => void};
const commands: Command[] = 
[
  ...require('./UserLoginCommand').commands, 
  ...require('./ClientCommands').commands, 
  ...require('./UserInteractionCommands').commands,
  ...require('./ProductCommands').commands,
  ...require('./ProfileCommands').commands
];

function registerCommands() {
  console.log('registerCommands');
  commands.forEach(command => {
    if (command.removeHandler) {
      command.removeHandler();
    }
    command.removeHandler = reactotron.onCustomCommand(command);
  });
}
export { registerCommands };

