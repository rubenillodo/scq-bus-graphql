export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Line = {
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  routes: Array<Route>;
};

export type Location = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  lines: Array<Line>;
};

export type Route = {
  name: Scalars['String'];
  stops: Array<Stop>;
};

export type Stop = {
  id: Scalars['ID'];
  name: Scalars['String'];
  areaName?: Maybe<Scalars['String']>;
  location: Location;
};
import { AppContext } from './context';

import { GraphQLResolveInfo } from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  Line: Line;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Route: Route;
  Stop: Stop;
  Location: Location;
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
};

export type LineResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes['Line']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  routes?: Resolver<Array<ResolversTypes['Route']>, ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes['Location']
> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes['Query']
> = {
  lines?: Resolver<Array<ResolversTypes['Line']>, ParentType, ContextType>;
};

export type RouteResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes['Route']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stops?: Resolver<Array<ResolversTypes['Stop']>, ParentType, ContextType>;
};

export type StopResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes['Stop']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  areaName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  Line?: LineResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Route?: RouteResolvers<ContextType>;
  Stop?: StopResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppContext> = Resolvers<ContextType>;
