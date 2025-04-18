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

@Component({
  selector: 'app-sizes',
  standalone: true, 
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {
  sizes: ISizes[] = [];
  editingSizeId: number | null = null; // Track the currently edited color ID
  originalSize: ISizes | null = null;

  constructor(private sizeService: SizeService,private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadSizes();
  }

  loadSizes(): void {
    this.sizeService.getSizes().subscribe({
      next: (data) => {
        this.sizes = data;
      },
      error: (err) => {
        console.error('Error loading Sizes:', err);
      }
    });
  }

  editSize(sizeId: number, index: number): void {
    this.editingSizeId = sizeId;
    // Store a deep copy of the original color for cancel functionality
    this.originalSize = { ...this.sizes[index] };
  }


  saveSize(colorId: number, index: number): void {
    const updatedSize = this.sizes[index];
    // Basic validation
    if (!updatedSize.name) {
      this.snackBar.open('Name is required', 'Close', { duration: 3000 });
      return;
    }
    // if (!/^#[0-9A-Fa-f]{6}$/.test(updatedColor.name)) {
    //   this.snackBar.open('Hexa must be a valid hex color (e.g., #FF0000)', 'Close', { duration: 3000 });
    //   return;
    // }

    const sizeData = {
      name: updatedSize.name
    };

    this.sizeService.updateSize(colorId, sizeData).subscribe({
      next: () => {
        this.editingSizeId = null;
        this.originalSize = null;
        this.snackBar.open('Size updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating size:', err);
        // Revert to original values on error
        this.sizes[index] = { ...this.originalSize! };
        this.editingSizeId = null;
        this.originalSize = null;
        this.snackBar.open('Failed to update size', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    if (this.editingSizeId !== null && this.originalSize) {
      const index = this.sizes.findIndex(c => c.id === this.editingSizeId);
      if (index !== -1) {
        this.sizes[index] = { ...this.originalSize };
      }
    }
    this.editingSizeId = null;
    this.originalSize = null;
  }


  deleteSize(colorId: number): void {
    if (confirm('Are you sure you want to delete this size?')) {
      this.sizeService.deleteSize(colorId).subscribe({
        next: () => {
          this.sizes = this.sizes.filter(c => c.id !== colorId);
          this.snackBar.open('Size deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error loading sizes:', err);
        }
      });
    }
  }

}
