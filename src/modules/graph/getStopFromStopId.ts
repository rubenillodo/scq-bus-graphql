import { AppContext } from '../types/context';
import { Stop } from '../types';

export interface Params {
  stopId: string;
  context: AppContext;
}

export const getStopFromStopId = async ({
  stopId,
  context,
}: Params): Promise<Stop> => {
  const response = await context.dataSources.officialApi.getStop({
    id: stopId,
  });

  return {
    id: stopId,
    name: response.nombre,
    areaName: response.zona,
    location: {
      latitude: response.coordenadas.latitud,
      longitude: response.coordenadas.longitud,
    },
  };
};
