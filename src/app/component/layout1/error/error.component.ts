import { Component } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  mostrar: boolean = false;
  faCircleXmark = faCircleXmark;

  toggle() {
    // Alterna o estado da variável 'mostrar', controlando a visibilidade do modal.
    this.mostrar = !this.mostrar;
  }
}
