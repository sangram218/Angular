import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;

  constructor(private authService : AuthService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  onLogin(credentials:any){
    // console.log(credentials.value)
    if(this.authService.login(credentials.value)){
      this.router.navigate(['/artist'])
    }
    else{
      this.invalidLogin=true
    }
  }

}
