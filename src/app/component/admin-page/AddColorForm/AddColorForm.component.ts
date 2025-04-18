import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/service/product.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../../shared/service/color.service';
// import { ICategory} from '../../../shared/interface/ICategory';
// import { ISubCategory } from '../../../shared/interface/ISubCategory';

@Component({
  selector: 'app-AddColorForm',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './AddColorForm.component.html',
  styleUrls: ['./AddColorForm.component.css']
})
export class AddColorFormComponent implements OnInit {
  addColorForm!: FormGroup;
  // categories: ICategory[] = [];  
  // subCategories: ISubCategory[] = [];  

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.loadCategories();
    // this.loadSubCategories()
  }

 
  createForm(): void {
    this.addColorForm = this.fb.group({
      Name: ['', Validators.required],  // Match backend DTO property name
      Hexa: ['', [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i)]]
    });
  }


  // createVariant(): FormGroup {
  //   return this.fb.group({
  //     color: ['', Validators.required],
  //     size: ['', Validators.required],
  //     price: ['', [Validators.required, Validators.min(0)]]
  //   });
  // }

  // get productVariants(): FormArray {
  //   return this.addProductForm.get('productVariants') as FormArray;
  // }

  // addVariant(): void {
  //   console.log('Adding new variant...');
  //   this.productVariants.push(this.createVariant());
  //   console.log(this.productVariants.controls);
  // }

  // removeVariant(index: number): void {
  //   this.productVariants.removeAt(index);
  // }

  onSubmit(): void {
    if (this.addColorForm.valid) {
      console.log("valid");
      const colorData = this.addColorForm.value;
      console.log(colorData);
      this.colorService.createColor(colorData).subscribe({
        next: (response) => {
          console.log('Color added successfully!', response);
          this.router.navigate(['/admin-page/colors']);   
        },
        error: (err) => {
          console.error('Error adding color:', err);
        }
      });
    }
  }

 

  // loadCategories(): void {
  //   this.productService.getCategories().subscribe({
  //     next: (data) => {
  //       this.categories = data;
  //     },
  //     error: (err) => {
  //       console.error('Error loading categories:', err);
  //     }
  //   });
  // }

  
  // loadSubCategories(): void {
  //   this.productService.getSubCategories().subscribe({
  //     next: (data) => {
  //       this.subCategories = data;
  //     },
  //     error: (err) => {
  //       console.error('Error loading subcategories:', err);
  //     }
  //   });
  // }
}

