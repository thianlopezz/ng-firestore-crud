import { Component, OnInit } from '@angular/core';
import { FireCrudService } from './services/fire-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-firebase';

  clientes:any = [];

  constructor(private fireCrud: FireCrudService) {
    
  }

  ngOnInit(){
    this.getClientes();
  }  

  getClientes(){
    
    this.fireCrud.getClientesOnce().subscribe(data=>{
      debugger;
      this.clientes = data.docs;
    });
  }

}
