// // // services/embeddingService.js
// // const axios = require("axios");
// // require("dotenv").config();

// // const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
// // const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

// // const generateEmbedding = async (text) => {
// //   try {
// //     const response = await axios.post(
// //       // ✅ CORRECT URL — removed /pipeline/
// //       `https://api-inference.huggingface.co/models/${EMBEDDING_MODEL}`,
// //       { inputs: text },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${HF_TOKEN}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     // HF returns [[...vector...]] for single input — take first item
// //     const data = response.data;
// //     if (Array.isArray(data[0][0])) {
// //       return data[0]; // nested array case
// //     }
// //     return data[0]; // flat array case
// //   } catch (error) {
// //     console.error("Embedding error:", error.response?.data || error.message);
// //     throw error;
// //   }
// // };

// // module.exports = { generateEmbedding };
// // src/services/embeddingService.js
// const axios = require("axios");
// require("dotenv").config();

// const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// const generateEmbedding = async (text) => {
//   try {
//     const response = await axios.post(
//       // ✅ NEW correct URL format for HF Inference API 2024+
//       "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/v1/feature-extraction",
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = response.data;

//     // HF returns different shapes — handle all cases
//     if (Array.isArray(data) && Array.isArray(data[0]) && Array.isArray(data[0][0])) {
//       return data[0][0]; // shape [[[...384 numbers...]]]
//     }
//     if (Array.isArray(data) && Array.isArray(data[0])) {
//       return data[0]; // shape [[...384 numbers...]]
//     }
//     if (Array.isArray(data) && typeof data[0] === "number") {
//       return data; // shape [...384 numbers...]
//     }

//     throw new Error("Unexpected embedding response shape: " + JSON.stringify(data).slice(0, 100));
//   } catch (error) {
//     const errMsg = error.response?.data || error.message;
//     console.error("Embedding error:", errMsg);
//     throw error;
//   }
// };

// module.exports = { generateEmbedding };

// src/services/embeddingService.js
let pipe = null;

const getEmbeddingPipeline = async () => {
  if (pipe) return pipe;

  console.log("Loading embedding model locally (first time takes 1-2 min to download)...");

  // Dynamic import required for @xenova/transformers
  const { pipeline } = await import("@xenova/transformers");

  pipe = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2" // same model, runs locally
  );

  console.log("✅ Embedding model loaded!");
  return pipe;
};

const generateEmbedding = async (text) => {
  const embeddingPipeline = await getEmbeddingPipeline();

  const output = await embeddingPipeline(text, {
    pooling: "mean",
    normalize: true,
  });

  // Convert to plain JS array
  return Array.from(output.data);
};

module.exports = { generateEmbedding };