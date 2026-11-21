import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Accueil - Gestion Produits' },
  { path: 'products', component: ProductsComponent, title: 'Catalogue - Gestion Produits' },
  { path: 'new-product', component: ProductFormComponent, title: 'Nouveau Produit' },
  { path: 'edit-product/:id', component: ProductFormComponent, title: 'Modifier Produit' },
  { path: '**', redirectTo: 'home' }
];
