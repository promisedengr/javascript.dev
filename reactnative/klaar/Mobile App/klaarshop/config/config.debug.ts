// eslint-disable-next-line import/no-unresolved
import { AppConfig } from 'AppConfig';

const config: AppConfig = {
  useReactotron: true,  
  systemId: 'klaarshop',
  authURL: 'http://167.99.41.6:5000/api/auth/login',
  baseURL: 'http://167.99.41.6:5000/api',
};

export { config };
