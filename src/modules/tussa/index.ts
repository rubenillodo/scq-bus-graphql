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
    const result = await this.get<LinesResponse>(`lineas`);
    return result.map(line => ({
      ...line,
      sinoptico: line.sinoptico.replace(/^l/i, ''),
    }));
  }

  async getLine({ id }: { id: number | string }): Promise<LineResponse> {
    const result = await this.get<LineResponse>(`lineas/${id}`);
    return {
      ...result,
      sinoptico: result.sinoptico.replace(/^l/i, ''),
    };
  }

  async getStop({ id }: { id: number | string }): Promise<StopResponse> {
    return this.get<StopResponse>(`paradas/${id}`);
  }
}
