# Depont Samuel
---

# Docker Compose pour une application Ruby on Rails

Ce Docker Compose a été créé pour déployer l'application demarches simplifiées Ruby avec les dépendances nécessaires. Ci-dessous, je détaille chaque choix de configuration et comment lancer l'application.

## Choix de l'image parent Ruby officielle

```Dockerfile
FROM ruby:latest
```

Utilisation de l'image Ruby officielle comme base pour l'environnement de développement.

## Installation des dépendances système

```Dockerfile
# Install dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    postgresql-client \
    imagemagick \
    gsfonts \
    curl \
    tmux \
    && rm -rf /var/lib/apt/lists/*
```

Installation des dépendances système nécessaires à l'exécution de l'application, telles que PostgreSQL client, ImageMagick, etc.

## Installation de Bun

```Dockerfile
# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"
```

Installation de Bun, un gestionnaire de versions Ruby, pour simplifier la gestion des versions Ruby de l'application.

## Installation de Overmind

```Dockerfile
# Install overmind
RUN curl -L https://github.com/DarthSim/overmind/releases/download/v2.2.2/overmind-v2.2.2-linux-amd64.gz | gzip -d > /usr/local/bin/overmind && chmod +x /usr/local/bin/overmind
```

Installation de Overmind, un outil permettant de gérer plusieurs processus en développement, comme les serveurs web et les workers.

## Installation des gems Ruby

```Dockerfile
# Install gems
RUN gem install bundler:2.3.14
RUN bundle install
```
Installation des gems Ruby spécifiés dans le fichier Gemfile de l'application.

---

# Docker Compose pour une application Ruby on Rails

Ce Docker Compose a été créé pour déployer  l'application demarches simplifiées Ruby avec les dépendances nécessaires. Ci-dessous, je détaille chaque service et comment lancer l'application.

## Services

### Service "app"

Ce service est responsable de l'exécution de l'application Ruby.

- `build: .`: Construit l'image Docker en utilisant le Dockerfile situé dans le répertoire actuel (`.`).
- `command: ["bin/setup"]`: La commande à exécuter après le démarrage du conteneur, ici elle exécute le script `bin/setup` qui initialise l'application.
- `volumes: - ".:/app"`: Montage du répertoire de travail local dans le conteneur, permettant une synchronisation des fichiers entre l'hôte et le conteneur.
- `ports: - "3000:3000"`: Redirection du port 3000 du conteneur vers le port 3000 de l'hôte, permettant l'accès à l'application Rails depuis le navigateur.
- `ports: -"3036:3036"`: Redirection du port 3036 du conteneur vers le port 3036 de l'hôte, permettant l'accès à la pages vite pour le développement.
- `ports: -"3037:3037"`: Redirection du port 3037 du conteneur vers le port 3037 de l'hôte, permettant l'accès à la pages vite pour les tests.
- `depends_on: - "db" - "redis"`: Définit les dépendances du service, ici le service "app" dépend des services "db" et "redis".
- `environment`: Définition des variables d'environnement pour l'application, telles que les URL de la base de données et de Redis.

### Service "db"

Ce service utilise une image Docker PostgreSQL avec PostGIS pour la base de données.

- `image: postgis/postgis:14-3.3`: Utilisation de l'image Docker officielle de PostgreSQL avec PostGIS.
- `environment`: Configuration des variables d'environnement pour la base de données, notamment le nom d'utilisateur, le mot de passe et le nom de la base de données.
- `volumes: - "pgdata:/var/lib/postgresql/data"`: Persistance des données de la base de données en utilisant un volume Docker nommé "pgdata".

### Service "redis"

Ce service utilise une image Docker Redis.

- `image: redis:6.2`: Utilisation de l'image Docker officielle de Redis.

### Service "chrome"

Ce service utilise une image Docker Selenium pour exécuter des tests automatisés avec Chrome.

- `image: selenium/standalone-chrome:latest`: Utilisation de l'image Docker officielle de Selenium avec Chrome.
- `shm_size: '2gb'`: Configuration de la taille de la mémoire partagée pour le conteneur.
- `ports: - "4444:4444"`: Redirection du port 4444 du conteneur vers le port 4444 de l'hôte, permettant l'accès à Selenium WebDriver.

## Lancement de l'application

Pour lancer l'application, assurez-vous d'avoir Docker et Docker Compose installés, puis exécutez la commande suivante à la racine du projet :

```bash
docker-compose up --build
```

Cela construira les images Docker nécessaires et démarrera tous les services définis dans le fichier `docker-compose.yml`.

---
# IMPORTANT
IMPORTANT: Pour re up l'application, il faut d'abord supprrimer le fichier `tmp/pids/server.pid` et le fichier `overmind.sock` a la racine du projet. et ensuite lancer la commande `docker-compose up`