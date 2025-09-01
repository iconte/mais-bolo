import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProdutoService } from '../../produto.service';
import { Produto } from '../../model/produto';
import { Categoria } from '../../model/categoria';
import { map } from 'rxjs';

@Component({
  selector: 'app-pedido',
  imports: [DecimalPipe],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido implements OnInit {
  // private readonly produtoService = inject(ProdutoService);
  passoAtual: number = 0;
  passo1: number = 0;
  passo2: number = 1;
  passo3: number = 2;
  dadosProduto: Produto[] = [];
  dadosCategoria: Categoria[] = [];
  produtosFiltrados: Produto[] = [];
  categoriaSelecionada: number | null = null;

  constructor(private produtoService: ProdutoService) {
    this.passoAtual = 0;

  }
  ngOnInit() {
    this.carregarCategorias();
  }

  tituloEtapa: string[] = [
    "Etapa 1: Dados do Cliente",
    "Etapa 2: Dados do Pedido",
    "Etapa 3: Resumo do Pedido"
  ];





  obterTituloEtapa(passo: number): string {
    if (passo < 0 || passo >= this.tituloEtapa.length) {
      return this.tituloEtapa[0];
    }
    return this.tituloEtapa[passo];
  }
  mostrarPasso(passo: number): boolean {
    return this.passoAtual === passo;
  }

  proximo() {
    this.passoAtual++;
    this.validarPassoAtual();
  }
  private validarPassoAtual() {
    if (this.passoAtual < 0 || this.passoAtual > 3) {
      this.passoAtual = 0;
    }
  }

  anterior() {
    this.passoAtual--;
    this.validarPassoAtual();
  }
  carregarCategorias() {
    this.produtoService.getCategorias().subscribe((obj: any) => {
      this.dadosCategoria = (obj.data as []).map((item: any) => ({
        idCategoria: item.id_categoria,
        nome: item.nome,
      }));
      console.log(this.dadosCategoria);
    },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }

    )

  }

  // Método para filtrar produtos por categoria
  onCategoriaChange(event: any) {
    const categoriaId = parseInt(event.target.value);
    if (isNaN(categoriaId) || !categoriaId) {
      // Se nenhuma categoria selecionada, limpa a seleção
      this.categoriaSelecionada = null;
      this.produtosFiltrados = [];
    } else {
      this.categoriaSelecionada = categoriaId;
      // Carrega produtos pela categoria selecionada e atualiza produtosFiltrados após o carregamento
      if (this.categoriaSelecionada) {
        this.produtoService.getProdutosPorCategoriaId(this.categoriaSelecionada).subscribe((obj: any) => {
          if (obj.data.length === 0) {
            this.produtosFiltrados = [];
          } else {
            this.produtosFiltrados = (obj.data as []).map((item: any) => ({
              id: item.id_produto,
              nome: item.nome,
              descricao: item.descricao,
              categoria: item.categoria || null,
              valor: item.valor || 0,
              categoriaId: item.id_categoria
            }));
          }
        }, (error) => {
          console.error('Erro ao carregar produtos:', error);
          this.produtosFiltrados = [];
        });
      }
      console.log('Categoria selecionada:', this.categoriaSelecionada);
      console.log('Produtos filtrados:', this.produtosFiltrados);
    }


  }
}