import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inicie_front';
  api: string = 'http://127.0.0.1:8000/api/';
  listaBusca: string[] = [];
}
