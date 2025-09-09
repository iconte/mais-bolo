const express = require('express');
const path = require('path');
const app = express();

const distPath = path.join(__dirname, 'mais-bolo/browser');

// Servir arquivos estáticos da pasta dist
app.use(express.static(distPath));

// Redirecionar todas as rotas para index.html (SPA)
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
