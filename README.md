# Application de Gestion de Budget

Bienvenue dans l'application de gestion de budget, une solution mobile développée avec React Native et Expo, conçue pour vous aider à gérer vos finances personnelles efficacement lors de vos voyages.

## Fonctionnalités principales

- **Suivi des dépenses et des revenus** : Enregistrez vos transactions pour une meilleure visibilité sur vos finances.
- **Catégorisation des transactions** : Classez vos revenus et dépenses par catégories.
- **Visualisation des données** : Graphiques et tableaux pour analyser vos habitudes financières.
- **Sauvegarde et synchronisation** : Stockez vos données de manière sécurisée grâce à Supabase et PostgreSQL.

## Technologies utilisées

- **React Native** : Framework pour le développement mobile multi-plateformes.
- **Expo** : Outils et services pour simplifier le développement avec React Native.
- **TypeScript** : Pour un code robuste et typé.
- **Supabase** : Base de données et authentification basées sur PostgreSQL.

## Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (v16 ou supérieur)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Un éditeur de code (par exemple, [Visual Studio Code](https://code.visualstudio.com/))

## Installation

1. Clonez le dépôt du projet :

   ```bash
   git clone https://github.com/votre-utilisateur/budget-app.git
   cd budget-app
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :

   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les informations de connexion à votre instance Supabase :

     ```env
     SUPABASE_URL=https://votre-instance.supabase.co
     SUPABASE_KEY=votre-cle-supabase
     ```

4. Lancez l'application :

   ```bash
   expo start
   ```

5. Scannez le QR code affiché pour tester l'application sur votre appareil mobile avec l'application Expo Go ou exécutez-la sur un émulateur.

## Contribution

Les contributions sont les bienvenues ! Pour proposer une amélioration ou signaler un problème :

1. Forkez ce dépôt.
2. Créez une branche pour vos modifications :

   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```

3. Faites vos changements et committez-les :

   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```

4. Poussez vos modifications :

   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```

5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

### Auteur

Application développée par [(https://github.com/MarvinDlls)].
