import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from './Servicios/empleado.service';
import { empleadoUnitario } from './Modelos/empleadoUnitario.interface';
import { listaEmpleados } from './Modelos/listaEmpleados.interface';

import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { empleadoUnitario2 } from './Modelos/empleadoUnitario2.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private empleadosService: EmpleadoService) {
    
  }
  
  listaDEempleados:listaEmpleados[] = [].sort((a,b) => a-b);

  datosEmpleado!: empleadoUnitario;
  datosEmpleado2!: empleadoUnitario2;

  editarEmpleado = new FormGroup<any>({
    idempleado: new FormControl('', Validators.required),
    nombre : new FormControl('', Validators.required),
    apellido : new FormControl('', Validators.required),
    puesto : new FormControl('', Validators.required)
  })

  nuevoEmpleado = new FormGroup<any>({
    nombre : new FormControl('', Validators.required),
    apellido : new FormControl('', Validators.required),
    puesto : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.empleadosService.getAll().subscribe((resp: any) => {
      this.listaDEempleados = resp})
  }

  getEmpleado(idempleado:any): void{
    this.empleadosService.getSingleEmpleado(idempleado).subscribe((data:any) => {
      this.datosEmpleado = data[idempleado-1],
      this.editarEmpleado.setValue({
        'idempleado': idempleado,
        'nombre': this.datosEmpleado.nombre,
        'apellido': this.datosEmpleado.apellido,
        'puesto': this.datosEmpleado.puesto
      })
      console.log(data)
    })
  }

  putForm(form:empleadoUnitario){
    if (confirm ('Guardar datos editados?')){
    this.empleadosService.putEmpleado(form).subscribe(data =>{
      console.log(data)
      })
    }
  }

  deleteEmpleado(){
    let datos: empleadoUnitario = this.editarEmpleado.value;
    if(confirm('Quiere eliminar al empleado?')){
    this.empleadosService.deleteEmpleado(datos).subscribe(data=>{
      console.log(data)
      });
    }
  }

  postForm(form:empleadoUnitario2){
    this.empleadosService.postEmpleado(form).subscribe(data =>{
      console.log(data)
    })
  }

  element = false;
  showData1(){
    return (this.element = true);
  }
  hideData1(){
    return (this.element = false);
  }

  element2 = false;
  showData2(){
    return (this.element2 = true);
  }
  hideData2(){
    return (this.element2 = false)
  }
}
