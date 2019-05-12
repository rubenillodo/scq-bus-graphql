import { RouteResolvers, Line } from '../../modules/types';
import { ApolloError } from 'apollo-server-errors';

export const Route: RouteResolvers = {
  line: async (parent, _args, { dataSources: { officialApi } }) => {
    const lineId = parent.id.split('-')[0];
    const response = await officialApi.getLines();

    const line = response.find(({ id }) => `${id}` === lineId);
    if (!line) {
      throw new ApolloError(
        `Couldn't find line associated with route "${parent.id}"`,
        'LINE_NOT_FOUND',
      );
    }

    return {
      id: `${line.id}`,
      name: line.sinoptico,
      description: line.nombre,
      color: line.estilo,
    } as Line;
  },
};
