import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-lista-pedido',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './lista-pedido.html',
  styleUrl: './lista-pedido.css'
})
export class ListaPedido {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {

   }

  ngOnInit() {
   this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.obterPedidos().subscribe({
        next: (obj: any) => {
          console.log('Resposta recebida do serviço:', obj);
          this.pedidos = obj.data;
        },
        error: (error: any) =>  console.error('Erro ao carregar pedidos:', error)
      });
    }

  visualizarPedido(pedido: any) {
    // Lógica para visualizar detalhes do pedido
    alert('Visualizar pedido: ' + pedido.id);
  }

  atualizarPedido(pedido: any) {
    // Lógica para atualizar o pedido
    alert('Atualizar pedido: ' + pedido.id);
  }
}
