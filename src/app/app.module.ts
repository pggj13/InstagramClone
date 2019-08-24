import { Bd } from './bd.service';
import { AutenticacaoGuard } from './autenticacao.guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormControlDirective } from '@angular/forms'

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

import { Autenticacao } from './autenticacao.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';


import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';


import { Progresso } from './progresso.service';




@NgModule({
  declarations: [
    AppComponent, 
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    Autenticacao,
    AutenticacaoGuard,
    Bd,Progresso
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
