import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User|null>;

  constructor(public afAuth: AngularFireAuth) { 
    this.user = this.afAuth.authState;
  }

  //Obtener el estado de la autenticacion
  get authenticated():boolean{
    return this.user != null; //True o False
  }
  //Obtener el observador del usuario actual
  get currentUser():Observable<firebase.User|null>{
    return this.user;
  }

  // registro con email
  signUpWithEmail(email,pass): Promise<firebase.auth.UserCredential>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email,pass);
  }
  // imgreso con email
  signInWithEmail(email, pass):Promise<firebase.auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  //Autenticacion con Facebook
  authWithFacebook(): Promise<firebase.auth.UserCredential>{
    const provider: firebase.auth.FacebookAuthProvider = new 
    firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return this.afAuth.auth.signInWithPopup(provider);
  }
  // Autenticacion con Google
  authWithGoogle(): Promise<firebase.auth.UserCredential>{
    const provider: firebase.auth.GoogleAuthProvider = new
    firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  // Recuperar contraseñas
  resetPassword(email): Promise<void>{
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  // Verificar correo
  verifyEmail():Promise<void>{
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }
  // Finalizar sesion
  signOut(): Promise<void>{
    return this.afAuth.auth.signOut();
  }
  registerUser(email:string, pass:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), err => reject(err));
    });
  }

  loginEmail(email:string, pass:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData), err => reject(err));
    });
  }
  //getAuth(){
  //  return this.afAuth.authState.map(auth => auth)
  //}
  //Actualziar perfil firebase authentication
  updateProfile(name?,photo?):Promise<void>{
    return this.afAuth.auth.currentUser.updateProfile({
      displayName:
      (name)? name: this.afAuth.auth.currentUser.displayName,
      photoURL:
      (photo)? photo : this.afAuth.auth.currentUser.photoURL
    });
  }
}
