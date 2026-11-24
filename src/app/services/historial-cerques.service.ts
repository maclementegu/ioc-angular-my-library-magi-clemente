import { Service, signal } from '@angular/core';

@Service()
export class HistorialCerquesService {
  private readonly clau = 'mylibrary-historial-cerques';
  private readonly maxElements = 8;

  readonly historial = signal<string[]>(this.llegir());

  afegir(terme: string): void {
    const net = terme.trim();
    if (net.length < 3) {
      return;
    }
    const actual = this.historial();
    if (actual[0]?.toLowerCase() === net.toLowerCase()) {
      return;
    }
    const nou = [net, ...actual].slice(0, this.maxElements);
    this.historial.set(nou);
    this.escriure(nou);
  }

  private llegir(): string[] {
    try {
      const brut = localStorage.getItem(this.clau);
      if (!brut) {
        return [];
      }
      const dades: unknown = JSON.parse(brut);
      return Array.isArray(dades) ? dades.filter((d): d is string => typeof d === 'string') : [];
    } catch {
      return [];
    }
  }

  private escriure(llista: string[]): void {
    try {
      localStorage.setItem(this.clau, JSON.stringify(llista));
    } catch {
      // localStorage no disponible o ple: l'historial només es manté en memòria.
    }
  }
}