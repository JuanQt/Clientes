import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clienteList : Cliente[];

  buscar: string;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.MostrarClientes(); //al iniciar se muestre los datos

  }

  MostrarClientes(){
    this.clienteService.getCliente().snapshotChanges().subscribe(item => {
      this.clienteList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.clienteList.push(x as Cliente);
      });
    });
  }

  //funcionar para consultar 
  consultaCliente(){
    this.clienteService.getCliente().snapshotChanges().subscribe(item => {
      this.clienteList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.clienteList.push(x as Cliente);
      });

      this.clienteList = this.clienteList.filter(data => {
        return data.dni.toString().trim() === this.buscar;
      })

      if(this.clienteList.length === 0){

        this.MostrarClientes();

        Swal.fire({
          position: 'center',
          title: '¡Cliente no se registro!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 2000
        })

      }


    });
  }
 
  //para editar la funcion
  onEdit(cliente: Cliente){

    this.clienteService.selectedCliente = cliente;
  }

  //funcion para eliminar
  onDelete($key: string){

    Swal.fire({
      title: '¿Esta seguro?',
      text: '¡No podrás recuperar este cliente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No,mantenlo'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Su cliente ha sido eliminado.',
          'success'
        )
        this.clienteService.deleteCliente($key);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado!',
          'Tu cliente esta seguro',
          'error'
        )
      }
    })

    
  }

}
