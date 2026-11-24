import { LlibreApi } from '../models/llibre-api.model';
import { CategoriaLlibre, Llibre } from '../models/llibre.model';

const CATEGORIES: CategoriaLlibre[] = [
  'Novel·la', 'Fantasia', 'Ciència-ficció', 'Història', 'Poesia', 'Ciència',
];

function normalitzaCategoria(valor: string): CategoriaLlibre {
  const net = (valor ?? '').trim().toLowerCase();
  return CATEGORIES.find((c) => c.toLowerCase() === net) ?? 'Novel·la';
}

function numeroSegur(valor: string | number): number {
  const n = Number(valor);
  return Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;
}

export function adaptarLlibreApi(api: LlibreApi): Llibre {
  return {
    id: Number(api.id),
    titol: (api.titol ?? '').trim(),
    autor: (api.autor ?? '').trim(),
    descripcio: (api.descripcio ?? '').trim() || 'Sense descripció',
    categoria: normalitzaCategoria(api.categoria),
    dataAfegida: (api.data_afegida ?? '').trim(),
    valoracio: numeroSegur(api.valoracio),
    destacat: api.destacat === true,
  };
}

export function adaptarLlibresApi(llista: LlibreApi[]): Llibre[] {
  return llista.map(adaptarLlibreApi);
}