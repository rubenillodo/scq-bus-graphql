import { StopResolvers } from '../../modules/types';
import { getStopFromStopId } from '../../modules/graph';

export const Stop: StopResolvers = {
  routes: async (parent, _args, context) => {
    const response = await getStopFromStopId({ stopId: parent.id, context });
    return response.routes;
  },
  arriving: async (parent, _args, context) => {
    const response = await getStopFromStopId({ stopId: parent.id, context });
    return response.arriving;
  },
};
