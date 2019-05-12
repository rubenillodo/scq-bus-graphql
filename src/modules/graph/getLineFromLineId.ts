import { AppContext } from '../types/context';
import { Line } from '../types';

export interface Params {
  lineId: string;
  context: AppContext;
}

export const getLineFromLineId = async ({
  lineId,
  context,
}: Params): Promise<Line> => {
  const response = await context.dataSources.officialApi.getLine({
    id: lineId,
  });

  return {
    id: `${response.id}`,
    name: response.sinoptico,
    description: response.nombre,
    color: response.estilo,
    routes: [],
  };
};
