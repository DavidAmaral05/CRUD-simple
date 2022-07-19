import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { listaEmpleados } from '../Modelos/listaEmpleados.interface'; 
import { empleadoUnitario } from '../Modelos/empleadoUnitario.interface';
import { ResponseI } from '../Modelos/response.interface';
import { empleadoUnitario2 } from '../Modelos/empleadoUnitario2.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(
    private http: HttpClient
  ) { 
    console.log('Servicio de Empleado')
  }

  getAll(): Observable<listaEmpleados[]>{
    return this.http.get<listaEmpleados[]>('/api/empleados');
  }

  getSingleEmpleado(idempleado:any): Observable<empleadoUnitario>{
    return this.http.get<empleadoUnitario>('/api/empleados');
  }

  putEmpleado(form:empleadoUnitario): Observable<ResponseI>{
    return this.http.put<ResponseI>('/api/empleados', form);
  }

  postEmpleado(form:empleadoUnitario2): Observable<ResponseI>{
    return this.http.post<ResponseI>('/api/empleados', form);
  }

  deleteEmpleado(form:empleadoUnitario): Observable<ResponseI>{
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body: form
    }
    return this.http.delete<ResponseI>('/api/empleados', options);
  }
}

