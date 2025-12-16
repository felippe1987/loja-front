import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from './produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  produtos: Produto[] = [];
  produtoAtual: Produto = { nome: '', preco: 0 };
  editando = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos() {
    this.produtoService
      .getProdutos()
      .subscribe((dados) => (this.produtos = dados));
  }

  salvar() {
    if (this.editando) {
      this.produtoService.updateProduto(this.produtoAtual).subscribe(() => {
        this.obterProdutos();
        this.cancelar();
      });
    } else {
      this.produtoService.addProduto(this.produtoAtual).subscribe(() => {
        this.obterProdutos();
        this.cancelar();
      });
    }
  }

  editar(produto: Produto) {
    this.produtoAtual = { ...produto };
    this.editando = true;
  }

  deletar(id: number) {
    this.produtoService.deleteProduto(id).subscribe(() => this.obterProdutos());
  }

  cancelar() {
    this.produtoAtual = { nome: '', preco: 0 };
    this.editando = false;
  }

  limpar() {
    this.produtoAtual = { nome: '', preco: 0 };
  }

  limparEdicao() {
    this.limpar();
    this.editando = false;
  }

  //Método de verificação se o campo está vazio
  isFormValid(): boolean {
    return this.produtoAtual.nome.trim() !== '' && this.produtoAtual.preco > 0;
  }
}
