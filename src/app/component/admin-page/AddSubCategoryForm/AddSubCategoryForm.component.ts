import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/service/product.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory} from '../../../shared/interface/ICategory';
import { ISubCategory } from '../../../shared/interface/ISubCategory';
import { SubCategoryService } from '../../../shared/service/subcategory.service';

@Component({
  selector: 'app-AddProductForm',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './AddSubCategoryForm.component.html',
  styleUrls: ['./AddSubCategoryForm.component.css']
})
export class AddSubCategoryFormComponent implements OnInit {
  addSubCategoryForm!: FormGroup;
  categories: ICategory[] = [];  
  // subCategories: ISubCategory[] = [];  

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private subcategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
    //this.loadSubCategories()
  }

 
  createForm(): void {
    this.addSubCategoryForm = this.fb.group({
      subCategoryName: ['', Validators.required],
      categoryName: ['', Validators.required],
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
  //   return this.addSubCategoryForm.get('productVariants') as FormArray;
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
    if (this.addSubCategoryForm.valid) {
      const formData  = this.addSubCategoryForm.value;
      const subCategoryData = {
        SubCategoryName: formData.subCategoryName,
        CategoryId: formData.categoryName  // Note: categoryName is actually the ID from the select
      };
      this.subcategoryService.createSubCategory(subCategoryData).subscribe({
        next: (response) => {
          console.log('Subcategory added successfully!', response);
          this.router.navigate(['/admin-page/subcategories']);   
        },
        error: (err) => {
          console.error('Error adding Subcategory:', err);
        }
      });
    }
  }



  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  
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

