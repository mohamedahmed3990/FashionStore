import { AuthComponent } from './auth-layout/auth/auth.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BlankComponent } from './blank-layout/blank/blank.component';

import { HomeComponent } from "./component/home/home.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,BlankComponent,AuthComponent,CommonModule,HomeComponent],



  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FashionStore';
}
