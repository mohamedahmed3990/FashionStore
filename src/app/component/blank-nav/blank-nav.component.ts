import { ProductComponent } from './../product/product.component';
import { Component } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blank-nav',
  standalone: true,
  imports: [CommonModule,  RouterModule, FormsModule,ProductComponent , RouterModule],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.css'
})
export class BlankNavComponent {
constructor(private _AuthService:AuthService , private _Router:Router){}
logoutUser():void{
  this._AuthService.logout();
   }

   
}
