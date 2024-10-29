
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, customer, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData:cart[] | undefined;
  orderMsg:string |undefined;

  constructor(private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData=result;
      result.forEach((itam) => {
        if (itam.quantity) {
          price = price + (+itam.price * +itam.quantity);
        }

      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    });
  }
  orderNow(data: customer) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
      setTimeout(()=>{
        item.id && this.product.deleteCartItems(item.id)
      },700);
      })


      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg="Your order has been placed"
          setTimeout(()=>{
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          },4000);

        }
      })
    }


  }
}



