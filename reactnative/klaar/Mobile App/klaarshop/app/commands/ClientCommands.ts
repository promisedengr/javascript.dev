import { CustomCommand } from 'reactotron-core-client';
import { ClientActions } from '~/logic/client/ClientRedux';
import { store } from '~/store/store';

const GetClientData: CustomCommand = {
  command: 'GetClientData',  
  handler: () => {
    store.dispatch(
    ClientActions.get_data.request()
    )
  }
};

const commands = [
    GetClientData
];

export { commands };
