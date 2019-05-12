import { AppContext } from '../types/context';
import { Stop, Arriving } from '../types';
import { DateTime, IANAZone } from 'luxon';

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
    arriving: response.lineas.map(
      ({ id, proximoPaso }) =>
        ({
          line: { id: `${id}` },
          arriveAt: DateTime.fromFormat(proximoPaso, 'yyyy-MM-dd HH:mm', {
            zone: new IANAZone('Europe/Madrid'),
          }),
        } as Arriving),
    ),
  };
};
