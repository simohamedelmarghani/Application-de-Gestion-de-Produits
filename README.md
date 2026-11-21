# Application de Gestion de Produits — Angular 19 & Spring Boot

Projet réalisé dans le cadre de l'activité pratique **Application de Gestion de Produits** avec Angular 19 (mode Standalone) et Spring Boot.

## Architecture du projet

```
.
├── backend/          # API REST Spring Boot (port 8083, base H2 en mémoire, CORS configuré)
└── frontend/         # Application Angular 19 Standalone (port 4200, Bootstrap 5 & Icons)
```

## Objectifs Pédagogiques Couverts

1. **Architecture Standalone** : Application initialisée sans `NgModule` via `bootstrapApplication(AppComponent, appConfig)` (`frontend/src/main.ts`, `frontend/src/app/app.config.ts`).
2. **Intégration UI** : Bootstrap 5 et Bootstrap Icons configurés dans `frontend/angular.json`.
3. **Routage & Navigation** : Routes définies dans `frontend/src/app/app.routes.ts` (`/home`, `/products`, `/new-product`, `/edit-product/:id`) avec `routerLink`, `routerLinkActive` et `<router-outlet>`.
4. **Syntaxe de Template v19+** : Utilisation des blocs `@if`, `@else if`, `@else`, `@for (...; track ...)` et `@empty` dans les templates.
5. **Service Angular** : `ProductService` (`frontend/src/app/services/product.service.ts`) injectable via `inject(HttpClient)`.
6. **Communication HTTP & RxJS** : Requêtes `GET`, `POST`, `PUT`, `PATCH`, `DELETE` retournant des `Observable` avec gestion d'erreurs `catchError`.
7. **Configuration CORS** : Autorisation explicite de l'origine `http://localhost:4200` vers `http://localhost:8083/api/**` via `CorsConfig.java` et `@CrossOrigin`.

## Démarrage

### 1. Backend Spring Boot (port 8083)

```bash
cd backend
mvn spring-boot:run
```

- API REST : `http://localhost:8083/api/products`
- Console H2 : `http://localhost:8083/h2-console` (JDBC URL : `jdbc:h2:mem:productsdb`)

### 2. Frontend Angular 19 (port 4200)

```bash
cd frontend
npm install
npm start
```

Ouvrez `http://localhost:4200` dans votre navigateur.
