import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './component/layout1/banner/banner.component';
import { ProcuradosComponent } from './component/layout1/procurados/procurados.component';
import { ListaComponent } from './component/layout1/lista/lista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './component/layout1/modal/modal.component';
import { ErrorComponent } from './component/layout1/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ProcuradosComponent,
    ListaComponent,
    ModalComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
