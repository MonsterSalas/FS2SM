import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Cliente } from '../../interface/cliente.model'; // Asegúrate de ajustar la ruta de importación según sea necesario

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'] // Corregido de 'styleUrl' a 'styleUrls'
})

export class RegistrarComponent implements OnInit {
  registrarForm!: FormGroup;
  private clientes: Cliente[] = [];

  constructor() {}

  ngOnInit(): void {
    this.registrarForm = new FormGroup({
      nombreCompleto: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasennia: new FormControl('', Validators.required)
    });
    this.loadClientes();
  }

  loadClientes(): void {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes = JSON.parse(clientesGuardados);
    }
  }

  saveClientes(): void {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  agregarCliente(cliente: Cliente): boolean {
    const longitudInicial = this.clientes.length;
    this.clientes.push(cliente);
    this.saveClientes();
    return this.clientes.length > longitudInicial;
  }

  registrarCliente(): void {
    if (this.registrarForm.valid) {
      const nuevoCliente: Cliente = this.registrarForm.value;
      const resultado = this.agregarCliente(nuevoCliente);
      if (resultado) {
        console.log("Cliente agregado correctamente.");
      } else {
        console.log("Error al agregar el cliente.");
      }
      this.registrarForm.reset(); // Resetear formulario
    }
  }
}
