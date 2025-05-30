# 404notFound

# 🛒 Plate-forme de commerce électronique SaaS

Une plateforme de commerce électronique entièrement fonctionnelle, sécurisée et évolutive construite avec une pile web moderne. Elle prend en charge l'authentification des utilisateurs, la gestion du catalogue de produits, le panier d'achat, l'intégration des paiements et un back-office d'administration complet.


## 🚀 Démarrage

### Prérequis
- Node.js ≥ 18.x
- Instance PostgreSQL ou MongoDB
- Clés API Stripe

### Installation

```bash
https://github.com/Oc3an-Spag3tti/404notFound.git
cd 404notFound
```

### Lancer le frontend

```bash
cd cyna-web-front
npm install       # À exécuter une seule fois
npm run dev
```

### lancer le backend

```bash
cd backend
npm install       # À exécuter une seule fois
npm start
```


## ```.env``` à rajouter dans Backend
```
PORT=3001
MONGO_URL="Your Mongo database URL"
STRIPE_SECRET_KEY="Your Stripe Secret Key"
JWT_SECRET="Your JSON Web Token Secret"
```
