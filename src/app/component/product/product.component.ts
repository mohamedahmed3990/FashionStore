
import { myhttpInterceptor } from './../../shared/interceptor/myhttp.interceptor';
import { SearchPipe } from './../../shared/pipe/search.pipe';
import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GetproductService } from '../../shared/service/getproduct.service';
import {  IWishlistItem, ProductInerface } from '../../shared/interface/product-inerface';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { TermTextPipe } from '../../shared/pipe/term-text.pipe';
import { FormsModule } from '@angular/forms';
import { CartserviceService } from '../../shared/service/cartservice.service';
import { ToastrService } from 'ngx-toastr';
import { LimitWordsPipe } from '../../shared/pipe/limit-words.pipe';
import { WishlistService } from '../../shared/service/wishlist.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,SearchPipe , RouterLink,LimitWordsPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements  OnInit , OnDestroy {
constructor(private _GetproductService:GetproductService , private _ActivatedRoute:ActivatedRoute,private _CartserviceService:CartserviceService,private _ToastrService:ToastrService,private _WishlistService:WishlistService ){}
products:ProductInerface[]=[];



  categoryName: string = '';
  subscribId!: Subscription;
  searchTerm:string='';



  ngOnInit(): void {
    this.subscribId = this._ActivatedRoute.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      this.fetchProducts();
    });


    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedSubCategory = params['category'];
        this.applyFilters();
      }
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

addToWishlist(item: IWishlistItem): void {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  if (!wishlist.find((p: IWishlistItem) => p.id === item.id)) {
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));  // Save wishlist to localStorage
  }
}



hasWishlistItems = false;
public wishlistService = inject(WishlistService);  // Inject the WishlistService

toggleWishlist(product: ProductInerface): void {
  // Map ProductInerface to IWishlistItem
  const wishlistItem: IWishlistItem = {
    id: product.productId,
    name: product.productName,
    price: product.productVariants[0]?.price, // Assuming price comes from productVariants
    image: product.productPicture
  };

  if (this.wishlistService.isInWishlist(product.productId)) {
    this.wishlistService.removeFromWishlist(product.productId);
  } else {
    this.wishlistService.addToWishlist(wishlistItem);
  }
}


}
