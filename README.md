























# Backend Danow-Shop (Node.js + Express + MySQL + Nodemailer)

Ce serveur API gère les produits, commandes et envoie des emails de notification.

## Installation

1. **Installer les dépendances** :
```bash
cd server
npm install
```

2. **Configurer l'environnement** :
   - Copiez `.env.example` en `.env`
   - Remplissez vos vraies valeurs (mot de passe MySQL, email, clés MonCash secrètes)

3. **Importer la base de données** :
   - Ouvrez phpMyAdmin dans Laragon
   - Importez `../database/ady_zone_haiti.sql`

4. **Démarrer le serveur** :
```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`.

## Configuration Email (Nodemailer)

Pour Gmail :
1. Activez l'authentification à 2 facteurs sur votre compte Google
2. Générez un "Mot de passe d'application" : https://myaccount.google.com/apppasswords
3. Utilisez ce mot de passe dans `EMAIL_PASSWORD` (pas votre mot de passe Gmail normal)

## Endpoints API

### Produits
- `GET /api/products` - Liste tous les produits actifs
- `POST /api/products` - Ajouter un produit (body: name, price, category, description, image, gender)
- `DELETE /api/products/:id` - Supprimer (désactiver) un produit

### Commandes
- `POST /api/orders` - Créer une commande + envoyer email (body: customer, items, total, paymentMethod)
- `GET /api/orders` - Liste des 50 dernières commandes (pour le dashboard admin)

## Connecter le front-end

Dans le fichier `.env` du front (React), mettez :
```
VITE_API_URL=http://localhost:3001
```

Le front appellera automatiquement l'API pour charger/ajouter/supprimer des produits et créer des commandes.

## Sécurité

⚠️ **NE JAMAIS** committer le fichier `.env` avec vos vraies clés secrètes.
⚠️ Les clés MonCash `SECRET_KEY` et `WEBHOOK_SECRET` doivent rester **uniquement** sur le serveur.























