import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navItems = [
    { label: 'Accueil', path: '/home', icon: 'bi-house-door' },
    { label: 'Produits', path: '/products', icon: 'bi-box-seam' },
    { label: 'Nouveau Produit', path: '/new-product', icon: 'bi-plus-circle' }
  ];
}
