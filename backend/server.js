const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Инициализация сервера
const app = express();
const port = 3001;

// Включаем CORS
app.use(cors());

// Используем body-parser для обработки JSON
app.use(bodyParser.json());

// Подключение к базе данных SQLite
const db = new sqlite3.Database('database.db');

//-----  Авторизация: ----- 
const admin = {
  email: 'admin@example.com',
  password: 'admin123',  
};

// Маршрут для логина
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Проверка, правильный ли логин и пароль
  if (email === admin.email && password === admin.password) {
    res.status(200).json({ message: 'Авторизация успешна' });
  } else {
    res.status(401).json({ error: 'Неверный логин или пароль' });
  }
});

//----- Конфигурация залов: -----
// Создаем таблицу, если она еще не существует
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS AllHalls (id INTEGER PRIMARY KEY AUTOINCREMENT, hall TEXT NOT NULL)");
});

// Добавляем название зала
app.post('/api/add_hall', (req, res) => {
  const { name } = req.body; 
  const stmt = db.prepare("INSERT INTO AllHalls (hall) VALUES (?)");
  stmt.run(name, function () {
    res.status(201).json({ id: this.lastID, hall: name }); // Возвращаем успешный ответ
  });
  stmt.finalize();
});

// Получаем все залы
app.get('/api/halls', (req, res) => {
  db.all("SELECT * FROM AllHalls", (err, rows) => {
    res.json(rows); // Отправляем все залы в ответе
  });
});

// Удаляем зал по id
app.delete('/api/delete_hall/:id', (req, res) => {
  const hallId = Number(req.params.id);

  const stmt = db.prepare("DELETE FROM AllHalls WHERE id = ?");
  stmt.run(hallId, function () {
    if (this.changes === 0) {
      return res.status(404).send({ error: 'Hall not found' });
    }

    res.status(204).end();
  });

  stmt.finalize();
});

//----- Управление залами: -----
// Создаем таблицу HallsControl, если она еще не существует
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS HallsControl (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hall_id INTEGER NOT NULL,
      rows INTEGER NOT NULL,
      seats INTEGER NOT NULL,
      FOREIGN KEY(hall_id) REFERENCES AllHalls(id)
    )
  `)
});

// Добавляем места
app.post('/api/add_seats', (req, res) => {
  const { hall_id, rows, seats } = req.body;

  db.get('SELECT id FROM HallsControl WHERE hall_id = ?', [hall_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при проверке данных' });
    }

    if (row) {
      // Если запись существует, выполняем UPDATE
      const stmt = db.prepare(`
        UPDATE HallsControl
        SET rows = ?, seats = ?
        WHERE hall_id = ?
      `);

      stmt.run(rows, seats, hall_id, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при обновлении мест' });
        }
        res.status(200).json({ message: 'Цены обновлены', hall_id, rows, seats });
      });
      stmt.finalize();
    } else {
      // Если записи нет, выполняем INSERT
      const stmt = db.prepare(`
        INSERT INTO HallsControl (hall_id, rows, seats)
        VALUES (?, ?, ?)
      `);

      stmt.run(hall_id, rows, seats, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при добавлении мест' });
        }
        res.status(201).json({ id: this.lastID, hall_id, rows, seats });
      });
      stmt.finalize();
    }
  });
});

// Получаем все места с рядами
app.get('/api/seats', (req, res) => {
  db.all("SELECT * FROM HallsControl", (err, rows) => {
    res.json(rows); // Отправляем все места в ответе
  });
});

// ----- Конфигурация цен: -----
// Создаем таблицу Prices, если она еще не существует
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hall_id INTEGER NOT NULL,
      usual_armchair INTEGER NOT NULL,
      vip_armchair INTEGER NOT NULL,
      FOREIGN KEY(hall_id) REFERENCES AllHalls(id)
    )
  `)
});

