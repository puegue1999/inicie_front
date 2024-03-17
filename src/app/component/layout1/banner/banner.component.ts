import { Component, Input, Output, EventEmitter } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() api!: string;
  @Input() listaBusca: string[] = [];
  @Output() modal = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  pokemon: any;
  disabled: boolean = false;

  buscaPokemon(event: Event, pokemonName: string) {
    // Prevenir o comportamento padrão do evento (submit do formulário, no caso).
    event.preventDefault();

    // Desativa o botão de busca para evitar múltiplas requisições simultâneas.
    this.disabled = true;

    // Faz uma requisição GET para a API para pesquisar informações sobre um Pokémon.
    axios.get(`${this.api}pokemon/pesquisaPokemon`, {
        params: {
            busca: pokemonName // Parâmetro de busca: nome do Pokémon.
        }
    })
    .then(response => {
        // Ativa novamente o botão de busca.
        this.disabled = false;

        // Armazena os dados do Pokémon retornado pela API.
        this.pokemon = response.data;

        // Emite um evento para notificar outros componentes sobre os dados do Pokémon.
        this.modal.emit(response.data.data);
    })
    .catch(error => {
        // Em caso de erro na requisição, emite um evento para lidar com o erro.
        this.error.emit();

        // Ativa novamente o botão de busca.
        this.disabled = false;

        // Registra o erro no console para fins de depuração.
        console.error(error);
    });
}

}
