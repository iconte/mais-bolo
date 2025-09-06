import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { ProdutoService } from '../../produto.service';
import { Produto } from '../../model/produto';
import { Categoria } from '../../model/categoria';

@Component({
  selector: 'app-pedido',
  imports: [DecimalPipe, CommonModule],
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
  produtoSelecionado:number | null = null;
  produtosPedido: Array<{ produto: Produto; quantidade: number }> = [];
  quantidadeSelecionada: number = 1;
  produtoKitFestaSelecionado: boolean = false;
  exibirItensKit: boolean = false;
  exibirSelecaoMedidaCopoUnidade: boolean = false;


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
    this.produtoService.getCategorias().subscribe({
        next: (obj: any) => {
          this.dadosCategoria = obj.data;
        },
        error: (error: any) =>  console.error('Erro ao carregar categorias:', error)
      });
  }

  // Método para filtrar produtos por categoria
  onCategoriaChange(event: any) {
    const categoriaId = parseInt(event.target.value);
    if (isNaN(categoriaId) || !categoriaId) {
      this.categoriaSelecionada = null;
      this.produtosFiltrados = [];
    } else {
      this.categoriaSelecionada = categoriaId;
      if (this.categoriaSelecionada) {
        this.produtoService.getProdutosPorCategoriaId(this.categoriaSelecionada).subscribe({
          next: (obj: any) => {
            if (obj.data.length === 0) {
              this.produtosFiltrados = [];
            } else {
              this.produtosFiltrados= obj.data;
            }
          },
          error: (error: any) => {
            console.error('Erro ao carregar produtos:', error);
            this.produtosFiltrados = [];
          }
        });
      }
    }
  }

  onChangeProduto(event: any) {
    const produtoId = parseInt(event.target.value);
    console.log('produto sel:', produtoId);
    if (isNaN(produtoId) || !produtoId) {
     this.desabilitarSelecaoCustomizarKitFesta();
     this.desabilitarExibirSelecaoMedidaCopoUnidade();
      return;
    }
    const produtoSelecionado = this.produtosFiltrados.find(p => p.id === produtoId);
  if (produtoSelecionado) {
    const categoriaKitFesta = this.dadosCategoria.find(cat => cat.descricao === 'Kits de Festa');
    const categoriasExcluidas = ['Bolos', 'Kits de Festa', 'Descartáveis'];
    const categoriasCopoCento: Categoria[] = this.dadosCategoria.filter(cat => !categoriasExcluidas.includes(cat.descricao));
    const contemCopoCento = categoriasCopoCento.some(cat => cat.id === produtoSelecionado.idCategoria);
    this.exibirSelecaoMedidaCopoUnidade = contemCopoCento;
  
    if(categoriaKitFesta){
      this.produtoKitFestaSelecionado = produtoSelecionado.idCategoria === categoriaKitFesta.id;
    }
  
  } else {
    this.desabilitarSelecaoCustomizarKitFesta();
  }
  
  }

  onQuantidadeChange(event: any) {
    const input = event.target as HTMLInputElement;
    const qtd = parseInt(input.value, 10);
    this.quantidadeSelecionada = isNaN(qtd) || qtd < 1 ? 1 : qtd;
  }

  onAdicionarProduto() {
    const produto = this.produtosFiltrados.find(p => p.id === this.produtoSelecionado);
    if (!produto) return;
    const existente = this.produtosPedido.find(item => item.produto.id === produto.id);
    if (existente) {
      existente.quantidade += this.quantidadeSelecionada;
    } else {
      this.produtosPedido.push({ produto, quantidade: this.quantidadeSelecionada });
    }
    this.quantidadeSelecionada = 1;
  }

  onRemoverProduto(produtoId: number) {
    this.produtosPedido = this.produtosPedido.filter(item => item.produto.id !== produtoId);
  }

  onAlterarQuantidade(produtoId: number, novaQtd: number) {
    const item = this.produtosPedido.find(p => p.produto.id === produtoId);
    if (item && novaQtd > 0) {
      item.quantidade = novaQtd;
    }
  }

  onEspecificarItensKit(){
    const checkbox = document.getElementById('especificarItensKit') as HTMLInputElement;
    if (checkbox) {
      this.exibirItensKit = checkbox.checked;
    }
  }

  desabilitarSelecaoCustomizarKitFesta(){
     this.produtoKitFestaSelecionado = false;
  }
   desabilitarExibirSelecaoMedidaCopoUnidade(){
     this.exibirSelecaoMedidaCopoUnidade = false;
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value || '';
  }

  }