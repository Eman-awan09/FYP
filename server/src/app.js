// // src/app.js
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const errorHandler = require('./middleware/errorHandler');
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const complaintRoutes = require("./routes/complaintRoutes");
// const resourceRequestRoutes = require("./routes/resourceRequestRoutes");
// const eventRoutes = require("./routes/eventRoutes");
// const departmentCalendarRoutes = require("./routes/departmentCalendarRoutes");
// // Other routes will be imported later

// const app = express();

// // Middlewares
// // src/app.js
// app.use(
//   express.json({
//     limit: "1mb",
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "1mb",
//   })
// );
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     credentials: true,
//   })
// );

// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'));
// }

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/resource-requests", resourceRequestRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/calendar", departmentCalendarRoutes);



// // Global error handler
// app.use(errorHandler);

// module.exports = app;
// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const resourceRequestRoutes = require("./routes/resourceRequestRoutes");
const eventRoutes = require("./routes/eventRoutes");
const departmentCalendarRoutes = require("./routes/departmentCalendarRoutes");

// ✅ ADD THIS — pre-load embedding model on startup
const { generateEmbedding } = require("./services/embeddingService");
// const { ragQuery } = require("./services/ragService"); // ✅ ADD THIS

// src/app.js — update the warmup section
// const { generateEmbedding } = require("./services/embeddingService");
// const { ragQuery } = require("./services/ragService"); // ✅ ADD THIS

// // Warmup both models on server start
// generateEmbedding("warmup")
//   .then(() => console.log("✅ Embedding model ready"))
//   .catch((err) => console.warn("⚠️ Embedding warmup failed:", err.message));

// ragQuery("warmup test", null) // ✅ ADD THIS — loads LLM in background
//   .then(() => console.log("✅ LLM model ready"))
//   .catch((err) => console.warn("⚠️ LLM warmup failed:", err.message));
const app = express();

// Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ✅ ADD THIS — warm up model when server starts (runs in background)
// generateEmbedding("warmup").then(() => {
//   console.log("✅ RAG embedding model is ready");
// }).catch((err) => {
//   console.warn("⚠️  Embedding model failed to pre-load:", err.message);
// });
generateEmbedding("warmup")
  .then(() => console.log("✅ Embedding model ready"))
  .catch((err) => console.warn("⚠️ Embedding warmup failed:", err.message));

// ragQuery("warmup test", null) // ✅ ADD THIS — loads LLM in background
//   .then(() => console.log("✅ LLM model ready"))
//   .catch((err) => console.warn("⚠️ LLM warmup failed:", err.message));

  
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/resource-requests", resourceRequestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/calendar", departmentCalendarRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;