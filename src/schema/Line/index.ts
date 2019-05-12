import { LineResolvers } from '../../modules/types';
import { getRoutesFromLineId } from '../../modules/graph';
import { SUPER_LONG_CACHE_DURATION } from '../../modules/cache';

export const Line: LineResolvers = {
  routes: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SUPER_LONG_CACHE_DURATION });
    return getRoutesFromLineId({ lineId: parent.id, context });
  },
};
