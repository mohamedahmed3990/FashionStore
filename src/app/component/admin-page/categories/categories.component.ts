import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { ProductService } from '../../../shared/service/product.service';
import { IProduct } from '../../../shared/interface/IAdmin-Products';
import { RouterLink } from '@angular/router';
import { IColors } from '../../../shared/interface/IAdmin-colors';
import { ColorService } from '../../../shared/service/color.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ISizes } from '../../../shared/interface/IAdmin-Sizes';
import { SizeService } from '../../../shared/service/size.service';
import { ICategories } from '../../../shared/interface/IAdmin-Categories';
import { CategoryService } from '../../../shared/service/category.service';

@Component({
  selector: 'app-categories',
  standalone: true, 
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: ICategories[] = [];
  editingCategoryId: number | null = null; // Track the currently edited color ID
  originalCategory: ICategories | null = null;

  constructor(private categoryService: CategoryService,private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading Categories:', err);
      }
    });
  }

  editCategory(categoryId: number, index: number): void {
    this.editingCategoryId = categoryId;
    // Store a deep copy of the original color for cancel functionality
    this.originalCategory = { ...this.categories[index] };
  }


  saveCategory(colorId: number, index: number): void {
    const updatedCategory = this.categories[index];
    // Basic validation
    if (!updatedCategory.name) {
      this.snackBar.open('Name is required', 'Close', { duration: 3000 });
      return;
    }
    // if (!/^#[0-9A-Fa-f]{6}$/.test(updatedColor.name)) {
    //   this.snackBar.open('Hexa must be a valid hex color (e.g., #FF0000)', 'Close', { duration: 3000 });
    //   return;
    // }

    const categoryData = {
      name: updatedCategory.name
    };

    this.categoryService.updateCategory(colorId, categoryData).subscribe({
      next: () => {
        this.editingCategoryId = null;
        this.originalCategory = null;
        this.snackBar.open('Category updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating Category:', err);
        // Revert to original values on error
        this.categories[index] = { ...this.originalCategory! };
        this.editingCategoryId = null;
        this.originalCategory = null;
        this.snackBar.open('Failed to update Category', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    if (this.editingCategoryId !== null && this.originalCategory) {
      const index = this.categories.findIndex(c => c.id === this.editingCategoryId);
      if (index !== -1) {
        this.categories[index] = { ...this.originalCategory };
      }
    }
    this.editingCategoryId = null;
    this.originalCategory = null;
  }


  deleteCategory(colorId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.categoryService.deleteCategory(colorId).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== colorId);
          this.snackBar.open('Category deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error loading products:', err);
        }
      });
    }
  }

}