// Добавляем цены
app.post('/api/add_price', (req, res) => {
  const { hall_id, usual_armchair, vip_armchair } = req.body;

  db.get('SELECT id FROM Prices WHERE hall_id = ?', [hall_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при проверке данных' });
    }

    if (row) {
      // Если запись существует, выполняем UPDATE
      const stmt = db.prepare(`
        UPDATE Prices
        SET usual_armchair = ?, vip_armchair = ?
        WHERE hall_id = ?
      `);

      stmt.run(usual_armchair, vip_armchair, hall_id, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при обновлении цены' });
        }
        res.status(200).json({ message: 'Цены обновлены', hall_id, usual_armchair, vip_armchair });
      });
      stmt.finalize();
    } else {
      // Если записи нет, выполняем INSERT
      const stmt = db.prepare(`
        INSERT INTO Prices (hall_id, usual_armchair, vip_armchair)
        VALUES (?, ?, ?)
      `);

      stmt.run(hall_id, usual_armchair, vip_armchair, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при добавлении цены' });
        }
        res.status(201).json({ id: this.lastID, hall_id, usual_armchair, vip_armchair });
      });
      stmt.finalize();
    }
  });
});

//----- Добавить фильм: -----
// Создаем таблицу, если она еще не существует
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS AllFilms (id INTEGER PRIMARY KEY AUTOINCREMENT, film TEXT NOT NULL, duration INTEGER, description TEXT, country TEXT)");
});

// Добавляем название фильма
app.post('/api/add_movie', (req, res) => {
  const {  name: film, duration, description, country } = req.body; // Распаковываем данные
  const stmt = db.prepare("INSERT INTO AllFilms (film, duration, description, country) VALUES (?, ?, ?, ?)");
  stmt.run(film, duration, description, country, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении фильма' });
    }
    res.status(201).json({ id: this.lastID, film, duration, description, country });
  });
  stmt.finalize();
});

// Получаем все фильмы
app.get('/api/films', (req, res) => {
  db.all("SELECT * FROM AllFilms", (err, rows) => {
    res.json(rows); // Отправляем все залы в ответе
  });
});

// Удаляем фильм по id
app.delete('/api/delete_film/:id', (req, res) => {
  const filmId = Number(req.params.id);

  const stmt = db.prepare("DELETE FROM AllFilms WHERE id = ?");
  stmt.run(filmId, function () {
    if (this.changes === 0) {
      return res.status(404).send({ error: 'Film not found' });
    }

    res.status(204).end();
  });

  stmt.finalize();
});

//----- Добавить сеанс: -----
// Создаем таблицу Sessions, если она еще не существует
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hall_id INTEGER NOT NULL,
      film_id INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      FOREIGN KEY(hall_id) REFERENCES AllHalls(id),
      FOREIGN KEY(film_id) REFERENCES AllFilms(id)
    )
  `);
});

// Добавляем сеанс
app.post('/api/add_seance', (req, res) => {
  const { hall_id, film_id, start_time } = req.body;

  const stmt = db.prepare("INSERT INTO Sessions (hall_id, film_id, start_time) VALUES (?, ?, ?)");
  stmt.run(hall_id, film_id, start_time, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при добавлении сеанса' });
    }
    res.status(201).json({ id: this.lastID, hall_id, film_id, start_time });
  });
  stmt.finalize();
});

// Получаем все сеансы с данными о фильмах и залах
app.get('/api/seances', (req, res) => {
  db.all(`
    SELECT Sessions.id, AllHalls.hall, AllFilms.film, Sessions.start_time
    FROM Sessions
    JOIN AllHalls ON Sessions.hall_id = AllHalls.id
    JOIN AllFilms ON Sessions.film_id = AllFilms.id
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Film not seans'});
    }
    res.json(rows); // Отправляем все сеансы в ответе
  });
});

// Удаляем фильм по id из сеанса
app.delete('/api/delete_seance/:id', (req, res) => {
  const seanceId = Number(req.params.id);

  const stmt = db.prepare("DELETE FROM Sessions WHERE id = ?");
  stmt.run(seanceId, function () {
    if (this.changes === 0) {
      return res.status(404).send({ error: 'Seance not found' });
    }

    res.status(204).end();
  });

  stmt.finalize();
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
