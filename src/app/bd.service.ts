import { Progresso } from './progresso.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


@Injectable()

export class Bd {


    constructor(private progresso: Progresso) { }



    public publicar(publicacao: any): void {


        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {

                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`).put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot

                            // console.log('Snapshot capturado no on(): ',snapshot)

                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            //console.log(error)

                        },
                        () => {
                            //finalização do processo
                            this.progresso.status = 'concluido'

                            //console.log('updload completo')
                        }
                    )//escutar evento e tomar uma ação

            })
    }
    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()//metodo de ordenação pelo id
                .once('value')//Pega o apenas o valor
                .then((snapshot: any) => {
                 //   console.log(snapshot.val())


                    //console.log(snapshot.val())

                    let publicacoes: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)


                    })

                    //console.log(publicacoes)

                    // resolve(publicacoes)
                    return publicacoes.reverse()//inverte a ordem o array

                }).then((publicacoes: any) => {
                   // console.log(publicacoes)

                    publicacoes.forEach((publicacao) => {
                        //consultar a url da imagem
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()//baixa a url valida da imagem
                            .then((url: string) => {

                                publicacao.url_imagem = url;

                                //consultar o nome do usuario responsavel pela publicação
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario

                                    })
                            })
                    })


                    resolve(publicacoes)



                })

        })



    }
}
