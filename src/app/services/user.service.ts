import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { SignUp,Login } from '../data-type';
import { Router } from '@angular/router';
// import { invalid } from '@angular/compiler/src/render3/view/util';
@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUserAuth=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:SignUp){
   this.http.post('http://localhost:3000/users',user,{observe:'response'}).subscribe((result)=>{
       console.warn(result);
       if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
       }
   })
  }
userLogin(data:Login){
  this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{ observe: 'response' }).subscribe((result)=>{
    if(result && result.body?.length){
        this.invalidUserAuth.emit(false)
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
    }else{
      this.invalidUserAuth.emit(true)
    }
  })
}

  userAuthReload(){
   if(localStorage.getItem('user')){
        this.router.navigate(['/']);
   }
  }
}
