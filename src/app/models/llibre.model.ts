export type CategoriaLlibre =
  | 'Novel·la'
  | 'Fantasia'
  | 'Ciència-ficció'
  | 'Història'
  | 'Poesia'
  | 'Ciència';

export interface Llibre {
  id: number;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: CategoriaLlibre;
  dataAfegida: string; // 'AAAA-MM-DD'
  valoracio: number; // de 0 a 5
  destacat?: boolean;
}