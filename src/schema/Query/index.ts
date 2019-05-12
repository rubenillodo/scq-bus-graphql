import { QueryResolvers, Line } from '../../modules/types';

export const Query: QueryResolvers = {
  lines: async (_parent, _args, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLines();

    return response.map(
      line =>
        ({
          id: `${line.id}`,
          name: line.sinoptico,
          description: line.nombre,
          color: line.estilo,
        } as Line),
    );
  },
  line: async (_parent, { id }, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLine({ id });

    return {
      id: `${response.id}`,
      name: response.sinoptico,
      description: response.nombre,
      color: response.estilo,
    } as Line;
  },
};
