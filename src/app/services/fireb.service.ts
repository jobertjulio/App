import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebService {
  collectionName = 'tarefas'
    
  constructor(private db: AngularFirestore) {
  }

  getTarefas(){
    //return this.db.collection(this.collectionName).valueChanges();
    return this.db.collection(this.collectionName).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();          

          return {id,data};
        })
      })
    )
  } 

  getTarefa(id){
    //return this..doc(id).valueChanges();
  } 

  updateTarefa(tarefa, id: any){
    //return this.tarefasCollection.doc<Tarefa>(id).update(tarefa);
    return this.db.collection(this.collectionName).doc(id).update(tarefa);
  }
 
  addTarefa(tarefa : any){
    return this.db.collection(this.collectionName).add(tarefa);
    //return this.tarefasCollection.add(tarefa);
  }

  removeTarefa(id){
    //return this.tarefasCollection.doc(id).delete;
  }
}
