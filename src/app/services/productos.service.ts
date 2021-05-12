import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.inferface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-d5e8c-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve;
      });
    });
  }

  getProducto(id:string){
    return this.http.get(`https://angular-html-d5e8c-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string){
    if(this.productos.length === 0){
      this.cargarProductos().then( ()=> {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    // console.log(this.productos)
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrados.push(prod);
      }
    });
  }
}
 