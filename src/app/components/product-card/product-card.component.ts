import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product!:Product;

  @Output() productEventEmmiter: EventEmitter<Product> = new EventEmitter();
  onAddCart(product:Product){
    this.productEventEmmiter.emit(product);
  }
}
