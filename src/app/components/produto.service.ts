import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
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
