import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface ProductoCondensado {
  categoria: string;
  producto: string;
  unidad: string;
  cantidad_total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CondensadoProductosService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  getCondensadoProductos(fecha: string, categoria: string | null): Observable<ProductoCondensado[]> {
    const url = `${this.supabaseUrl}/rest/v1/rpc/get_condensado_productos`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });
    const body = {
      input_fecha: fecha,
      input_categoria: categoria
    };
    return this.http.post<ProductoCondensado[]>(url, body, { headers });
  }
}