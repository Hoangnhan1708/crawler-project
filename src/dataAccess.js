const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Thêm dòng này
const app = express();
app.use(cors());


const connection = mysql.createConnection({
  host: '192.168.0.190', //Here
  user: 'root',
  password: '862202', // Thay đổi với mật khẩu của MySQL của bạn
  database: 'IT_CONFERENCES', // Thay đổi với tên cơ sở dữ liệu của bạn
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM CONFERENCES', (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

app.get('/search', (req, res) => {
  const { category, term } = req.query;

  // Sử dụng thích hợp tên cột dựa vào loại category và term để tìm kiếm
  const query = `SELECT * FROM CONFERENCES WHERE ${category} LIKE '%${term}%'`;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});