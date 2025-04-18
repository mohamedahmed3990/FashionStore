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

@Component({
  selector: 'app-colors',
  standalone: true, 
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class colorsComponent implements OnInit {
  colors: IColors[] = [];
  editingColorId: number | null = null; // Track the currently edited color ID
  originalColor: IColors | null = null;

  constructor(private colorService: ColorService,private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.colorService.getColors().subscribe({
      next: (data) => {
        this.colors = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  editColor(colorId: number, index: number): void {
    this.editingColorId = colorId;
    // Store a deep copy of the original color for cancel functionality
    this.originalColor = { ...this.colors[index] };
  }


  saveColor(colorId: number, index: number): void {
    const updatedColor = this.colors[index];
    // Basic validation
    if (!updatedColor.name || !updatedColor.hexa) {
      this.snackBar.open('Name and Hexa are required', 'Close', { duration: 3000 });
      return;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(updatedColor.hexa)) {
      this.snackBar.open('Hexa must be a valid hex color (e.g., #FF0000)', 'Close', { duration: 3000 });
      return;
    }

    const colorData = {
      colorName: updatedColor.name,
      colorHexa: updatedColor.hexa
    };

    this.colorService.updateColor(colorId, colorData).subscribe({
      next: () => {
        this.editingColorId = null;
        this.originalColor = null;
        this.snackBar.open('Color updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating color:', err);
        // Revert to original values on error
        this.colors[index] = { ...this.originalColor! };
        this.editingColorId = null;
        this.originalColor = null;
        this.snackBar.open('Failed to update color', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    if (this.editingColorId !== null && this.originalColor) {
      const index = this.colors.findIndex(c => c.id === this.editingColorId);
      if (index !== -1) {
        this.colors[index] = { ...this.originalColor };
      }
    }
    this.editingColorId = null;
    this.originalColor = null;
  }


  deleteColor(colorId: number): void {
    if (confirm('Are you sure you want to delete this color?')) {
      this.colorService.deleteColor(colorId).subscribe({
        next: () => {
          this.colors = this.colors.filter(c => c.id !== colorId);
          this.snackBar.open('Color deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error loading products:', err);
        }
      });
    }
  }

}
