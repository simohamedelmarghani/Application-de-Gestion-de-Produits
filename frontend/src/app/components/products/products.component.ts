import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  keyword = '';
  filterMode: 'all' | 'selected' | 'outOfStock' = 'all';
  isLoading = false;
  errorMessage: string | null = null;
  actionMessage: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.productService.getAllProducts(this.keyword).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    if (this.filterMode === 'selected') {
      return this.products.filter((p) => p.selected);
    }
    if (this.filterMode === 'outOfStock') {
      return this.products.filter((p) => p.quantity === 0);
    }
    return this.products;
  }

  get selectedCount(): number {
    return this.products.filter((p) => p.selected).length;
  }

  get totalStockValue(): number {
    return this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  onSearch(): void {
    this.loadProducts();
  }

  resetSearch(): void {
    this.keyword = '';
    this.filterMode = 'all';
    this.loadProducts();
  }

  onToggleSelected(product: Product): void {
    if (product.id === undefined) return;
    this.productService.toggleSelected(product.id).subscribe({
      next: (updated) => {
        product.selected = updated.selected;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      }
    });
  }

  onDeleteProduct(product: Product): void {
    if (product.id === undefined) return;
    const confirmed = confirm(`Voulez-vous vraiment supprimer "${product.name}" ?`);
    if (!confirmed) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.actionMessage = `Le produit "${product.name}" a été supprimé.`;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      }
    });
  }
}
