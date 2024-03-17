import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Input() api!: string;
  @Output() modal = new EventEmitter<any>();
  offset: number = 0;
  listaPokemon: any[] = [];
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  loading: boolean = true;
  disabled: boolean = true;

  ngOnInit() {
    // Executa a função buscarPagina() quando o componente é inicializado.
    this.buscarPagina();
  }

  buscarPagina() {
    // Limpa a lista de Pokémon se ela já contiver elementos.
    if (this.listaPokemon.length > 0) {
      this.listaPokemon = [];
    }

    // Ativa o estado de carregamento e desabilita a páginação para evitar requisições simultâneas.
    this.loading = true;
    this.disabled = true;

    // Faz uma requisição GET para a API para buscar uma página de Pokémon.
    axios.get(`${this.api}pokemon/listagemPokemon`, {
      params: {
        offset: this.offset // Parâmetro de offset: página a ser buscada.
      }
    })
      .then(response => {
        // Atualiza a lista de Pokémon com os dados retornados pela API.
        this.listaPokemon = response.data.data;

        // Desativa o estado de carregamento e reativa a paginação.
        this.loading = false;
        this.disabled = false;
      })
      .catch(error => {
        // Registra o erro no console para fins de depuração.
        console.error(error);
      });
  }

  abrirModal(pokemon: any) {
    // Emite um evento para abrir um modal com os detalhes do Pokémon selecionado.
    this.modal.emit(pokemon);
  }

  avancarPaginacao() {
    // Avança para a próxima página se o offset atual for menor ou igual a 102 (última página).
    if (this.offset <= 102) {
      this.offset = this.offset + 10;
      this.buscarPagina(); // Atualiza a lista de Pokémon com a próxima página.
    }
  }

  voltarPagina() {
    // Retrocede para a página anterior se o offset atual for maior que 1.
    if (this.offset > 1) {
      this.offset = this.offset - 10;
      this.buscarPagina(); // Atualiza a lista de Pokémon com a página anterior.
    }
  }

  converterPrimeiraLetraParaMaiuscula(texto: string): string {
    // Converte a primeira letra de um texto para maiúscula e retorna o texto modificado.
    if (!texto) {
      return '';
    }
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
