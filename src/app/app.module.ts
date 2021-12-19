import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './views/clients/clients.component';
import { EditClientComponent } from './views/edit-client/edit-client.component';
import { FormsModule } from '@angular/forms';
import { AngularConfirmModalModule } from 'angular-confirm-modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularConfirmModalModule.forRoot({
      // optional global config
      confirmBtnClass: 'btn btn-success',
      confirmBtnText: 'Confirm',
      cancelBtnClass: 'btn btn-danger',
      cancelBtnText: 'Cancel',
      modalSize: 'sm',
      modalClass: 'some-modal-class'
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
