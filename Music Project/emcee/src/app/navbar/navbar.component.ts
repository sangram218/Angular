import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  data:string="Hello"

  @Output() event = new EventEmitter

  constructor(private router:Router,
    public authService : AuthService) { }

  ngOnInit(): void {
  }

  eventHandler(){
    // this.event.emit(this.data)
    // this.router.navigate(["/artist"],{queryParams:{artistName:this.data}})
  }

}
