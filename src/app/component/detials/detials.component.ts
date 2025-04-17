import { Color, IBasket, IBasketItem, ProductVariant, Size } from './../../shared/interface/product-inerface';
import { Component } from '@angular/core';
import { GetproductService } from '../../shared/service/getproduct.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductInerface } from '../../shared/interface/product-inerface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../shared/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detials.component.html',
  styleUrl: './detials.component.css'
})
export class DetialsComponent {
  productsInCart: Set<number> = new Set();
  quantity: number = 1;
  toggle: boolean = true;
  isLoading: boolean = false;
  isDescriptionOpen: boolean = false;
  WashingOpen: boolean = false;
  Delivary: boolean = false;
  products: ProductInerface[] = [];
  sizes: Size[] = [];
  selectedSize: Size | null = null;
  colors: Color[] = [];
  selectedColor: Color | null = null;
  idproduct: number = 0;
  productDetials: ProductInerface = {} as ProductInerface;
  categoryName: string = '';
  cart: IBasket = { id: '', items: [] };

  constructor(
    private _GetproductService: GetproductService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartserviceService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartStateFromStorage();
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.idproduct = Number(param.get('id'));
        this._GetproductService.getProductDetilas(this.idproduct).subscribe({
          next: (response) => {
            this.productDetials = response;
            const uniqueSizes: Size[] = [];
            this.productDetials.productVariants.forEach(variant => {
              if (!uniqueSizes.find(s => s.name === variant.size.name)) {
                uniqueSizes.push(variant.size);
              }
            });
            this.sizes = uniqueSizes;

            const uniqueColors: Color[] = [];
            this.productDetials.productVariants.forEach(variant => {
              if (!uniqueColors.find(c => c.id === variant.color.id)) {
                uniqueColors.push(variant.color);
              }
            });
            this.colors = uniqueColors;
          }
        });
      }
    });
    this.SimilarProudect();
  }

  selectColor(color: Color): void {
    this.selectedColor = color;
  }

  selectSize(size: Size): void {
    this.selectedSize = size;
  }

  private loadCartStateFromStorage(): void {
    const savedState = localStorage.getItem('productsInCart');
    if (savedState) {
      try {
        const productIds = JSON.parse(savedState);
        this.productsInCart = new Set(productIds);
      } catch (e) {
        console.error('Error loading cart state:', e);
      }
    }
  }

  isProductInCart(productId: number): boolean {
    return this.productsInCart.has(productId);
  }

  private updateCartInStorage(productId: number, isAdding: boolean): void {
    let products: number[] = [];
    const savedState = localStorage.getItem('productsInCart');

    if (savedState) {
      try {
        products = JSON.parse(savedState);
        if (!Array.isArray(products)) {
          products = [];
        }
      } catch (e) {
        console.error('Error parsing cart state:', e);
        localStorage.removeItem('productsInCart');
        products = [];
      }
    }

    if (isAdding) {
      if (!products.includes(productId)) {
        products.push(productId);
      }
    } else {
      const index = products.indexOf(productId);
      if (index > -1) {
        products.splice(index, 1);
      }
    }

    try {
      localStorage.setItem('productsInCart', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving cart state:', e);
    }
  }

  addToCart() {
    if (!this.selectedColor || !this.selectedSize) {
      this._ToastrService.error('Please select color and size');
      return;
    }

    const basketId = this._CartserviceService.getBasketId();
    const selectedVariant = this.productDetials.productVariants.find(
      v => v.color.id === this.selectedColor?.id && v.size.name === this.selectedSize?.name
    );

    if (!selectedVariant) {
      this._ToastrService.error('This combination is not available.');
      return;
    }

    this._CartserviceService.getAllProducts().subscribe({
      next: (existingBasket: any) => {
        const currentItems = existingBasket?.cartItems || [];

        const existingItem = currentItems.find((item: any) => item.id === selectedVariant.id);

        if (existingItem) {
          existingItem.quantity += this.quantity;
        } else {
          currentItems.push({
            id: selectedVariant.id,
            productName: this.productDetials.productName,
            pictureUrl: this.productDetials.productPicture,
            color: this.selectedColor?.name || '',
            size: this.selectedSize?.name || '',
            category: this.productDetials.categoryName,
            price: selectedVariant.price,
            quantity: this.quantity
          });
        }

        const updatedBasket: IBasket = {
          id: basketId,
          items: currentItems,
          paymentIntentId: '',
          clientSecret: ''
        };

        this._CartserviceService.addProductToCart(updatedBasket).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Added to Cart',
              timer: 1500,
              showConfirmButton: false,
            });
            this.productsInCart.add(this.productDetials.productId);
            this.updateCartInStorage(this.productDetials.productId, true);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('An error occurred:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error?.message || 'Could not add to cart',
            });
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading basket before add:', err);
      }
    });
  }

  SimilarProudect(): void {
    this._GetproductService.getAllProduct(this.categoryName).subscribe({
      next: (response) => {
        this.products = response.slice(0, 12);
      }
    });
  }

  toggleDescription(): void {
    this.isDescriptionOpen = !this.isDescriptionOpen;
  }

  washinglist(): void {
    this.WashingOpen = !this.WashingOpen;
  }

  delivary(): void {
    this.Delivary = !this.Delivary;
  }
}
