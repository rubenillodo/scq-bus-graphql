import { OfficialApi } from '../tussa';

export interface AppContext {
  dataSources: {
    officialApi: OfficialApi;
  };
}
