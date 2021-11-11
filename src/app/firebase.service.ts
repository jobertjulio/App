import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'AppCurso'

  constructor(private firetore: AngularFirestore) {

   }

  get_transactions(){
    return this.firetore.collection(this.collectionName).snapshotChanges();
  } 

  add_transactions(data){
    return this.firetore.collection(this.collectionName).add(data);
  } 
}
