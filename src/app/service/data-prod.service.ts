import { Iproduct } from './../interfaces/iprod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore, deleteDoc, docData} from '@angular/fire/firestore';
import { addDoc, doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataProdService {

  constructor(private firestore:Firestore) { }

  addProd(prod:Iproduct){
    const dataprodRef=collection(this.firestore, 'prodList');
    return addDoc(dataprodRef, prod)
  }
  getProd():Observable<Iproduct[]>{
    const dataprodRef=collection(this.firestore, 'prodList');
    return collectionData(dataprodRef, {idField:'id'}) as Observable<Iproduct[]>
  }

  deleteProd(prod:Iproduct){
    const prodRef= doc(this.firestore, `prodList/${prod.id}`);
    return deleteDoc(prodRef)
  }
  getProdOnly(prod:string):Observable<Iproduct>{
    const prodRef=doc(this.firestore, `prodList/${prod}`)
    return docData(prodRef) as Observable<Iproduct>
  }

}
