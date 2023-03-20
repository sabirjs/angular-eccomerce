import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems = 0
  constructor(private route: Router, private Product: ProductsService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = "seller"
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
          this.Product.getCartList(userData.id)
        }else {
          this.menuType = "default"
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if(cartData){
    this.cartItems= JSON.parse(cartData).length
    }
    this.Product.cartData.subscribe((items)=>{
   this.cartItems=items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.Product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.Product.searchProducts(element.value).subscribe((result) => {
        // console.warn(result);
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])

  }
  submitSearch(val: string) {
    console.warn(val)
    this.route.navigate([`search/${val}`])

  }


}
