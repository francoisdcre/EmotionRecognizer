import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Déterminer le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir les fichiers statiques depuis le dossier "dist"
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy pour les API des IA (modifiez les URLs selon vos besoins)
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // Remplacez par l'URL de votre backend pour les IA
    changeOrigin: true,
  })
);

// Rediriger toutes les autres routes vers "index.html"
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
