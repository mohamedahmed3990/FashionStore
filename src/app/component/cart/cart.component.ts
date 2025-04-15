import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../shared/service/cartservice.service';
import { ToastrService } from 'ngx-toastr';
import { GetproductService } from '../../shared/service/getproduct.service';
import {  IBasket, IBasketItem, ProductInerface } from '../../shared/interface/product-inerface';
import { UUIDTypes, v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

  export class CartComponent implements OnInit {
    constructor( private _CartService :CartserviceService, private _ToastrService:ToastrService , private _GetproductService:GetproductService ){}
     
    cartDetails:any={}
      products:IBasket={} as IBasket;

  
    ngOnInit(): void {
      let basketIddFromStorage: string | null = localStorage.getItem('basketId');

      if (!basketIddFromStorage) {
        // لو ما لقيتش القيمة في localStorage، تولدي UUID جديد أو تعيّني قيمة افتراضية
        basketIddFromStorage = uuidv4(); // مثلاً باستخدام uuidv4()
        localStorage.setItem('basketId', basketIddFromStorage);
      }
      
      // دلوقتي نقدر نحدد متغير من نوع string
      let basketIdd: string = basketIddFromStorage;
      this._CartService.getUserCart(basketIdd).subscribe({
        next:(response )=>{
          console.log(response);
          
          this.products=response
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      // this.SimilarProudect( );
    }
     
    removeCartItem( id:number ):void{
      this._CartService.removeItem( id).subscribe({
        next:( response )=>{
          console.log(response.data);
          
          this.products=response;
        },
        error:(err)=>{ 
          console.log(err);
          
        }
  
      })
    }
    
    // changeCount( id:string,count:number ):void{
    //  if( count>0 ){
    //   this._CartService.updateCartProduct( id,count ).subscribe({
    //     next:( response )=>{
    //       this.products=response
    //     },
    //     error:(err)=>{
    //       console.log(err);
          
    //     }
    //   })
    //  }
    // }
  
    // SimilarProudect(name:string ): void{
    //   this._GetproductService.getAllProduct(name).subscribe({
    //     //response byshel eldata eli gaya mn backend
    //     next:(response:any)=>{
    //       this.products= response.data.slice(0,12);
    //     },
    //     error:(err:any)=>{
    //       console.log(err)
    //     }
        
    //   })
    // }
  
   
  
    // , selectedSize:string), selectedSize
  //   addCart(id:number ):void{
  //     this._CartService.addToCart(id).subscribe({
  //      next:( response)=>{
  //       console.log(response);
  //       this._ToastrService.success( response.message )
  //      },
  //      error:(err)=>{
  //       console.log(err);
        
  //      }
  //       }
  //     )
  //   
  //   }
    
  
  }

