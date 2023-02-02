import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICarProd } from '../interfaces/iCarProd';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private firestore:Firestore) { }

  addProd(prod:ICarProd){
    const dataprodRef=collection(this.firestore, 'carList');
    return addDoc(dataprodRef, prod)
  }
  getProd():Observable<ICarProd[]>{
    const dataprodRef=collection(this.firestore, 'carList');
    return collectionData(dataprodRef, {idField:'id'}) as Observable<ICarProd[]>
  }

  deleteProd(prod:ICarProd){
    const prodRef= doc(this.firestore, `carList/${prod.id}`);
    return deleteDoc(prodRef)
  }
  
}
