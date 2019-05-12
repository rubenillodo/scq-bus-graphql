import { QueryResolvers } from '../../modules/types';
import { getRoutesFromLineId } from '../../modules/graph';

export const Query: QueryResolvers = {
  lines: async (_parent, _args, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLines();

    return response.map(line => ({
      id: `${line.id}`,
      name: line.sinoptico,
      description: line.nombre,
      color: line.estilo,
      routes: [],
    }));
  },
  line: async (_parent, { id }, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLine({ id });

    return {
      id: `${response.id}`,
      name: response.sinoptico,
      description: response.nombre,
      color: response.estilo,
      routes: [],
    };
  },
  routes: async (_parent, _args, context) => {
    const lineIds = (await context.dataSources.officialApi.getLines()).map(
      ({ id }) => `${id}`,
    );

    return (await Promise.all(
      lineIds.map(async id => getRoutesFromLineId({ lineId: id, context })),
    )).flat();
  },
};
