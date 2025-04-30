const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./data/db');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// middleware always put first
app.use(json());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

const allowedOrigins = ["http://localhost:8888", "http://localhost:3000"];


app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        console.error("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );


// 🔥 Add CORS headers manually in case middleware fails
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });


  app.get("/", (req, res) => res.send("Server is running!"));

  // Xử lý lỗi
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke!");
    next();
  });
  
  const server = createServer(app);
  const PORT = process.env.PORT || 8080;
  
  server.listen(PORT, () => {
    console.log(`Now streaming on http://localhost:${PORT}`);
  });