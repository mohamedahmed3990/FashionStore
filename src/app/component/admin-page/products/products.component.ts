import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { ProductService } from '../../../shared/service/product.service';
import { IProduct } from '../../../shared/interface/IAdmin-Products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true, 
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  updateProduct(productId: number): void {
    console.log('Update product with ID:', productId);
    // Call the backend API to update the product, e.g. navigate to edit page
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
    
  }
}
