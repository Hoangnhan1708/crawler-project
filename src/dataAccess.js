const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Middleware
const app = express(); //Nodejs express app
app.use(cors());

// Cài đặt kết nối với mysql
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '862202', 
  database: 'IT_CONFERENCES', 
});

// Thực hiện kết nối, nếu err tồn tại thì báo lỗi
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Tạo API xử lý cho yêu cầu truy vấn toàn bộ danh sách
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM CONFERENCES', (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results); // Gửi dữ liệu về client dưới dạng JSON
  });
});

// Tạo API xử lý cho yêu cầu truy vấn danh sách câu tìm kiếm
app.get('/search', (req, res) => {
  const { category, term } = req.query;
  
  
  // Kiểm tra nếu term không có giá trị hoặc chỉ chứa ít hơn hai ký tự % thì trả về danh sách rỗng
  if (!term || term.includes('%')) {
    res.json([]);
    return;
  }

  // Sử dụng thích hợp tên cột dựa vào loại category và term để tìm kiếm
  const query = `SELECT * FROM CONFERENCES WHERE ${category} LIKE '%${term}%'`;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results); // Gửi dữ liệu về client dưới dạng JSON
  });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});