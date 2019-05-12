import { LineResolvers } from '../../modules/types';
import { getRoutesFromLineId } from '../../modules/graph';

export const Line: LineResolvers = {
  routes: async (parent, _args, context) => {
    return getRoutesFromLineId({ lineId: parent.id, context });
  },
};
