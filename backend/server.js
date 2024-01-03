const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // deixe em branco se você não tiver uma senha
  database: 'react_dashboard',
});

app.post('/api/createCall', (req, res) => {
  const { name, description, status, date } = req.body;
  db.query(
    'INSERT INTO calls (name, description, status, date) VALUES (?, ?, ?, ?)',
    [name, description, status, date],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao criar chamado');
      } else {
        res.status(201).send('Chamado criado com sucesso');
      }
    }
  );
});

app.get('/api/getCalls', (req, res) => {
    db.query('SELECT * FROM calls', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao obter chamados');
      } else {
        res.status(200).json(result);
      }
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
