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
import { ISubCategories } from '../../../shared/interface/IAdmin-SubCategories';
import { SubCategoryService } from '../../../shared/service/subcategory.service';

@Component({
  selector: 'app-subcategories',
  standalone: true, 
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  subcategories: ISubCategories[] = [];
  editingSubCategoryId: number | null = null; // Track the currently edited color ID
  originalSubCategory: ISubCategories | null = null;

  constructor(private subcategoryService: SubCategoryService,private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.subcategoryService.getSubCategories().subscribe({
      next: (data) => {
        this.subcategories = data;
      },
      error: (err) => {
        console.error('Error loading SubCategory:', err);
      }
    });
  }

  editSubCategory(subcategoryId: number, index: number): void {
    this.editingSubCategoryId = subcategoryId;
    // Store a deep copy of the original color for cancel functionality
    this.originalSubCategory = { ...this.subcategories[index] };
  }


  saveSubCategory(subcategoryId: number, index: number): void {
    const updatedCategory = this.subcategories[index];
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

    this.subcategoryService.updateCategory(subcategoryId, categoryData).subscribe({
      next: () => {
        this.editingSubCategoryId = null;
        this.originalSubCategory = null;
        this.snackBar.open('SubCategory updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating SubCategory:', err);
        // Revert to original values on error
        this.subcategories[index] = { ...this.originalSubCategory! };
        this.editingSubCategoryId = null;
        this.originalSubCategory = null;
        this.snackBar.open('Failed to update SubCategory', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    if (this.editingSubCategoryId !== null && this.originalSubCategory) {
      const index = this.subcategories.findIndex(c => c.id === this.editingSubCategoryId);
      if (index !== -1) {
        this.subcategories[index] = { ...this.originalSubCategory };
      }
    }
    this.editingSubCategoryId = null;
    this.originalSubCategory = null;
  }


  deleteSubCategory(subcategoryId: number): void {
    if (confirm('Are you sure you want to delete this SubCategory?')) {
      this.subcategoryService.deleteSubCategory(subcategoryId).subscribe({
        next: () => {
          this.subcategories = this.subcategories.filter(c => c.id !== subcategoryId);
          this.snackBar.open('SubCategory deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error loading SubCategory:', err);
        }
      });
    }
  }

}
