import { RESTDataSource } from 'apollo-datasource-rest';
import { LinesResponse } from './LinesResponse';
import { LineResponse } from './LineResponse';
import { StopResponse } from './StopResponse';

export class OfficialApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://app.tussa.org/tussa/api/';
  }

  async getLines(): Promise<LinesResponse> {
    return this.get<LinesResponse>(`lineas`);
  }

  async getLine({ id }: { id: number | string }): Promise<LineResponse> {
    return this.get<LineResponse>(`lineas/${id}`);
  }

  async getStop({ id }: { id: number | string }): Promise<StopResponse> {
    return this.get<StopResponse>(`paradas/${id}`);
  }
}
