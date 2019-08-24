import { Bd } from '../../bd.service';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase'


@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string
  public publicacoes:any

  constructor(private db: Bd) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.atualizarTimeLine()
    })

  }

  public atualizarTimeLine(): void {
    this.db.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {

        this.publicacoes = publicacoes

      })
  }

}
