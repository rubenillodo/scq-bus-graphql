import { RouteResolvers } from '../../modules/types';
import { getLineFromLineId, getStopFromStopId } from '../../modules/graph';

export const Route: RouteResolvers = {
  line: async (parent, _args, context) => {
    const lineId = parent.id.split('-')[0];
    return getLineFromLineId({ lineId, context });
  },
  stops: async (parent, _args, context) => {
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
