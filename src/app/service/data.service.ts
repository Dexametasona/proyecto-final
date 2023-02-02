import { UserStatus } from './../interfaces/user-status';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private firestore:Firestore) { }
  estado:UserStatus={
    status:false,
    email:'',
    type:'',
    name:''
  };
  private estado$= new Subject<UserStatus>;

  updateEstado$(estado:UserStatus){
    this.estado=estado;
    this.estado$.next(this.estado)
  }
  getEstado$():Observable<UserStatus>{
    return this.estado$.asObservable();
  }
  addUser(user:User){
    const dataUserRef=collection(this.firestore, 'UserList');
    return addDoc(dataUserRef, user)
  }
  getUser():Observable<User[]>{
    const dataUserRef=collection(this.firestore, 'UserList');
    return collectionData(dataUserRef, {idField:'id'}) as Observable<User[]>
  }



}
