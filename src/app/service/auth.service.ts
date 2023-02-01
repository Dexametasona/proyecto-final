import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }
  registUser({email,pass}:{email:string, pass:string}):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }
  signUser({email,pass}:{email:string, pass:string}):Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, email, pass)
  }
  logout():Promise<void>{
    return signOut(this.auth)
  }
}
