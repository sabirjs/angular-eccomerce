import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
cartData:cart[]|undefined;
priceSummary:priceSummary={
  price:0,
  discount:0,
  tax:0,
  delivery:0,
  total: 0
}
  constructor(private product:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }

loadDetails(){
  this.product.currentCart().subscribe((result)=>{
    this.cartData = result;
    let price = 0;
    result.forEach((item)=>{
     if(item.quantity){
     price = price+(+item.Price* + item.quantity)        
        
     }
    })
   this.priceSummary.price=price;
   this.priceSummary.discount=price/10;
   this.priceSummary.tax=price/10;
   this.priceSummary.delivery=100;
   this.priceSummary.total=price+(price/10)+100-(price/10);
  //  console.warn(this.priceSummary);
   if(!this.cartData.length){
    this.router.navigate(['/'])
   }

 })
}

  checkout(){
      this.router.navigate(['/checkout'])
  }
  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
     this.loadDetails()
    })
  }


}
