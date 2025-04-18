import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface DashboardItem {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  protected readonly dashboardItems: DashboardItem[] = [
    {
      title: 'Products',
      description: 'Manage your product catalog, inventory and pricing',
      icon: 'inventory_2',
      link: 'products',
      color: '#3f51b5'
    },
    {
      title: 'Categories',
      description: 'Organize and manage product categories',
      icon: 'category',
      link: 'categories',
      color: '#4caf50'
    },
    {
      title: 'Sub Categories',
      description: 'Organize and manage product Sub categories',
      icon: 'category',
      link: 'subcategories',
      color: '#4caf50'
    },
    {
      title: 'Sizes',
      description: 'Manage available product sizes',
      icon: 'straighten', // or 'format_size'
      link: 'sizes',
      color: '#ff9800' // orange color
    },
    {
      title: 'Colors',
      description: 'Manage available product colors',
      icon: 'palette',
      link: 'colors',
      color: '#e91e63' // pink color
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  isDashboardView(): boolean {
    return this.router.url === '/admin-page' || this.router.url === '/admin-page/';
  }
}