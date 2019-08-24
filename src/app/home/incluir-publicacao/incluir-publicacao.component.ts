import { Progresso } from '../../progresso.service';
import { Bd } from '../../bd.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';



import * as firebase from 'firebase'
//import { Observable } from 'rxjs';

import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';



import 'rxjs';





@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string

  private imagem: any

  @Output() public atualizarTimeLine:EventEmitter<any> = new EventEmitter<any>()


  public progressoPublicacao:string = 'pedente'
  public porcentagemUpload:number

  public formulario: FormGroup = new FormGroup(
    {
      'titulo': new FormControl(null)
    }
  )

  constructor(
    private db: Bd, private progresso: Progresso
  ) { }



  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.db.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })


    let continua = new Subject() //submete valor no observable
    continua.next(true)

    //takeUntil -- significa levar até(funciona tipo o while)

    let acompanhamentoUpload = interval(2000).pipe(takeUntil(continua)).subscribe(() => {
      //console.log(this.progresso.status)
      //console.log(this.progresso.estado)

      this.progressoPublicacao = 'andamento'
      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred/this.progresso.estado.totalBytes) * 100); //Faz a contagem do progresso

      if(this.progresso.status === 'concluido'){
        this.progressoPublicacao = 'concluido'

        //emitir um evento do component  parent(home)
        this.atualizarTimeLine.emit()
        continua.next(false)
      }
    })


  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
