import { StopResolvers } from '../../modules/types';
import { getStopFromStopId } from '../../modules/graph';
import {
  SUPER_LONG_CACHE_DURATION,
  SHORT_CACHE_DURATION,
} from '../../modules/cache';

export const Stop: StopResolvers = {
  routes: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });

    const response = await getStopFromStopId({ stopId: parent.id, context });
    return response.routes;
  },
  arriving: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SHORT_CACHE_DURATION });
    const response = await getStopFromStopId({ stopId: parent.id, context });
    return response.arriving;
  },
};
