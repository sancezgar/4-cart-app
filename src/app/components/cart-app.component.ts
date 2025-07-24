import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items:CartItem[] = [];
  total:number=0;
  showCart:boolean = false;

  constructor(private productService:ProductService, 
    private sharingDataService:SharingDataService,
    private router:Router){}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.sharingDataService.productEventEmmiter.subscribe(product => {
      /* console.log(product + 'Se ha agregado al carrito') */
      const hasItem = this.items.find(i => i.product.id === product.id);
      if(hasItem){
        this.items = this.items.map(i=>{
          if(i.product.id === product.id){
            return {... i,quantity: i.quantity+1}
          }
          return i;
        });
      }else{
        this.items = [... this.items, {product:{...product},quantity:1}];
      }
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'],{
        state:{items: this.items, total: this.total}
      });

      Swal.fire({
        title: "Shopping",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });
    })
  }

  onDeleteCart(){
    this.sharingDataService.idProductEventEmmiter.subscribe(id=>{

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
          this.items = this.items.filter(i => i.product.id !== id);
          if(this.items.length == 0){
            sessionStorage.removeItem("cart");
          }
          this.calculateTotal();
          this.saveSession();
    
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.router.navigate(['/cart'],{
              state:{items: this.items, total: this.total}
            });
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });

    });
  }

  calculateTotal():void{
    this.total = this.items.reduce((acc,item) => acc + (item.quantity * item.product.price),0);
  }

  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

  openCart():void{
    this.showCart = !this.showCart;
  }

}
