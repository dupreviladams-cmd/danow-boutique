
# Base de données — Ady Zone Haiti (Laragon / MySQL)

Ce dossier contient le schéma SQL qui correspond au site (produits, clients,
commandes, articles, paiements MonCash).

> ⚠️ **Important** : ce projet React est **uniquement le front-end**. Il ne peut
> pas se connecter directement à MySQL. La connexion à la base passe **toujours**
> par une petite **API** (PHP ou Node) que vous faites tourner dans Laragon.
> Le navigateur n'a jamais accès à MySQL directement (sécurité).

---

## 1. Importer la base dans Laragon

1. Démarrez Laragon → bouton **Start All** (Apache/Nginx + MySQL).
2. Ouvrez **phpMyAdmin** (menu Laragon → *Database* → *phpMyAdmin*),
   ou allez sur `http://localhost/phpmyadmin`.
3. Onglet **Importer** → choisissez le fichier `ady_zone_haiti.sql` → **Exécuter**.
4. La base `ady_zone_haiti` apparaît avec les tables et quelques données d'exemple.

---

## 2. Architecture de connexion

```
[ React (Magic Patterns) ]  --HTTP-->  [ API PHP/Node sur Laragon ]  --SQL-->  [ MySQL ]
       Front-end                          (clé secrète ici)                  ady_zone_haiti
```

- Le **front** appelle l'API via `fetch` (ex. `http://localhost/ady-api/products.php`).
- L'**API** lit/écrit dans MySQL et renvoie du **JSON**.
- La **clé secrète MonCash** (`sk_proj_…`) et le **webhook** (`whsec_…`)
  vivent **uniquement** côté serveur (API), **jamais** dans le front.

---

## 3. Tables

| Table         | Rôle                                                        |
|---------------|-------------------------------------------------------------|
| `categories`  | electronics / medical / tennis                              |
| `products`    | catalogue (nom, prix HTG, image, rating, gender…)           |
| `customers`   | infos client (nom, adresse, téléphone, email)               |
| `orders`      | commandes (total, statut, méthode de paiement)              |
| `order_items` | lignes de commande (snapshot nom + prix + quantité)         |
| `payments`    | suivi des paiements MonCash (transaction_id, statut…)       |

Deux vues prêtes pour l'admin : `v_stats_categories`, `v_orders_summary`.

---

## 4. Brancher le front à votre API

Le front est déjà prêt à utiliser une URL d'API configurable via `.env` :

```
VITE_API_URL=http://localhost/ady-api
```

Quand votre API est prête, dites-le moi : j'adapterai le front pour qu'il
charge les produits et envoie les commandes vers votre base Laragon, à la place
des données générées localement.
```
