import { Component, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() api!: string;
  mostrar: boolean = false;
  pokemonModal: any;
  vida: number = 0;
  defesa: number = 0;
  velocidade: number = 0;
  ataque: number = 0;
  descricao: any;

  toggle() {
    // Alterna o estado da variável 'mostrar', controlando a visibilidade do modal.
    this.mostrar = !this.mostrar;
  }

  motrarPokemon(pokemon: any) {
    // Exibe os detalhes do Pokémon no modal e faz a chamada para exibir o modal.
    this.pokemonModal = pokemon;
    this.vida = (pokemon.stats[0].base_stat * 80) / 255;
    this.defesa = (pokemon.stats[2].base_stat * 80) / 230;
    this.velocidade = (pokemon.stats[5].base_stat * 80) / 180;
    this.ataque = (pokemon.stats[1].base_stat * 80) / 180;
    this.descricaoPokemon(pokemon.name);
    this.toggle(); // Exibe o modal
  }

  descricaoPokemon(pokemon: string) {
    // Faz uma requisição para a API para obter a descrição do Pokémon e armazena na variável 'descricao'.
    axios.get(`${this.api}pokemon/descricaoPokemon`, {
      params: {
        pokemon: pokemon
      }
    })
      .then(response => {
        this.descricao = response.data.data[0].flavor_text;
      })
      .catch(error => {
        console.error(error);
      });
  }

  converterPrimeiraLetraParaMaiuscula(texto: string): string {
    // Converte a primeira letra de um texto para maiúscula e retorna o texto modificado.
    if (!texto) {
      return '';
    }
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
