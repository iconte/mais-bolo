import { Cliente } from "./cliente";
import { Produto } from "./produto";

export class Pedido{
    id: any = null;
    cliente: Cliente = new Cliente();
    produtos: Array<{ produto: Produto, quantidade: number }> = [];
    valorTotal: number = 0;
    observacao:string = '';
}