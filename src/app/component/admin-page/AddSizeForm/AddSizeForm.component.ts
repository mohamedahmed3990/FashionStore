import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizeService } from '../../../shared/service/size.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AddSizeForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './AddSizeForm.component.html',
  styleUrl: './AddSizeForm.component.css'
})

export class AddSizeFormComponent implements OnInit {
  AddSizeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sizeService: SizeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.AddSizeForm = this.fb.group({
      Name: ['', Validators.required],  // Match backend DTO property name
    });
  }


  onSubmit(): void {
    if (this.AddSizeForm.valid) {
      console.log("valid");
      const sizeData = this.AddSizeForm.value;
      console.log(sizeData);
      this.sizeService.createSize(sizeData).subscribe({
        next: (response) => {
          console.log('Size added successfully!', response);
          this.router.navigate(['/admin-page/sizes']);
        },
        error: (err) => {
          console.error('Error adding color:', err);
        }
      });
    }
  }
}
