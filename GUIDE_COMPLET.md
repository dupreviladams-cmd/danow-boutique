

























# 🎉 Guide Complet — Danow-Shop

Votre boutique en ligne complète avec admin, paiement MonCash et emails automatiques.

---

## 📦 Ce qui a été fait

### ✅ Frontend (React)
1. **Rebrand complet** : "Ady Zone Haiti" → **"Danow-Shop"**
2. **Catégorie Parfums** : Tennis remplacé par Parfums avec animations
3. **Site vide au départ** : Aucun produit généré, vous ajoutez tout via l'admin
4. **Admin protégé par mot de passe** : `/admin/login` (mot de passe par défaut : `danow2024`)
5. **Gestion des produits** : Ajout/suppression dans `/admin/products`
6. **Dashboard admin** : Statistiques + graphiques (Recharts)
7. **Responsive** : Menu hamburger sur mobile, fonctionne sur tous appareils
8. **Paiement MonCash** : Page de paiement connectée au panier

### ✅ Backend (Node.js)
1. **Serveur Express** dans le dossier `server/`
2. **API complète** : Produits (GET/POST/DELETE), Commandes (POST/GET)
3. **MySQL** : Connexion à la base `ady_zone_haiti` (Laragon)
4. **Nodemailer** : Envoi d'email à chaque commande reçue
5. **Sécurité** : Clés secrètes MonCash côté serveur uniquement

---

## 🚀 Démarrage rapide

### 1. Importer la base de données
1. Démarrez Laragon → **Start All**
2. Ouvrez phpMyAdmin → **Importer** → `database/ady_zone_haiti.sql`

### 2. Configurer le backend
```bash
cd server
npm install
cp .env.example .env
# Éditez .env avec vos vraies valeurs (email, mot de passe MySQL, etc.)
npm start
```

Le serveur démarre sur `http://localhost:3001`.

### 3. Lancer le frontend
Le front React est déjà configuré pour appeler `http://localhost:3001`.
Cliquez sur **Preview** dans Magic Patterns.

---

## 🔐 Connexion Admin

1. Allez sur `/admin` ou cliquez sur **Admin** dans le menu
2. Entrez le mot de passe : `danow2024`
3. Vous accédez au dashboard et à la gestion des produits

**Pour changer le mot de passe** : éditez `pages/admin/LoginPage.tsx` ligne 15.

---

## 📧 Configuration Email (Nodemailer)

### Pour Gmail :
1. Activez l'authentification à 2 facteurs sur votre compte Google
2. Générez un **Mot de passe d'application** : https://myaccount.google.com/apppasswords
3. Dans `server/.env`, mettez :
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app-16-caracteres
EMAIL_FROM=Danow-Shop <noreply@danow-shop.com>
ADMIN_EMAIL=duprevilyvano18@gmail.com
```

À chaque commande, vous recevrez un email avec :
- Nom du client, adresse, téléphone
- Liste des produits commandés
- Total en HTG

---

## 💳 Paiement MonCash

### Configuration
Dans `server/.env`, ajoutez vos **vraies** clés MonCash :
```
MONCASH_PUBLIC_KEY=pk_proj_395490ad4259854b7d31364120cb1191
MONCASH_SECRET_KEY=sk_proj_VOTRE_VRAIE_CLE_SECRETE
MONCASH_WEBHOOK_SECRET=whsec_VOTRE_VRAI_WEBHOOK_SECRET
```

⚠️ **Régénérez vos clés secrète et webhook** car elles ont été exposées dans le chat.

### Flux de paiement
1. Client ajoute des produits au panier
2. Page Checkout : infos client (nom, adresse, téléphone)
3. Page Payment : choix MonCash ou WhatsApp
4. Si MonCash : le backend crée la transaction et envoie l'email
5. Le dashboard admin affiche la commande

---

## 📱 Responsive & Menu Hamburger

Le site est **100% responsive** :
- Desktop : menu horizontal
- Mobile/Tablette : menu hamburger (☰) en haut à droite
- Toutes les pages s'adaptent automatiquement

---

## 🛠️ Structure des fichiers

```
danow-shop/
├── pages/
│   ├── HomePage.tsx              # Page d'accueil
│   ├── ElectronicsPage.tsx       # Catégorie Électronique
│   ├── MedicalPage.tsx           # Catégorie Médical
│   ├── PerfumePage.tsx           # Catégorie Parfums (nouveau)
│   ├── CartPage.tsx              # Panier
│   ├── CheckoutPage.tsx          # Validation commande
│   ├── PaymentPage.tsx           # Paiement MonCash
│   ├── LocationPage.tsx          # Carte + localisation
│   └── admin/
│       ├── LoginPage.tsx         # Connexion admin
│       ├── DashboardPage.tsx     # Tableau de bord
│       └── ProductsPage.tsx      # Gestion produits
├── components/
│   ├── Navbar.tsx                # Menu (avec hamburger)
│   ├── Footer.tsx                # Pied de page
│   ├── ProductCard.tsx           # Carte produit
│   └── AdminLayout.tsx           # Layout admin
├── context/
│   ├── CartContext.tsx           # Gestion panier
│   └── ProductContext.tsx        # Gestion produits
├── server/                       # Backend Node.js
│   ├── server.js                 # Serveur Express
│   ├── package.json              # Dépendances
│   ├── .env.example              # Config à copier
│   └── README.md                 # Doc backend
├── database/
│   ├── ady_zone_haiti.sql        # Schéma MySQL
│   └── README.md                 # Doc base de données
└── .env                          # Config frontend
```

---

## 🎨 Personnalisation

### Changer les couleurs
Éditez `tailwind.config.js` ou cherchez dans le code :
- Navy : `#0A1628`
- Gold : `#F59E0B`
- Orange : `#FF6B35`
- Teal : `#0D9488`

### Ajouter une catégorie
1. Ajoutez-la dans `types/index.ts` (ligne 5)
2. Créez une nouvelle page (ex: `pages/VetementsPage.tsx`)
3. Ajoutez la route dans `App.tsx`
4. Ajoutez le lien dans `Navbar.tsx` et `Footer.tsx`
5. Mettez à jour `context/ProductContext.tsx`

---

## ❓ FAQ

**Q : Le site ne charge pas les produits ?**
R : Vérifiez que le serveur Node.js tourne (`npm start` dans `server/`) et que `.env` contient `VITE_API_URL=http://localhost:3001`.

**Q : Les emails ne partent pas ?**
R : Vérifiez votre config Nodemailer dans `server/.env`. Pour Gmail, utilisez un mot de passe d'application.

**Q : Comment changer le mot de passe admin ?**
R : Éditez `pages/admin/LoginPage.tsx` ligne 15 : `const ADMIN_PASSWORD = 'votre-nouveau-mdp';`

**Q : Les produits ajoutés disparaissent au refresh ?**
R : Normal si le backend n'est pas démarré. Les produits sont en `localStorage` tant que le backend n'est pas connecté. Une fois le backend actif, ils iront en base MySQL.

---

## 🎯 Prochaines étapes

1. ✅ Démarrez le backend (`npm start` dans `server/`)
2. ✅ Configurez vos emails dans `server/.env`
3. ✅ Régénérez vos clés MonCash secrètes
4. ✅ Ajoutez vos premiers produits via `/admin/products`
5. ✅ Testez une commande complète (panier → checkout → paiement)
6. ✅ Vérifiez que vous recevez l'email de notification

---

**Félicitations ! Votre boutique Danow-Shop est prête. 🎉**

























