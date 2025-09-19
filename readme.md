Dino Park

Description
Dino Park est une application web de réservation de billets pour un parc à thème.
Elle permet aux utilisateurs de :

consulter les dinosaures du parc via des cartes interactives,

réserver des billets en ligne selon différents types (adulte, enfant, etc.),

effectuer un paiement simulé avec validation (par exemple l’algorithme de Luhn pour les cartes),

pour les administrateurs : accéder à un tableau de bord affichant les statistiques de ventes et la capacité d’accueil restante.

Installation

Cloner le projet
git clone git@github.com:azriel750/Dino-Park.git

cd dino-park

Installer les dépendances
npm install

Configurer la base de données

Créer une base PostgreSQL :
CREATE DATABASE dinopark;
Clique droit sur la base dinopark → Restore…


Configurer les variables d’environnement
Créer un fichier .env à la racine avec :
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=tonmotdepasse
DB_NAME=dinopark
PORT=3000

Lancer le serveur
npm run dev
Puis ouvrir http://localhost:3000

Compte admin

URL :   http://localhost:3000/login

Voila Normalement vous pourrez profitez pleinement de DinoPark alors n'hésitez pas a en profitez !