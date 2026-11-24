export interface LlibreApi {
  id: string;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: string;
  data_afegida: string;
  valoracio: string | number;
  destacat?: boolean;
}