// // src/server.js
// require('dotenv').config();
// const http = require('http');
// const connectDB = require('./config/db');
// const app = require('./app');

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB first, then start server
// const startServer = async () => {
//   await connectDB();

//   const server = http.createServer(app);

//   server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// };

// startServer();


// src/server.js
require("dotenv").config();
const http = require("http");
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Step 1: Connect MongoDB
  await connectDB();

  // Step 2: Start HTTP server
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Step 3: Warm up LLM AFTER MongoDB is ready ✅
  try {
    const { ragQuery } = require("./services/ragService");
    await ragQuery("warmup", null);
    console.log("✅ LLM model ready");
  } catch (err) {
    console.warn("⚠️ LLM warmup failed:", err.message);
  }
};

startServer();