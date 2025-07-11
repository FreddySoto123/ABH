const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
