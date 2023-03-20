import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
productList :undefined |product[];
productMessage:undefined|string
  constructor(private product:ProductsService) { }

  ngOnInit(): void {
   this.list()
  }


 
  deleteProduct(id:number){
       console.warn("test id",id)
       this.product.deleteProduct(id).subscribe((result)=>{
            if(result){
               this.productMessage = "Product Delete Successful"
              this.list()
            }
       })
    setTimeout(()=>(this.productMessage = undefined),3000) 

  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result)
      this.productList=result
   })
  }


}
