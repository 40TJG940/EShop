# My Eshop App

Ce projet est une mini-boutique en ligne développée avec React, permettant de visualiser et filtrer des produits dans deux catégories : lunettes de soleil et t-shirts pour hommes.

## Fonctionnalités

- Page d'accueil avec présentation des catégories
- Navigation entre les pages avec React Router
- Affichage de produits par catégorie (lunettes de soleil, t-shirts hommes)
- Filtrage des produits par marque
- Tri des produits selon différents critères (prix, note, alphabétique)
- Interface responsive adaptée aux mobiles
- Gestion des erreurs en cas d'indisponibilité de l'API
- Visualisation détaillée des produits avec leurs caractéristiques

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Lancez l'application en mode développement avec `npm run dev`

## Structure du projet

```
my-eshop-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── Products.jsx
│   │   ├── Product.jsx
│   │   ├── Ratings.jsx
│   │   ├── BrandsAvailable.jsx
│   │   ├── OrderBy.jsx
│   ├── data/
│   │   ├── sunglasses.json
│   │   └── mens-shirts.json
│   ├── App.jsx
│   ├── App.css
│   ├── components.css
│   ├── HomePage.css
│   ├── main.jsx
│   └── index.css
```

## Technologies utilisées

- React (Hooks: useState, useEffect)
- React Router (Navigation entre les pages)
- CSS (Styles personnalisés)
- Vite (outil de build)

## API utilisée

L'application utilise l'API DummyJSON pour récupérer les données des produits :
- https://dummyjson.com/products/category/sunglasses
- https://dummyjson.com/products/category/mens-shirts

En cas d'indisponibilité de l'API, l'application utilise des données JSON locales comme solution de secours.

## Fonctionnalités avancées

- Navigation entre les pages avec React Router
- Page d'accueil avec mise en page attrayante
- Système de catégories avec navigation intuitive
- Interface utilisateur responsive et moderne

## Auteur

Ce projet a été développé dans le cadre d'un TP sur React.