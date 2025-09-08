import { Cliente } from "./cliente";
import { ItemPedido } from "./itemPedido";


export class Pedido{
    id: any = null;
    cliente: Cliente = new Cliente();
    itens: Array<ItemPedido> = [];
    valorTotal: number = 0;
    observacao:string = '';
}