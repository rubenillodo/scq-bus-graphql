export interface ApiLine {
  id: number;
  codigo: string;
  sinoptico: string;
  nombre: string;
  empresa: string;
  incidencias: number;
  estilo: string;
}

export type LinesResponse = ApiLine[];
