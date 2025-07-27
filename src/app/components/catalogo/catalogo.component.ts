import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalogo',
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styles: ``
})
export class CatalogoComponent implements OnInit{

  products!: Product[];

  
  constructor(
    private store: Store<{ products: any }>,
    private sharingDataService: SharingDataService,
    private productService: ProductService) {
      this.store.select(state => state.products).subscribe(state =>this.products = state.products)
    }

    ngOnInit(): void {
      this.store.dispatch(load({products:this.productService.findAll()}));
    }
    
  onAddCart(product: Product) {
    this.sharingDataService.productEventEmmiter.emit(product);
  }

}
