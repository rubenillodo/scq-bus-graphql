import { ArrivingResolvers } from '../../modules/types';
import { getLineFromLineId } from '../../modules/graph';
import { SHORT_CACHE_DURATION } from '../../modules/cache';

export const Arriving: ArrivingResolvers = {
  line: async (parent, _args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: SHORT_CACHE_DURATION });
    return getLineFromLineId({ lineId: parent.line.id, context });
  },
};
