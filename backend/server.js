const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

// Пример маршрута
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
