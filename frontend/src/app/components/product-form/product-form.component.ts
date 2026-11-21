import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  productId: number | null = null;
  isEditMode = false;
  isSubmitting = false;
  errorMessage: string | null = null;

  categories = ['Informatique', 'Accessoires', 'Écrans', 'Audio', 'Réseau', 'Autre'];

  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['Informatique', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    selected: [false]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = Number(idParam);
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          category: product.category || 'Informatique',
          price: product.price,
          quantity: product.quantity,
          selected: product.selected
        });
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    const payload: Product = this.productForm.getRawValue();

    const request$ =
      this.isEditMode && this.productId !== null
        ? this.productService.updateProduct(this.productId, payload)
        : this.productService.saveProduct(payload);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: (err: Error) => {
        this.isSubmitting = false;
        this.errorMessage = err.message;
      }
    });
  }
}
