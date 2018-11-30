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
};
