import { RouteResolvers } from '../../modules/types';
import { getLineFromLineId } from '../../modules/graph';

export const Route: RouteResolvers = {
  line: async (parent, _args, context) => {
    const lineId = parent.id.split('-')[0];
    return getLineFromLineId({ lineId, context });
  },
};
