import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

@Component({
  selector: 'app-procurados',
  templateUrl: './procurados.component.html',
  styleUrl: './procurados.component.css'
})
export class ProcuradosComponent {
  @Input() api!: string;
  @Input() listaBusca: string[] = [];
  @Output() modal = new EventEmitter<any>();
  ultimosProcurados: number[] = [];
  listaPokemon: any[] = [];
  inicio: number = 0;
  fim: number = 5;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  loading: boolean = true;

  ngOnInit() {
    // Executa a função para gerar números aleatórios e buscar os últimos Pokémon pesquisados quando o componente é inicializado.
    this.gerarNumerosAleatorios();
    this.buscarUltimos();
  }

  gerarNumerosAleatorios() {
    // Inicializa a lista de últimos Pokémon pesquisados.
    this.ultimosProcurados = [];

    // Gera números aleatórios únicos entre 1 e 1025 e os adiciona à lista de últimos Pokémon pesquisados.
    while (this.ultimosProcurados.length < 8) {
      const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
      if (!this.ultimosProcurados.includes(numeroAleatorio)) {
        this.ultimosProcurados.push(numeroAleatorio);
      }
    }

    // Define o valor de 'fim' para 1 se a largura da janela for menor ou igual a 768 pixels.
    if (window.innerWidth <= 768) {
      this.fim = 1;
    }
  }

  buscarUltimos() {
    // Limpa a lista de Pokémon se ela já contiver elementos.
    if (this.listaPokemon.length > 0) {
      this.listaPokemon = [];
    }

    // Faz uma requisição GET para a API para buscar os últimos Pokémon pesquisados.
    axios.get(`${this.api}pokemon/ultimosProcurados`, {
      params: {
        ultimos: this.ultimosProcurados.join(',') // Parâmetro 'ultimos': lista de IDs dos últimos Pokémon pesquisados, separados por vírgula.
      }
    })
      .then(response => {
        // Atualiza a lista de Pokémon com os dados retornados pela API.
        this.listaPokemon = response.data.data;
        this.loading = false;
        console.log(response.data.data);
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
    // Avança a página de exibição dos Pokémon se 'fim' for menor que 8.
    if (this.fim < 8) {
      this.inicio++;
      this.fim++;
    }
  }

  voltarPagina() {
    // Retrocede a página de exibição dos Pokémon se 'inicio' for maior que 0.
    if (this.inicio > 0) {
      this.inicio--;
      this.fim--;
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
