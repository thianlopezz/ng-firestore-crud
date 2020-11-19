import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireCrudService {

  constructor(private firestore: AngularFirestore) { }

  public getClientesOnce() {
    return this.firestore.collection('clientes').get();
  }

  public getClientes() {
    return this.firestore.collection('clientes').snapshotChanges()
  }

  public insertar_cliente(cliente) {
    // cliente = {
    //   nombre:'Cristhian',
    //   usuario: 'thian',
    //   correo: 'thian',
    //   activo: true
    // };
    return this.firestore.collection('clientes').add(cliente);
  }

  public update_cliente(cliente){
    let _id = cliente.id;
    delete cliente.id;
    return this.firestore.collection('clientes').doc(_id).set(cliente);
  }
}
