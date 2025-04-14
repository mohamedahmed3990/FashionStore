import { ProductComponent } from './../../component/product/product.component';
import { BlankNavComponent } from './../../component/blank-nav/blank-nav.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlankNavComponent,RouterLink,ProductComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
