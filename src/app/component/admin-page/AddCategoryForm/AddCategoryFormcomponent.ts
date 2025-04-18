import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizeService } from '../../../shared/service/size.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../shared/service/category.service';

@Component({
  selector: 'app-AddCategoryForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './AddCategoryForm.component.html',
  styleUrl: './AddCategoryForm.component.css'
})

export class AddCategoryFormComponent implements OnInit {
  AddCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.AddCategoryForm = this.fb.group({
      Name: ['', Validators.required],  // Match backend DTO property name
    });
  }


  onSubmit(): void {
    if (this.AddCategoryForm.valid) {
      console.log("valid");
      const categoryData = this.AddCategoryForm.value;
      console.log(categoryData);
      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Category added successfully!', response);
          this.router.navigate(['/admin-page/categories']);
        },
        error: (err) => {
          console.error('Error adding category:', err);
        }
      });
    }
  }
}
