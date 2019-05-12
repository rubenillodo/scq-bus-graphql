import { RouteResolvers } from '../../modules/types';
import { getLineFromLineId, getStopFromStopId } from '../../modules/graph';
import { SUPER_LONG_CACHE_DURATION } from '../../modules/cache';

export const Route: RouteResolvers = {
  line: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    const lineId = parent.id.split('-')[0];
    return getLineFromLineId({ lineId, context });
  },
  stops: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    if (
      parent.stops[0].location &&
      typeof parent.stops[0].location.latitude === 'number'
    ) {
      return parent.stops;
    }

    return Promise.all(
      parent.stops.map(async ({ id }) =>
        getStopFromStopId({ stopId: id, context }),
      ),
    );
  },
};
