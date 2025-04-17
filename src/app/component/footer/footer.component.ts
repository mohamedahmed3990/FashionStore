import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule , RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  showDropdown = false;
  selectedName = '';
  selectedImage = 'assets/image1.jpg';
  Delivary:boolean=false;
  mostafa:boolean=false;
  mohamed:boolean=false;


  delivary():void {
    this.Delivary=!this.Delivary
 }

 Mostafa():void{
  this.mostafa=!this.mostafa
 }
  Mohamed():void {
    this.mohamed=!this.mohamed;
  }

  selectItem(name: string, image: string) {
    this.selectedName = name;
    this.selectedImage = image;
    this.showDropdown = false;
  }
}

