import { Component, OnInit } from '@angular/core';
import { Login, SignUp, product, cart } from '../data-type';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  authError: string = '';
  showLogin: boolean = true
  constructor(private user: UserService, private product: ProductsService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data)
  }

  logIn(data: Login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn(result);
      if (result) {
        this.authError = 'Please enter a valid user details'
      } else {
        this.locatCartToRemoteCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }

  openSignUp() {
    this.showLogin = false
  }

  locatCartToRemoteCart(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id; 
    if (data) {
      let cartDataList: product[] = JSON.parse(data)                                                      
      cartDataList.forEach((product: product, index) => {
        let CartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete CartData.id
        setTimeout(() => {
          this.product.addToCart(CartData).subscribe((result) => {
            if (result) {
              console.warn("item stored in db");
            }
          })
          if (cartDataList.length === index+1) {
            localStorage.removeItem('localCart')
          }
        }, 500)
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }

}
