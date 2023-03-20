import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
addProductMessage:string |undefined
  constructor(private products:ProductsService) { }

  ngOnInit(): void {
  }
  Product(data:product){
  // console.warn(data)
  this.products.addProduct(data).subscribe((result)=>{
    console.warn(result)
    if(result){
          this.addProductMessage = "Product is Successful Added"
    }
    setTimeout(()=>(this.addProductMessage = undefined),3000) 
  })
  }
}
