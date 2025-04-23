# My Eshop App

Ce projet est une mini-boutique en ligne développée avec React, permettant de visualiser et filtrer des produits dans deux catégories : lunettes de soleil et t-shirts pour hommes.

## Fonctionnalités

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
│   │   ├── Products.jsx
│   │   ├── Product.jsx
│   │   ├── Ratings.jsx
│   │   ├── BrandsAvailable.jsx
│   │   ├── OrderBy.jsx
│   │   ├── Footer.jsx
│   │   └── components.css
│   ├── data/
│   │   ├── sunglasses.json
│   │   └── mens-shirts.json
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
```

## Technologies utilisées

- React (Hooks: useState, useEffect)
- CSS (Pico CSS pour les styles de base)
- Vite (outil de build)

## API utilisée

L'application utilise l'API DummyJSON pour récupérer les données des produits :
- https://dummyjson.com/products/category/sunglasses
- https://dummyjson.com/products/category/mens-shirts

En cas d'indisponibilité de l'API, l'application utilise des données JSON locales comme solution de secours.

## Auteur

Ce projet a été développé dans le cadre d'un TP sur React.