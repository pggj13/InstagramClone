import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {


    public token_id: string

    constructor(private router:Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {//firebase retorna promisse


                //remover a sernha do atributo senha do objeto usuario
                delete usuario.senha


                //registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)//set faz a persistência daos dados
            }).catch((error: Error) => { console.log(error) })
    }

    public autenticar(email: string, senha: string): void {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()//recupera o token_id da autenticação
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken',idToken)//loca o idtoken no localStorage
                        this.router.navigate(['/home'])
                    })
            })
            .catch((error: Error) => { console.log(error) })
    }
    public autenticado():boolean{

        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined){
            this.router.navigate(['/'])
        }
        return this.token_id !== undefined
    }

    public sair():void{

        firebase.auth().signOut().then(()=>{//remove o token do firebase
            localStorage.removeItem('idToken')
            this.token_id = undefined
            this.router.navigate(['/'])
        })
    }
}