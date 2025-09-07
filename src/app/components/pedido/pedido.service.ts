import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url:string = `${environment.apiUrl}/pedidos`

  constructor(private http: HttpClient) { }

  criarPedido(dadosPedido: any, dadosClientePedido: any) {
    
    return this.http.post(this.url, { dadosPedido, dadosClientePedido });
  }

  obterPedidos() {
    return this.http.get(this.url);
  }

  obterPedidoPorId(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  atualizarPedido(id: string, dadosPedido: any) {
    return this.http.put(`${this.url}/${id}`, dadosPedido);
  }

  cancelarPedido(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
