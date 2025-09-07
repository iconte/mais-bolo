import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

   private url:string = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  criarCliente(dadosCliente: any) {
    return this.http.post(this.url, dadosCliente);
   }

  obterClientes() {
    return this.http.get(this.url);
  }

  obterClientePorId(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  atualizarCliente(id: string, dadosCliente: any) {
    return this.http.put(`${this.url}/${id}`, dadosCliente);
  }

  cancelarCliente(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
