# 🏡 Plateforme de Location de Maisons en Ligne

Bienvenue sur la plateforme de location de maisons en ligne, un projet permettant aux utilisateurs de publier et rechercher des maisons à louer, tout en offrant aux administrateurs un contrôle avancé sur la gestion des biens et des utilisateurs.

## 📸 Aperçu du Projet

![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/ced4484c968e362dc36631bdd7e9cfa4a13a1db9/Capture%20d'%C3%A9cran%202025-03-02%20122432.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122242.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122316.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122535.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122604.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122641.png)
![Aperçu de l'application](https://github.com/yassinekamouss/LocaMaison/blob/a4576a1ce88cb7d3736aa2f15fe445fcb3bce22f/Capture%20d'%C3%A9cran%202025-03-02%20122658.png)

## 🚀 Fonctionnalités Principales

### 👤 Utilisateurs
- Rechercher des maisons à louer.
- Publier leurs propres biens (avec images et détails).
- Communiquer avec les propriétaires via un système de messagerie interne.
- Sauvegarder des annonces favorites.
- Envoyer des demandes de contact à l'administration.

### 🔑 Administration
- Valider ou refuser la publication des maisons avant qu'elles apparaissent sur la plateforme.
- Gérer les utilisateurs (ajouter, modifier, supprimer).
- Gérer les biens immobiliers (approbation, suppression, mise à jour).
- Voir différentes statistiques sur l'activité de la plateforme.
- Générer des fichiers Excel, CSV et PDF des données (utilisateurs, annonces, statistiques).
- Répondre aux demandes envoyées par les utilisateurs via le formulaire de contact.

## ⚙️ Installation et Configuration

### 📌 Prérequis
- PHP 8.x
- MySQL / MariaDB
- Apache ou Nginx
- Composer (gestionnaire de dépendances PHP)
- Node.js et npm (pour les dépendances front-end)

### 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/yassinekamouss/LocaMaison.git
   cd LocaMaison
2. **Installer les dépendances Symfony (Back-end)**
   ```bash
   composer install
3. **Installer les dépendances React (Front-end)**
   ```bash
   npm install
4. **Configurer la base de données**
- Renommer .env.example en .env
- Modifier les valeurs pour correspondre à votre configuration MySQL
- Exécuter les migrations :
   ```bash
   php bin/console doctrine:migrations:migrate
5. **Démarrer le serveur Symfony**
   ```bash
   symfony server:start
