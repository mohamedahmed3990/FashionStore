import { Color, IBasket, IBasketItem, ProductVariant, Size } from './../../shared/interface/product-inerface';
import { Component } from '@angular/core';
import { GetproductService } from '../../shared/service/getproduct.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductInerface } from '../../shared/interface/product-inerface';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from '../../shared/service/cartservice.service';


@Component({
  selector: 'app-detials',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './detials.component.html',
  styleUrl: './detials.component.css'
})
export class DetialsComponent {
constructor(private _GetproductService:GetproductService , private _ActivatedRoute:ActivatedRoute ,private _ToastrService:ToastrService ,private _CartserviceService:CartserviceService){}
isDescriptionOpen: boolean = false;
  WashingOpen:boolean=false;
  Delivary:boolean=false;
  products:ProductInerface[]=[];
  sizes: Size[] = [];
  selectedSize: Size | null = null;

  colors: Color[] = [];
selectedColor: Color | null = null;

selectColor(color: Color): void {
  this.selectedColor = color;
}
 idproduct: number =0;


  productDetials:ProductInerface={} as ProductInerface;
  selectSize(size: Size): void {
    this.selectedSize= size;
  }
  ngOnInit(): void {
    const basket = this._CartserviceService.getBasketFromLocalStorage();
    if (basket) {
      this.cart = basket; 
    }

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => { 
        this.idproduct = Number(param.get('id')) ;

        this._GetproductService.getProductDetilas(this.idproduct).subscribe({
          next: (response) => {
         
            this.productDetials = response;
        
            
            // استخراج المقاسات الفريدة
            const uniqueSizes: Size[] = [];
            this.productDetials.productVariants.forEach(variant => {
              if (!uniqueSizes.find(s => s.name === variant.size.name)) {
                uniqueSizes.push(variant.size);
              }
            });
            this.sizes = uniqueSizes;
  
            // استخراج الألوان الفريدة
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
  
  
  categoryName: string = '';
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

cart: IBasket = { id: '', items: [] };
addCart(): void {
  if (!this.selectedSize || !this.selectedColor) {
    this._ToastrService.error('Please choose both size and color before adding the product to the cart.');
    return;
  }
  let foundVariant = this.productDetials.productVariants.find(e => 
    e.size.name === this.selectedSize?.name && e.color.id === this.selectedColor?.id);
  const basketItem: IBasketItem = {
    
    id:this.idproduct,
    productName: this.productDetials.productName,
    price: this.productDetials.productVariants.find(e => 
      e.size.name === this.selectedSize?.name && 
      e.color.id === this.selectedColor?.id)?.price || 0,
    quantity: 1,
    pictureUrl: this.productDetials.productPicture,
    size: this.selectedSize.name,
    category: this.productDetials.categoryName,
    color: this.selectedColor.name
  };
  console.log('Item:', basketItem);
  this._CartserviceService.addToCart(basketItem).subscribe({
    next: (response: IBasket) => {
      this.cart = response;
      this._ToastrService.success('The product has been added to the cart.');
      console.log('Item to add:', basketItem);
    },
    error: (err: any) => {
      console.error(err);
      this._ToastrService.error('An error occurred while adding the product to the cart.');
    }
  });
}

}


