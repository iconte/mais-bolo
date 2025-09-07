import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './model/produto';
import { Observable } from 'rxjs';
import { Categoria } from './model/categoria';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
// URL do serviço de produtos
  private url:string = `${environment.apiUrl}/produtos`;
  
  constructor(private http: HttpClient) { }

  getProdutoPorId(produtoId: number): Observable<Produto[]> {
    // Faz uma requisição GET para obter a lista de produtos
    console.log('Buscando produto por ID:', `${this.url}/${produtoId}`);
    return this.http.get<Produto[]>(`${this.url}/${produtoId}`);
  }

  getProdutosPorCategoriaId(categoriaId: number): Observable<Produto[]> {
    // Faz uma requisição GET para obter a lista de produtos
    return this.http.get<Produto[]>(`${this.url}/categoria/${categoriaId}`);
  }
   getCategorias(): Observable<Categoria[]> {
    // Faz uma requisição GET para obter a lista de categorias
      return  this.http.get<Categoria[]>(`${environment.apiUrl}/categorias`);
  }

}
