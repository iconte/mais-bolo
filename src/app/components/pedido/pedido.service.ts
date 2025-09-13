import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../model/cliente';
import { Pedido } from '../../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url:string = `${environment.apiUrl}/pedidos`
  
  private cepUrl = `https://viacep.com.br/ws/`;

  constructor(private http: HttpClient) { }

  criarPedido(dadosCliente: any, dadosPedido: any) {

    return this.http.post(this.url, { dadosCliente, dadosPedido });
  }

  obterPedidos() {
    return this.http.get(this.url);
  }

  obterDadosEnderecoPorCep(cep: string) {
    return this.http.get(`${this.cepUrl}/${cep}/json/`);
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
