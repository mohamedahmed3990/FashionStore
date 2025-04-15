
import { myhttpInterceptor } from './../../shared/interceptor/myhttp.interceptor';
import { SearchPipe } from './../../shared/pipe/search.pipe';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GetproductService } from '../../shared/service/getproduct.service';
import {  ProductInerface } from '../../shared/interface/product-inerface';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { TermTextPipe } from '../../shared/pipe/term-text.pipe';
import { FormsModule } from '@angular/forms';
import { CartserviceService } from '../../shared/service/cartservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,SearchPipe , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements  OnInit , OnDestroy {
constructor(private _GetproductService:GetproductService , private _ActivatedRoute:ActivatedRoute,private _CartserviceService:CartserviceService,private _ToastrService:ToastrService ){}
products:ProductInerface[]=[];

  categoryName: string = '';
  subscribId!: Subscription;
  searchTerm:string='';

  // ngOnInit(): void {
  //   this.subscribId = this._ActivatedRoute.paramMap.subscribe(params => {
  //     this.categoryName = params.get('name') || '';
      
  //     this._GetproductService.getAllProduct(this.categoryName).subscribe({
  //       next: (response) => {
  //         this.products = response
  //         console.log(response);
  //         ;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching products:', err);
  //       }
  //     });
  //   });
  // }

  ngOnInit(): void {
    this.subscribId = this._ActivatedRoute.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      this.fetchProducts();
    });
  }

  // Method to handle the sorting of products by price
  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortBy = target.value;
  
    if (sortBy) {
      this._GetproductService.getProductSortedPrice(this.categoryName, sortBy).subscribe({
        next: (response) => {
          this.products = response;
        },
        error: (err) => {
          console.error('Error fetching sorted products:', err);
        }
      });
    } else {
      this.fetchProducts(); // بدون ترتيب
    }
  }
  
  

  // Fetch products with the default sorting (unsorted)
  fetchProducts(): void {
    this._GetproductService.getAllProduct(this.categoryName).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
  
  cartDetails:any={};
  addCart(product: ProductInerface): void {
    this._CartserviceService.addToCart({
      id: product.productId,
      productName: product.productName,
      price: 100,
      quantity: 1,
      pictureUrl:product.productPicture,
      category: product.categoryName,
      size: 'm',
      color: 'red'
    })
    .subscribe({
      // next: res => console.log(res),
      // error: err => console.log(err)
    // });
  
    // this._CartserviceService.addToCart(productToSend).subscribe({
      next: (response) => {
        this.cartDetails = response;
        // this._CartserviceService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  ngOnDestroy(): void {
    if (this.subscribId) {
      this.subscribId.unsubscribe();
    }
  }

 selectedColor: string = "";
selectedSize: string = "";
selectedSubCategory: string = "";
selectedSort: string = "";

applyFilters(): void {
  const color = this.selectedColor || "";
  const size = this.selectedSize || "";
  const subCategory = this.selectedSubCategory || "";
  const sortBy = this.getSortByValue(this.selectedSort); // ترجع 'asc' أو 'desc' أو ''

  this._GetproductService.getProducfilter(
    this.categoryName,
    sortBy,
    color,
    size,
    subCategory
  ).subscribe({
    next: (response) => {
      this.products = response;
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}
getSortByValue(selected: string): string {
  switch (selected) {
    case 'lowest price':
      return 'asc';
    case 'highest price':
      return 'desc';
    default:
      return '';
  }
}

//   selectedColor: string = "";
// selectedSize: string = "";
// selectedSubCategory: string = "";

// applyFilters(): void {
//   const color = this.selectedColor || "";
//   const size = this.selectedSize || "";
//   const subCategory = this.selectedSubCategory || "";

//   this._GetproductService.getProducfilter(this.categoryName,color, size, subCategory).subscribe({
//     next: (response) => {
//       this.products = response;
//     },
//     error: (err) => {
//       console.error('Error:', err);
//     }
//   });
// }
}
