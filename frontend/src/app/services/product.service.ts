import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8083/api/products';

  getAllProducts(keyword?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (keyword && keyword.trim().length > 0) {
      params = params.set('keyword', keyword.trim());
    }
    return this.http
      .get<Product[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  toggleSelected(id: number): Observable<Product> {
    return this.http
      .patch<Product>(`${this.apiUrl}/${id}/toggle-selected`, {})
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Une erreur inattendue est survenue.';
    if (error.status === 0) {
      message =
        'Impossible de joindre le backend Spring Boot sur http://localhost:8083. Vérifiez que le serveur est démarré et que CORS est configuré.';
    } else if (error.status === 404) {
      message = 'Produit introuvable.';
    } else if (error.error?.message) {
      message = error.error.message;
    }
    return throwError(() => new Error(message));
  }
}
