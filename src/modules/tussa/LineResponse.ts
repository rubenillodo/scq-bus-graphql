export interface LineResponse {
  id: number;
  codigo: string;
  sinoptico: string;
  nombre: string;
  informacion: string;
  estilo: string;
  trayectos: ApiJourney[];
}

export interface ApiJourney {
  nombre: string;
  sentido: string;
  paradas: ApiStop[];
}

export interface ApiStop {
  id: number;
  codigo: string;
  nombre: string;
  zona: string;
  extraordinaria: boolean;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
}
