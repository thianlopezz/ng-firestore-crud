import { Component, OnInit } from '@angular/core';
import { FireCrudService } from './services/fire-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-firebase';

  clientes: any = [];

  constructor(private fireCrud: FireCrudService) {

  }

  ngOnInit() {
    // this.getClientes();
    this.getClientesRealTime();
  }

  getClientes() {

    this.clientes = [];

    this.fireCrud.getClientesOnce().subscribe(data => {

      this.clientes = data.docs.map(item => {
        return { id: item.id, ...item.data() };
      });
    });
  }

  getClientesRealTime() {    

    this.fireCrud.getClientes().subscribe(dataSnapshot => {

      this.clientes = [];

      dataSnapshot.forEach(data => {
        let aux:any = data.payload.doc.data();
        this.clientes.push({ id: data.payload.doc.id, ...aux });
      });
    });
  }

}
