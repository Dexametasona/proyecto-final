import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICarProd } from '../interfaces/iCarProd';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private firestore:Firestore) { }
  

  addProd(prod:ICarProd){
    const auth = getAuth();
    const user = auth.currentUser;

    const dataprodRef=collection(this.firestore, `car-${user?.email}`);
    return addDoc(dataprodRef, prod)
  }
  getProd():Observable<ICarProd[]>{
    const auth = getAuth();
    const user = auth.currentUser;
    const dataprodRef=collection(this.firestore, `car-${user?.email}`);
    return collectionData(dataprodRef, {idField:'id'}) as Observable<ICarProd[]>
  }

  deleteProd(prod:ICarProd){
    const auth = getAuth();
    const user = auth.currentUser;
    const prodRef= doc(this.firestore, `car-${user?.email}/${prod.id}`);
    return deleteDoc(prodRef)
  }
  
}
