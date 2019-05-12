import { QueryResolvers, Stop } from '../../modules/types';
import {
  getRoutesFromLineId,
  getLineFromLineId,
  getStopFromStopId,
} from '../../modules/graph';
import { SUPER_LONG_CACHE_DURATION } from '../../modules/cache';

export const Query: QueryResolvers = {
  lines: async (_parent, _args, { dataSources: { officialApi } }, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    const response = await officialApi.getLines();

    return response.map(line => ({
      id: `${line.id}`,
      name: line.sinoptico,
      description: line.nombre,
      color: line.estilo,
      routes: [],
    }));
  },
  line: async (_parent, { id }, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });
    return getLineFromLineId({ lineId: id, context });
  },
  routes: async (_parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    const lineIds = (await context.dataSources.officialApi.getLines()).map(
      ({ id }) => `${id}`,
    );

    return (await Promise.all(
      lineIds.map(async id => getRoutesFromLineId({ lineId: id, context })),
    )).flat();
  },
  stops: async (_parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    const lineIds = (await context.dataSources.officialApi.getLines()).map(
      ({ id }) => `${id}`,
    );

    const routes = (await Promise.all(
      lineIds.map(async id => getRoutesFromLineId({ lineId: id, context })),
    )).flat();

    const stops: Stop[] = [];

    routes.forEach(route => {
      route.stops.forEach(stop => {
        if (stops.find(({ id }) => id === stop.id)) {
          return;
        }

        stops.push(stop);
      });
    });

    return stops;
  },
  stop: async (_parent, { id }, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });
    return getStopFromStopId({ stopId: id, context });
  },
};
