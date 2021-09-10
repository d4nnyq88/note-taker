const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static middleware for serving assets in the public folder
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
