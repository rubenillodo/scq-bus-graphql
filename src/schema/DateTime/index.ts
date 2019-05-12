import { DateTime as Luxon } from 'luxon';
import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';
import { ApolloError } from 'apollo-server';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  parseValue(value) {
    return Luxon.fromISO(value);
  },
  serialize(value) {
    return value.toISO();
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.INT:
        return Luxon.fromMillis(parseInt(ast.value, 10));
      case Kind.STRING:
        return Luxon.fromISO(ast.value);
      default:
        throw new ApolloError(
          `Invalid date literal type "${ast.kind}"`,
          'INVALID_DATE',
        );
    }
  },
} as GraphQLScalarTypeConfig<Luxon, string>);
