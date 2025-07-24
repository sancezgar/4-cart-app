import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalogo',
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styles: ``
})
export class CatalogoComponent implements OnInit{

  products!:Product[];

  constructor(private sharingDataService:SharingDataService,
              private productService:ProductService){}

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddCart(product:Product){
    this.sharingDataService.productEventEmmiter.emit(product);
  }

}
