import { AppContext } from '../types/context';
import { Route, Stop, Direction } from '../types';
import { ApolloError } from 'apollo-server-errors';

export interface Params {
  lineId: string;
  context: AppContext;
}

export const getRoutesFromLineId = async ({
  lineId,
  context,
}: Params): Promise<Route[]> => {
  const response = await context.dataSources.officialApi.getLine({
    id: lineId,
  });

  return response.trayectos.map(route => {
    const direction = getDirection(route.sentido);
    return {
      id: `${lineId}-${direction}`,
      name: route.nombre,
      direction,
      stops: route.paradas.map(
        stop =>
          ({
            id: `${stop.id}`,
            name: stop.nombre,
            areaName: stop.zona,
            location: {
              latitude: stop.coordenadas.latitud,
              longitude: stop.coordenadas.longitud,
            },
          } as Stop),
      ),
    } as Route;
  });
};

const getDirection = (value: string) => {
  if (/ida/i.test(value)) return Direction.Outward;
  if (/vuelta/i.test(value)) return Direction.Return;
  throw new ApolloError(
    `Got an invalid direction from the official API: "${value}"`,
    'INVALID_DIRECTION',
  );
};
