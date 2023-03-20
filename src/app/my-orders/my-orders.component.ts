import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
orderData:order[]|undefined
  constructor( private products:ProductsService) { }

  ngOnInit(): void {
      this.getOrderList();  
  }
  cancelOrder(orderId:number|undefined){
      orderId && this.products.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();  
    })
  }
  getOrderList(){
    this.products.orderList().subscribe((result)=>{
      this.orderData=result
    })
  }

}
