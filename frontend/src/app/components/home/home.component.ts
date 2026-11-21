import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  objectives = [
    {
      title: 'Architecture Standalone',
      description: 'Application initialisée sans NgModule avec bootstrapApplication et composants autonomes.',
      icon: 'bi-diagram-3',
      color: 'text-primary'
    },
    {
      title: 'Bootstrap 5 & Icons',
      description: 'Interface responsive utilisant les grilles, cartes, tableaux et icônes Bootstrap.',
      icon: 'bi-bootstrap',
      color: 'text-purple'
    },
    {
      title: 'Routage Moderne',
      description: 'Navigation fluide avec routerLink, routerLinkActive et <router-outlet>.',
      icon: 'bi-signpost-split',
      color: 'text-success'
    },
    {
      title: 'Flux de Contrôle v19+',
      description: 'Templates déclaratifs utilisant @if, @else, @for et @empty.',
      icon: 'bi-code-slash',
      color: 'text-info'
    },
    {
      title: 'Services & DI',
      description: 'Logique métier centralisée dans ProductService avec inject(HttpClient).',
      icon: 'bi-gear',
      color: 'text-warning'
    },
    {
      title: 'HTTP & RxJS + CORS',
      description: 'Communication asynchrone entre Angular (port 4200) et Spring Boot (port 8083).',
      icon: 'bi-arrow-left-right',
      color: 'text-danger'
    }
  ];
}
