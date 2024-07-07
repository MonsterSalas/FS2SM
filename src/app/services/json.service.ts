import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 632fca26-96ef-4bfc-8a35-3f97aeaf8c30'
    })
  }

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/fs2sm-67b20.appspot.com/o/usuarios.json?alt=media&token=f3758efa-771a-4d51-a68a-3efe166cd160';

  private lista:any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get(this.jsonUrl);

  }

  MetodoUsuario(listaUsuarios:any) {
    console.log(listaUsuarios);
    this.http.post(this.jsonUrl,listaUsuarios,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }
}