import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories = [
    {
      label: 'T-SHIRTS',
      image:  '../../../assets/Home-Images/section-2/img-1-TshirtW.jpg',
      route: '/deals',
    },
    {
      label: 'DENIM',
      image: '../../../assets/Home-Images/section-2/img-2-DENIM.jpg',
      route: '/wheel',
    },
    {
      label: 'DRESSES',
      image: '../../../assets/Home-Images/section-2/img-3-Dress.jpg',

      route: '/new',
    },
    {
      label: 'JACKETS & VESTS',
      image:     '../../../assets/Home-Images/section-2/img-4-Jacket.jpg',
      route: '/jackets',
    },
    {
      label: 'SWEATSHIRTS',
      image:     '../../../assets/Home-Images/section-2/img-5-sweatshirts.jpg',
      route: '/tshirts',
    },
    {
      label: 'NEW ARRIVALS',
      image:     '../../../assets/Home-Images/section-2/img-6-NewArrival.jpg',
      route: '/denim',
    }
  ];

  banners = [
    {
      image: '../../../assets/Home-Images/section-3/img-1.webp',

      route: '/seasonal'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-2.webp',

      route: '/accessories'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-3.webp',

      route: '/men'
    },
    {
      image: '../../../assets/Home-Images/section-3/img-4.webp',


      route: '/maternity'
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
