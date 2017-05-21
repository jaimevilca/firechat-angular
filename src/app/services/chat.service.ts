import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Mensaje } from "app/interfaces/mensaje";

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;

  usuario: any = {};

  constructor(
    private db: AngularFireDatabase, 
    public afAuth: AngularFireAuth) {
    // this.chats = db.list('/chats');

    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.usuario = null;
    }

    console.log(this.usuario);

    // this.usuario.estado = afAuth.authState;
    // console.log(afAuth.authState);
  }

  cargarMensajes() {
    this.chats = this.db.list('/chats', {
      query: {
          limitToLast: 20,
          orderByKey: true
      }
    });

    return this.chats;
  }

  agregarMensaje(texto: string){
    let mensaje:Mensaje = {
      nombre: this.usuario.displayName,
      mensaje: texto,
      uid: this.usuario.uid
    };

    return this.chats.push(mensaje);
  }

  login(proveedor: string) {

    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    let _this = this;

    if(proveedor == 'google'){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(function(result) {
                  _this.usuario = result.user;
                  localStorage.setItem('usuario', JSON.stringify(result.user));
            });


    }

    if(proveedor == 'twitter'){
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
          .then(function(result) {
                  _this.usuario = result.user;
                  localStorage.setItem('usuario', JSON.stringify(result.user));
            });
    }
    
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.afAuth.auth.signOut();
  }




}
