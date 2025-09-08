import { Produto } from "./produto";

export class ItemPedido {
  id!: number;
  idPedido!: number;
  idUnidadeMedida!: number;
  produto!: Produto;
  quantidade!: number;
  observacao!: string;
}