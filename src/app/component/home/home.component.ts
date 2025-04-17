import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    // FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories = [
    {
      label: 'Shirts',
      cat:'Shirts',
      image:  '../../../assets/Home-Images/section-2/img-1-TshirtW.jpg',
      route: '/product/women',
    },
    {
      label: 'DENIM',
      cat:'Jackets',

      image: '../../../assets/Home-Images/section-2/img-2-DENIM.jpg',
      route: '/product/men',
    },
    {
      label: 'DRESSES',
      cat:'Vests',

      image: '../../../assets/Home-Images/section-2/img-3-Dress.jpg',

      route: '/product/women',
    },
    {
      label: 'JACKETS & VESTS',
      cat:'Vests',

      image:     '../../../assets/Home-Images/section-2/img-4-Jacket.jpg',
      route: '/product/men',
    },
    {
      label: 'SWEATSHIRTS',
      cat:'Jackets',

      image:     '../../../assets/Home-Images/section-2/img-5-sweatshirts.jpg',
      route: '/product/kids',
    },
    {
      label: 'NEW ARRIVALS',
      cat:'Jackets',

      image:     '../../../assets/Home-Images/section-2/img-6-NewArrival.jpg',
      route: '/product/women',
    }
  ];

  banners = [
    {
      image: '../../../assets/Home-Images/section-3/img-1.webp',

      route: '/product/women'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-2.webp',

      route: '/product/women'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-3.webp',

      route: '/product/women'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-4.webp',


      route: '/product/kids'
    },

  ];


  features = [

    {
      icon: '../../../assets/Features/img-1.png',

    },
    {
      icon: '../../../assets/Features/img-2.png',


    },
    {
      icon: '../../../assets/Features/img-3.png',


    }
  ];
}
