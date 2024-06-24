import { Component, OnInit } from '@angular/core';

interface Producto {
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: { [key: string]: Producto } = {};

  constructor() { }

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  verCarrito(): void {
    this.actualizarCarrito();
    const carritoModal = document.getElementById('carritoModal');
    if (carritoModal) {
      // Abre el modal (necesitas un framework de UI para modal)
    }
  }

  comprar(producto: string, precio: number): void {
    if (this.carrito[producto]) {
      this.carrito[producto].cantidad++;
    } else {
      this.carrito[producto] = { cantidad: 1, precio: precio };
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  incrementarProducto(producto: string): void {
    if (this.carrito[producto]) {
      this.carrito[producto].cantidad++;
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.actualizarCarrito();
    }
  }

  disminuirProducto(producto: string): void {
    if (this.carrito[producto]) {
      this.carrito[producto].cantidad--;
      if (this.carrito[producto].cantidad === 0) {
        delete this.carrito[producto];
      }
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.actualizarCarrito();
    }
  }

  obtenerTotal(): number {
    let total = 0;
    for (const producto in this.carrito) {
      if (this.carrito.hasOwnProperty(producto) && this.carrito[producto] !== null) {
        total += this.carrito[producto].cantidad * this.carrito[producto].precio;
      }
    }
    return total;
  }
}
