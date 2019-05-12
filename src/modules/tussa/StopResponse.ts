export interface StopResponse {
  id: number;
  codigo: string;
  nombre: string;
  zona: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  lineas: ApiLine[];
}

export interface ApiLine {
  id: number;
  sinoptico: string;
  nombre: string;
  estilo: string;
  proximoPaso: string;
  minutosProximoPaso: number;
}
