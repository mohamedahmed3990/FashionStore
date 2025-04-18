import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/service/product.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../shared/interface/ICategory';
import { ISubCategory } from '../../../shared/interface/ISubCategory';
import { ColorService } from '../../../shared/service/color.service';
import { SizeService } from '../../../shared/service/size.service';

@Component({
  selector: 'app-AddProductForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './AddProductForm.component.html',
  styleUrls: ['./AddProductForm.component.css']
})
export class AddProductFormComponent implements OnInit {
  addProductForm!: FormGroup;
  categories: ICategory[] = [];
  subCategories: ISubCategory[] = [];
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  colors: any[] = [];   // <-- dynamically loaded
  sizes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private colorService: ColorService,  // <-- Add this
    private sizeService: SizeService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
    this.loadSubCategories()
    this.loadColors();    // <-- call this method
    this.loadSizes()
  }


  createForm(): void {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      categoryName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      productVariants: this.fb.array([this.createVariant()]) // Array of variants
    });
  }

  loadColors(): void {
    this.colorService.getColors().subscribe({
      next: (data) => {
        this.colors = data;
      },
      error: (err) => {
        console.error('Error loading colors:', err);
      }
    });
  }

  loadSizes(): void {
    this.sizeService.getSizes().subscribe({
      next: (data) => {
        console.log(data)
        this.sizes = data;
      },
      error: (err) => {
        console.error('Error loading sizes:', err);
      }
    });
  }

  createVariant(): FormGroup {
    return this.fb.group({
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get productVariants(): FormArray {
    return this.addProductForm.get('productVariants') as FormArray;
  }

  addVariant(): void {
    console.log('Adding new variant...');
    this.productVariants.push(this.createVariant());
    console.log(this.productVariants.controls);
  }

  removeVariant(index: number): void {
    this.productVariants.removeAt(index);
  }


  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length) {
  //     this.selectedFiles = Array.from(input.files);
  //     this.imagePreviews = [];

  //     this.selectedFiles.forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         if (typeof reader.result === 'string') {
  //           this.imagePreviews.push(reader.result);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      // Only take the first file since backend expects single image
      this.selectedFiles = [input.files[0]];
      this.imagePreviews = [];

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imagePreviews = [reader.result];
        }
      };
      reader.readAsDataURL(this.selectedFiles[0]);
    }
  }


  // onSubmit(): void {
  //   if (this.addProductForm.valid) {
  //     const productData = this.addProductForm.value;
  //     this.productService.createProduct(productData).subscribe({
  //       next: (response) => {
  //         console.log('Product added successfully!', response);
  //         this.router.navigate(['/admin-page/products']);   
  //       },
  //       error: (err) => {
  //         console.error('Error adding product:', err);
  //       }
  //     });
  //   }
  // }
  onSubmit(formData: any): void {
    console.log(formData.value)
    if (this.addProductForm.valid) {
      const formValue = this.addProductForm.value;
      const productData = new FormData();

      // Append form fields to FormData
      productData.append('ProductName', formValue.productName);
      productData.append('Description', formValue.description);
      productData.append('CategoryId', formValue.categoryName);
      productData.append('SubCategoryId', formValue.subCategoryName);


      const firstVariant = formValue.productVariants[0];
      productData.append('ColorId', firstVariant.colorId);
      productData.append('SizeId', firstVariant.sizeId);
      productData.append('Price', firstVariant.price);;

      productData.append('ProductVariants', JSON.stringify(formValue.productVariants));

      console.log('Form Value:', formValue);
      //console.log('Variants being sent:', variants);
      //console.log('Full FormData:', Object.fromEntries(productData.entries()));

      // Append variants as JSON
      //productData.append('productVariants', JSON.stringify(this.addProductForm.get('productVariants')?.value));

      // Append selected image files (Newly Added)
      if (this.selectedFiles.length > 0) {
        productData.append('Image', this.selectedFiles[0]);
      }

      // Call your service
      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          console.log('Product added successfully!', response);
          this.router.navigate(['/admin-page/products']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
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



  loadSubCategories(): void {
    this.productService.getSubCategories().subscribe({
      next: (data) => {
        this.subCategories = data;
      },
      error: (err) => {
        console.error('Error loading subcategories:', err);
      }
    });
  }
}

