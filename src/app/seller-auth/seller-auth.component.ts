import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService, private router:Router) { }
   showLogin = false
   authError:string = ''
  ngOnInit(): void {
   this.seller.reloadSeller()
  }

  signUp(data:SignUp):void{
     this.seller.userSignUp(data)
  }

  login(data:Login):void{
    this.authError = ""
    // console.warn(data)
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError = "Email or password is not correct"
      }
    })
 }

  openLogin(){
   this.showLogin = true
  }
  openSignUp(){
   this.showLogin = false

  }
}
