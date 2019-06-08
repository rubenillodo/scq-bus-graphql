import { StopResolvers, Route } from '../../modules/types';
import { getStopFromStopId, getRoutesFromLineId } from '../../modules/graph';
import { SHORT_CACHE_DURATION } from '../../modules/cache';

export const Stop: StopResolvers = {
  arriving: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SHORT_CACHE_DURATION });
    const response = await getStopFromStopId({ stopId: parent.id, context });
    return response.arriving;
  },
  routes: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SHORT_CACHE_DURATION });

    const routes = (await Promise.all(
      (await context.dataSources.officialApi.getLines()).map(
        async ({ id }) =>
          await getRoutesFromLineId({ lineId: `${id}`, context }),
      ),
    )).flat();

    const result: Route[] = [];

    for (const index in routes) {
      const route = routes[index];

      if (!route.stops.find(({ id }) => id === parent.id)) {
        continue;
      }

      if (result.find(({ id }) => id === route.id)) {
        continue;
      }

      result.push(route);
    }

    return result;
  },
};
