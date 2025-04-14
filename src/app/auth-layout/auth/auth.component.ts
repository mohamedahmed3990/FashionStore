import { LoginComponent } from './../../component/login/login.component';
import { AuthNavComponent } from './../../component/auth-nav/auth-nav.component';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../../component/register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthComponent,RouterLink,RouterLinkActive,RouterOutlet,AuthNavComponent,LoginComponent,RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
