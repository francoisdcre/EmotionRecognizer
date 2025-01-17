[![Deploy to Render](https://github.com/francoisdcre/EmotionRecognizer/actions/workflows/deploy.yml/badge.svg)](https://github.com/francoisdcre/EmotionRecognizer/actions/workflows/deploy.yml)

<h1 align="center">Projet "EmotionRecognizer"</h1>

<a href="https://emotionrecognizer.onrender.com/" target="_blank"> Visiter le site </a>
<br>

<h2>Description</h2>
<p>Le projet <stong>EmotionRecognizer</stong> Est un projet visé pour apprendre l'utilisation de l'intelligence artificielle. Le projet permet de reconnaitre les émotions dans un texte ou dans un image.</p>

<h2>Fonctionnalites</h2>
<ul>
  <li><strong>Reconnaissance d'émotions dans un texte</strong></li>
  <li><strong>Reconnaissance d'émotions dans une image</strong></li>
  <li><strong>Reconnaissance d'émotion en temps réel</strong></li>
</ul>

<h2>Structure des fichiers</h2>
<p>Voici la structure du projet :</p>
<pre>
|-- public/
|   |-- models/
|       |-- face-live.jpg
|       |-- face.jpg
|       |-- image-test.jpg
|       |-- logo.png
|       |-- text.jpg
|       |-- vite.svg
|-- src/
|   |-- components/
|       |-- Button.jsx
|       |-- DnD.jsx
|       |-- Title.jsx
|   |-- pages/
|       |-- Home.jsx
|       |-- ImageEmotion.jsx
|       |-- LiveEmotion.jsx
|       |-- NotFound.jsx
|       |-- TextEmotion.jsx
|   |-- styles/
|   |-- API.js
|   |-- App.jsx
|   |-- main.jsx
|-- .env
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- serve.json
|-- vite.config.js

</pre>

<h2>Competences acquises</h2>
<ul>
  <li>Utilisation de React.js</li>
  <li>Utilisation de NODEJS</li>
  <li>Optimisation des performances d’une application en temps réel.</li>
  <li>Mise en place d'un CI/CD</li>
</ul>

<h2>Installation</h2>

<p>Prérequis :</p>
<ul>
  <li>Git</li>
  <li>Node.JS</li>
  <li>IDE</li>
</ul>

<p>1. Cloner le proet depuis le dépots Git :</p>
<p>git clone https://github.com/francoisdcre/EmotionRecognizer.git</p>

<p>2. Installer les dépendances du projet :</p>
<p>npm install</p>

<p>3. Créer un fichier ".env" à la racine du projet</p>
<p>Mettez cette variable à l'interieur : VITE_HUGGINGFACE_API_KEY=Votre_Clé_API_Ici</p>

<p>4. Build le projet :</p>
<p>Exécutez la commande suivante : npm run build</p>

<p>5. Lancer le projet</p>
<p>Exécutez la commande suivante : npm run start</p>

<h2>Preview</h2>
![image](https://github.com/user-attachments/assets/6f34a4dc-f5cf-42a4-bb4b-21b63f9d02c9)
![image](https://github.com/user-attachments/assets/2b1d8d7a-d099-4631-8ca2-0f17432b36fb)
![image](https://github.com/user-attachments/assets/441eae99-3963-4bd1-961b-11e76702782a)
