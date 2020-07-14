import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clienteList: Cliente[];

  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  //creamos funcion para resetar el formulario
  resetForm(clienteForm: NgForm){
    if(clienteForm != null)
      clienteForm.reset();
      this.clienteService.selectedCliente = new Cliente();
  }

  onSubmit(clienteForm: NgForm) {

    this.clienteService.getCliente();

    if (clienteForm.value.$keyRegistro == null) {
      this.clienteService.insertCliente(clienteForm.value);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente registrado',
        showConfirmButton: false,
        timer: 2000
      }) 
    } else {
      this.clienteService.updateCliente(clienteForm.value);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente actualizado',
        showConfirmButton: false,
        timer: 2000
      })
      
    }this.resetForm(clienteForm)

  }


}
