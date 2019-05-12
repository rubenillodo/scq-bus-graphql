import { LineResolvers, Route, Stop, Direction } from '../../modules/types';
import { ApolloError } from 'apollo-server-errors';

const getDirection = (value: string) => {
  if (/ida/i.test(value)) return Direction.Outward;
  if (/vuelta/i.test(value)) return Direction.Return;
  throw new ApolloError(
    `Got an invalid direction from the official API: "${value}"`,
    'INVALID_DIRECTION',
  );
};

export const Line: LineResolvers = {
  routes: async (parent, _args, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLine({ id: parent.id });

    return response.trayectos.map(route => {
      const direction = getDirection(route.sentido);
      return {
        id: `${parent.id}-${direction}`,
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
  },
};
