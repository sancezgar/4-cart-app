import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items:CartItem[] = [];
  total:number=0;
  showCart:boolean = false;

  constructor(
    private sharingDataService:SharingDataService,
    private router:Router,
    private store:Store<{items:ItemsState}>){
      this.store.select(state=>state.items).subscribe(state => {
        this.items = state.items;
        this.saveSession();
        console.log('cambio de estado cart-app ' + state.total)
      })
    }
    
    ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.sharingDataService.productEventEmmiter.subscribe(product => {
      /* console.log(product + 'Se ha agregado al carrito') */
      this.store.dispatch(add({product}));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Shopping",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });
    })
  }

  onDeleteCart(){
    this.sharingDataService.idProductEventEmmiter.subscribe((id:number)=>{

      Swal.fire({
        title: "Estas seguro que deseas eliminar?",
        text: "Cuidado el item se eliminará del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          /* console.log(id + ' se ha ejecutado el evento de eliminar producto'); */
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });

    });
  }


  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

  openCart():void{
    this.showCart = !this.showCart;
  }

}
