import { ArrivingResolvers } from '../../modules/types';
import { getLineFromLineId } from '../../modules/graph';

export const Arriving: ArrivingResolvers = {
  line: async (parent, _args, context) => {
    return getLineFromLineId({ lineId: parent.line.id, context });
  },
};
