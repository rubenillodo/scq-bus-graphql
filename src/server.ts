import { ApolloServer } from 'apollo-server';

import { resolvers, typeDefs } from './schema';
import { OfficialApi } from './modules/tussa';

import 'apollo-cache-control';

export const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
  dataSources: () => ({ officialApi: new OfficialApi() }),
  context: ({ req }: { req: any }) => {
    const auth = (req.headers.authorization || '')
      .replace('Bearer ', '')
      .trim();
    return { auth };
  },
});
