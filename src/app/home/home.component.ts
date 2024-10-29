import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  populerProducts:undefined | product[];
  trendyProduct: undefined | product[];
  constructor(private product:ProductService){
  }

  ngOnInit(): void{
    this.product.populerProducts().subscribe((data)=>{
      console.warn(data);
      this.populerProducts=data;
    });
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProduct=data;
    });
  } 

}
