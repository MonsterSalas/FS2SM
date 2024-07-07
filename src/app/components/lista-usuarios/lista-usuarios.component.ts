import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonService } from '../../services/json.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  providers: [JsonService]
})
export class ListaUsuariosComponent implements OnInit{

  usuarios: any[] = [];
  nombre: string = '';
  direccion: number | null = null;

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsonData().subscribe(data => {
      this.usuarios = data;
    });
  }


  eliminar(persona: any): void {
    const index = this.usuarios.findIndex((elemento: any) => elemento.id === persona.id);
    
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      this.jsonService.MetodoUsuario(this.usuarios);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  modificar(persona: any): void {
    const index = this.usuarios.findIndex((elemento: any) => elemento.id === persona.id);
    
    if (index !== -1) {
      this.usuarios[index].nombre = this.nombre;
      this.usuarios[index].edad = this.direccion;
      this.jsonService.MetodoUsuario(this.usuarios);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  addPerson(): void {
    const newPerson = {
      id: this.usuarios.length > 0 ? Math.max(...this.usuarios.map((p: any) => p.id)) + 1 : 1,
      nombre: this.nombre,
      direccion: this.direccion
    };
    this.usuarios.push(newPerson);
    this.jsonService.MetodoUsuario(this.usuarios);
  }

  submitForm(): void {
    if (this.nombre && this.direccion !== null) {
      this.addPerson();
      this.nombre = '';
      this.direccion = null;
    } else {
      window.alert('Por favor, ingrese un nombre y una direccion');
    }
  }
}

