import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

type NewType = product;

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product: ProductService) { }


  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = "Product is Successfully added";
      }
      setTimeout(() => this.addProductMessage = undefined, 3000);

    });
  }
}
