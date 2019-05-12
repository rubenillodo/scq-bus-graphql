import { Query } from './Query';
import { Line } from './Line';
import { Route } from './Route';
import { DateTime } from './DateTime';
import { Stop } from './Stop';
import { Resolvers } from '../modules/types';

export const resolvers: Resolvers = {
  Query,
  Line,
  Route,
  Stop,
  DateTime,
};
