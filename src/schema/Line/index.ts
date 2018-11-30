import { LineResolvers } from '../../modules/types';

export const Line: LineResolvers = {
  routes: async (parent, _args, { dataSources: { officialApi } }) => {
    const response = await officialApi.getLine({ id: parent.id });

    return response.trayectos.map(route => ({
      name: route.nombre,
      stops: route.paradas.map(stop => ({
        id: `${stop.id}`,
        name: stop.nombre,
        areaName: stop.zona,
        location: {
          latitude: stop.coordenadas.latitud,
          longitude: stop.coordenadas.longitud,
        },
      })),
    }));
  },
};
