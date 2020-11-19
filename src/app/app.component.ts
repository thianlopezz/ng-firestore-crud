import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireCrudService } from './services/fire-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-firebase';

  registerForm: FormGroup;

  clientes: any = [];
  show = false;

  constructor(private fireCrud: FireCrudService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // this.getClientes();
    this.getClientesRealTime();

    this.registerForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      activo: ['1', Validators.required]
    });

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
        let aux: any = data.payload.doc.data();
        this.clientes.push({ id: data.payload.doc.id, ...aux });
      });
    });
  }

  guardarCliente() {
    if (this.registerForm.valid) {    

      let cliente = this.registerForm.value;

      if(!cliente.id) {

      cliente.activo = cliente.activo == 1 ? true : false;

      this.fireCrud.insertar_cliente(cliente).then
        (data => {

          console.log('Insertado');
          this.show = false;

          this.registerForm.reset();

        }).catch(error => {
          console.log(error);
        });

      } else {
        this.fireCrud.update_cliente(cliente).then(data=>{
          console.log('Actualizado');
          this.show = false;
          this.registerForm.reset();
        }).catch(error=> console.log(error));
      }
    }
  }

  editar(cliente) {
    debugger;
    this.show = true;
    this.registerForm.patchValue({ 'id': cliente.id, 'nombre': cliente.nombre, 'correo': cliente.correo, 'usuario': cliente.usuario, 'activo': cliente.activo ? '1' : '0' });
  }

}
