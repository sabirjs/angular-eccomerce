import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { setTimeout } from 'timers';
import { cart, order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined
  cartData: cart[] | undefined
  orderMsg:string|undefined;
  constructor(private product: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.Price * + item.quantity)

        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10)
      console.warn(this.totalPrice);


    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => (
          item.id && this.product.deleteCartItems(item.id)
        ), 700)
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
           this.orderMsg = "Your order has been Placed"
          setTimeout(() => {
          this.router.navigate(['/my-orders'])
          this.orderMsg=undefined
          }, 4000);
        }

      })
    }

  }

}
