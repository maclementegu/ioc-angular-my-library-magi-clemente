import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';
import { adaptarLlibreApi, adaptarLlibresApi } from '../adaptadors/llibre.adaptador';
import { API_URL } from '../config/api.config';
import { LlibreApi } from '../models/llibre-api.model';
import { FiltresLlibre, Llibre } from '../models/llibre.model';

export type FaseCarrega = 'inactiu' | 'carregant' | 'exit' | 'error';

export interface EstatLlibres {
  fase: FaseCarrega;
  llibres: Llibre[];
  error?: string;
}

export type NouLlibre = Omit<Llibre, 'id' | 'dataAfegida'>;

@Service()
export class LlibreService {
  private readonly http = inject(HttpClient);
  private readonly urlLlibres = `${API_URL}/llibres`;
  private readonly criteris$ = new Subject<FiltresLlibre>();
  private darrersCriteris: FiltresLlibre = { text: '', categoria: '' };
  private readonly estatSignal = signal<EstatLlibres>({ fase: 'inactiu', llibres: [] });

  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$
      .pipe(
        tap((criteris) => {
          this.darrersCriteris = criteris;
          this.estatSignal.set({ fase: 'carregant', llibres: [] });
        }),
        switchMap((criteris) =>
          this.obtenirLlibres(criteris).pipe(
            map((llibres): EstatLlibres => ({ fase: 'exit', llibres })),
            catchError((err: HttpErrorResponse) =>
              of<EstatLlibres>({ fase: 'error', llibres: [], error: this.missatgeError(err) }),
            ),
          ),
        ),
      )
      .subscribe((estat) => this.estatSignal.set(estat));
  }

  cerca(criteris: FiltresLlibre): void {
    this.criteris$.next(criteris);
  }

  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }
    comptarResultats(terme: string): Observable<number> {
    return this.obtenirLlibres({ text: terme, categoria: '' }).pipe(map((llibres) => llibres.length));
  }

  crearLlibre(nou: NouLlibre): Observable<Llibre> {
    return this.http.get<LlibreApi[]>(this.urlLlibres).pipe(
      map((llista) => Math.max(0, ...llista.map((l) => Number(l.id) || 0)) + 1),
      switchMap((id) => this.http.post<LlibreApi>(this.urlLlibres, this.prepararLlibreApi(id, nou))),
      map(adaptarLlibreApi),
      tap(() => this.reintentar()),
    );
  }

  private obtenirLlibres(criteris: FiltresLlibre): Observable<Llibre[]> {
    return this.http.get<LlibreApi[]>(this.urlLlibres).pipe(
      map(adaptarLlibresApi),
      map((llibres) => this.filtrar(llibres, criteris)),
    );
  }

  private filtrar(llibres: Llibre[], criteris: FiltresLlibre): Llibre[] {
    const text = criteris.text.trim().toLowerCase();
    return llibres.filter((llibre) => {
      const coincideixText =
        !text || llibre.titol.toLowerCase().includes(text) || llibre.autor.toLowerCase().includes(text);
      const coincideixCategoria = !criteris.categoria || llibre.categoria === criteris.categoria;
      return coincideixText && coincideixCategoria;
    });
  }

  private prepararLlibreApi(id: number, nou: NouLlibre): LlibreApi {
    return {
      id: String(id),
      titol: nou.titol,
      autor: nou.autor,
      descripcio: nou.descripcio,
      categoria: nou.categoria,
      data_afegida: new Date().toISOString().slice(0, 10),
      valoracio: nou.valoracio,
      destacat: nou.destacat,
    };
  }

  private missatgeError(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return "No es pot connectar amb l'API. Comprova que npm run api està en marxa.";
    }
    if (err.status === 404) {
      return "No s'ha trobat el recurs demanat a l'API (error 404).";
    }
    if (err.status >= 500) {
      return "L'API ha tingut un error intern (error " + err.status + ').';
    }
    return 'Error inesperat en consultar l\'API (codi ' + err.status + ').';
  }
}
