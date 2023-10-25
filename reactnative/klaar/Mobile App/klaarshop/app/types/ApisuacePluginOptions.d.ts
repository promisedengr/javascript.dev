declare module 'reactotron-apisauce' {
  import { Reactotron } from 'reactotron-core-client';

  export interface ApisuacePluginOptions {
    ignoreContentTypes?: any;
  }

  const _default: (
    options: ApisuacePluginOptions,
  ) => (
    reactotron: Reactotron,
  ) => {
    features: {
      apisauce: (source: any) => any;
    };
  };
  export default _default;
}
