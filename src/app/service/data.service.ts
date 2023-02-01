import { UserStatus } from './../interfaces/user-status';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private firestore:Firestore) { }
  estado!:UserStatus;
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

  updateStatus(status:UserStatus){
    const UserRef=doc(this.firestore, 'UserStatus/NFvzb9E4eoG7pKH9IiMy');
    return setDoc(UserRef, status)
  }
  getstatus():Observable<UserStatus[]>{
    const dataUserStatusRef=collection(this.firestore, 'UserStatus');
    return collectionData(dataUserStatusRef, {idField:'id'}) as Observable<UserStatus[]>
  }


}
