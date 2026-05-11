// // services/ragService.js
// const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
// const { generateEmbedding } = require("./embeddingService");
// const axios = require("axios");
// require("dotenv").config();

// const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// /**
//  * Cosine similarity (fallback if not using Atlas Vector Search)
//  */
// const cosineSimilarity = (a, b) => {
//   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
//   const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
//   const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
//   return dot / (magA * magB);
// };

// /**
//  * Find relevant calendar entries from MongoDB using vector similarity
//  */
// const retrieveRelevantEntries = async (questionEmbedding, department = null, topK = 3) => {
//   // Fetch entries that have embeddings
//   const filter = { embedding: { $exists: true, $ne: [] } };
//   if (department) filter.department = department.toUpperCase();

//   const allEntries = await DepartmentCalendarEntry.find(filter);

//   // Score each entry
//   const scored = allEntries.map((entry) => ({
//     entry,
//     score: cosineSimilarity(questionEmbedding, entry.embedding),
//   }));

//   // Sort by similarity and return top K
//   scored.sort((a, b) => b.score - a.score);
//   return scored.slice(0, topK).filter((s) => s.score > 0.3); // threshold
// };

// /**
//  * Generate answer using Hugging Face LLM
//  */
// const generateAnswer = async (question, context) => {
//   const prompt = `You are a helpful university campus chatbot. Answer the student's question based only on the provided context. Be concise and friendly.

// Context:
// ${context}

// Student Question: ${question}

// Answer:`;

//   try {
//     const response = await axios.post(
//       "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
//       {
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: 200,
//           temperature: 0.3,
//           return_full_text: false,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     return response.data[0]?.generated_text?.trim() || "I could not generate an answer.";
//   } catch (error) {
//     // Fallback: build answer directly from context without LLM
//     console.warn("LLM failed, using direct answer:", error.message);
//     return null;
//   }
// };

// /**
//  * Build a direct answer from retrieved entries (no LLM needed as fallback)
//  */
// const buildDirectAnswer = (entries, department) => {
//   if (!entries.length) {
//     return `No academic calendar data found${department ? ` for ${department} department` : ""}. Please contact the administration office.`;
//   }

//   const answers = entries.map(({ entry }) => {
//     const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     let line = `• [${entry.department}] ${entry.key.replace(/_/g, " ")}: ${dateStr}`;
//     if (entry.note) line += ` (${entry.note})`;
//     return line;
//   });

//   return `Here is what I found:\n${answers.join("\n")}`;
// };

// /**
//  * Main RAG pipeline
//  */
// const ragQuery = async (question, department = null) => {
//   // Step 1: Embed the question
//   const questionEmbedding = await generateEmbedding(question);

//   // Step 2: Retrieve relevant entries
//   const results = await retrieveRelevantEntries(questionEmbedding, department);

//   if (!results.length) {
//     return {
//       answer: "I couldn't find relevant information for your question. Try asking about enrollment dates, exam schedules, semester freeze, or result declarations.",
//       sources: [],
//     };
//   }

//   // Step 3: Build context string for LLM
//   const context = results.map(({ entry }) => {
//     const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//       year: "numeric", month: "long", day: "numeric",
//     });
//     return `- ${entry.department} department | ${entry.key.replace(/_/g, " ")}: ${dateStr}. ${entry.note || ""}`;
//   }).join("\n");

//   // Step 4: Generate answer with LLM (with fallback)
//   let answer = await generateAnswer(question, context);
//   if (!answer) {
//     answer = buildDirectAnswer(results, department);
//   }

//   return {
//     answer,
//     sources: results.map(({ entry, score }) => ({
//       department: entry.department,
//       key: entry.key,
//       date: entry.date,
//       score: Math.round(score * 100) / 100,
//     })),
//   };
// };

// module.exports = { ragQuery };
// src/services/ragService.js
// const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
// const { generateEmbedding } = require("./embeddingService");

// // Cosine similarity between two vectors
// const cosineSimilarity = (a, b) => {
//   let dot = 0, magA = 0, magB = 0;
//   for (let i = 0; i < a.length; i++) {
//     dot  += a[i] * b[i];
//     magA += a[i] * a[i];
//     magB += b[i] * b[i];
//   }
//   return dot / (Math.sqrt(magA) * Math.sqrt(magB));
// };

// // Retrieve top-K most relevant entries from MongoDB
// const retrieveRelevantEntries = async (questionEmbedding, department = null, topK = 3) => {
//   const filter = {
//     embedding: { $exists: true, $ne: [] },
//   };
//   if (department) filter.department = department.toUpperCase();

//   const allEntries = await DepartmentCalendarEntry.find(filter);

//   const scored = allEntries.map((entry) => ({
//     entry,
//     score: cosineSimilarity(questionEmbedding, entry.embedding),
//   }));

//   scored.sort((a, b) => b.score - a.score);

//   // Only return entries above similarity threshold
//   return scored.slice(0, topK).filter((s) => s.score > 0.25);
// };

// // Build a clean natural language answer from retrieved entries
// const buildAnswer = (results, department) => {
//   if (!results.length) {
//     return `I couldn't find relevant academic calendar information${
//       department ? ` for the ${department} department` : ""
//     }. Try asking about:\n• Enrollment dates\n• Exam schedules\n• Semester freeze\n• Result declarations\n• Course timetables`;
//   }

//   const lines = results.map(({ entry, score }) => {
//     const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//       weekday: "long",
//       year:    "numeric",
//       month:   "long",
//       day:     "numeric",
//     });

//     const label = entry.key
//       .replace(/_/g, " ")
//       .toLowerCase()
//       .replace(/\b\w/g, (c) => c.toUpperCase()); // Title Case

//     let line = `📅 **${label}** (${entry.department} Dept): ${dateStr}`;
//     if (entry.note) line += `\n   📝 ${entry.note}`;
//     return line;
//   });

//   const intro = results.length === 1
//     ? "Here is what I found:"
//     : `Here are the ${results.length} most relevant results:`;

//   return `${intro}\n\n${lines.join("\n\n")}`;
// };

// // Main RAG pipeline
// const ragQuery = async (question, department = null) => {
//   // Step 1: Embed the user's question
//   const questionEmbedding = await generateEmbedding(question);

//   // Step 2: Find relevant DB entries by vector similarity
//   const results = await retrieveRelevantEntries(questionEmbedding, department);

//   // Step 3: If nothing found for specific dept, try ALL departments
//   let finalResults = results;
//   if (!results.length && department) {
//     console.log(`No results for ${department}, falling back to all departments`);
//     finalResults = await retrieveRelevantEntries(questionEmbedding, null);
//   }

//   // Step 4: Build and return answer
//   const answer = buildAnswer(finalResults, department);

//   return {
//     answer,
//     sources: finalResults.map(({ entry, score }) => ({
//       department: entry.department,
//       key:        entry.key,
//       date:       entry.date,
//       score:      Math.round(score * 100) / 100,
//     })),
//   };
// };

// module.exports = { ragQuery };
// src/services/ragService.js
// const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
// const { generateEmbedding } = require("./embeddingService");

// // ─── Cosine Similarity ────────────────────────────────────────────────────────
// const cosineSimilarity = (a, b) => {
//   let dot = 0, magA = 0, magB = 0;
//   for (let i = 0; i < a.length; i++) {
//     dot  += a[i] * b[i];
//     magA += a[i] * a[i];
//     magB += b[i] * b[i];
//   }
//   return dot / (Math.sqrt(magA) * Math.sqrt(magB));
// };

// // ─── LLM: local text generation (no API key) ─────────────────────────────────
// let llmPipe = null;

// const getLLM = async () => {
//   if (llmPipe) return llmPipe;
//   console.log("Loading local LLM (Flan-T5-small, ~80MB, first time only)...");
//   const { pipeline } = await import("@xenova/transformers");
//   llmPipe = await pipeline("text2text-generation", "Xenova/flan-t5-small");
//   console.log("✅ Local LLM ready!");
//   return llmPipe;
// };

// // ─── Generate answer from context using local LLM ────────────────────────────
// const generateLLMAnswer = async (question, contextEntries) => {
//   try {
//     const llm = await getLLM();

//     // Build context string from retrieved DB entries
//     const context = contextEntries.map(({ entry }) => {
//       const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//         weekday: "long", year: "numeric", month: "long", day: "numeric",
//       });
//       const label = entry.key.replace(/_/g, " ").toLowerCase();
//       return `${entry.department} department ${label} is on ${dateStr}. ${entry.note || ""}`;
//     }).join(" | ");

//     // Prompt for flan-t5 (instruction-following format)
//     const prompt = `Answer the student question based on the campus calendar data.

// Calendar data: ${context}

// Question: ${question}

// Answer:`;

//     const result = await llm(prompt, {
//       max_new_tokens: 120,
//       temperature: 0.3,
//     });

//     return result[0]?.generated_text?.trim() || null;
//   } catch (err) {
//     console.warn("LLM generation failed, using direct answer:", err.message);
//     return null;
//   }
// };

// // ─── Retrieve relevant DB entries by vector similarity ───────────────────────
// const retrieveRelevantEntries = async (questionEmbedding, department = null, topK = 3) => {
//   const filter = { embedding: { $exists: true, $ne: [] } };
//   if (department) filter.department = department.toUpperCase();

//   const allEntries = await DepartmentCalendarEntry.find(filter);

//   const scored = allEntries.map((entry) => ({
//     entry,
//     score: cosineSimilarity(questionEmbedding, entry.embedding),
//   }));

//   scored.sort((a, b) => b.score - a.score);
//   return scored.slice(0, topK).filter((s) => s.score > 0.25);
// };

// // ─── Fallback: direct structured answer (no LLM needed) ──────────────────────
// const buildDirectAnswer = (results, department) => {
//   if (!results.length) {
//     return `I couldn't find relevant academic calendar information${
//       department ? ` for the ${department} department` : ""
//     }. Try asking about:\n• Enrollment dates\n• Exam schedules\n• Semester freeze\n• Result declarations\n• Course timetables`;
//   }

//   const lines = results.map(({ entry }) => {
//     const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//       weekday: "long", year: "numeric", month: "long", day: "numeric",
//     });
//     const label = entry.key
//       .replace(/_/g, " ")
//       .toLowerCase()
//       .replace(/\b\w/g, (c) => c.toUpperCase());

//     let line = `📅 **${label}** (${entry.department} Dept): ${dateStr}`;
//     if (entry.note) line += `\n   📝 ${entry.note}`;
//     return line;
//   });

//   return `${results.length === 1 ? "Here is what I found:" : `Here are the ${results.length} most relevant results:`}\n\n${lines.join("\n\n")}`;
// };

// // ─── Main RAG Pipeline ────────────────────────────────────────────────────────
// const ragQuery = async (question, department = null) => {
//   // Step 1: Embed the question
//   const questionEmbedding = await generateEmbedding(question);

//   // Step 2: Retrieve relevant entries
//   let results = await retrieveRelevantEntries(questionEmbedding, department);

//   // Step 3: Fallback to all departments if nothing found
//   if (!results.length && department) {
//     console.log(`No results for ${department}, trying all departments...`);
//     results = await retrieveRelevantEntries(questionEmbedding, null);
//   }

//   if (!results.length) {
//     return {
//       answer: buildDirectAnswer([], department),
//       sources: [],
//       mode: "no_results",
//     };
//   }

//   // Step 4: Try LLM answer first, fall back to direct answer
//   const llmAnswer = await generateLLMAnswer(question, results);
//   const answer = llmAnswer || buildDirectAnswer(results, department);

//   return {
//     answer,
//     sources: results.map(({ entry, score }) => ({
//       department: entry.department,
//       key:        entry.key,
//       date:       entry.date,
//       score:      Math.round(score * 100) / 100,
//     })),
//     mode: llmAnswer ? "llm" : "direct", // tells frontend which mode was used
//   };
// };

// module.exports = { ragQuery };
// src/services/ragService.js
// const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
// const { generateEmbedding } = require("./embeddingService");

// // ─── Cosine Similarity ────────────────────────────────────────────────────────
// const cosineSimilarity = (a, b) => {
//   let dot = 0, magA = 0, magB = 0;
//   for (let i = 0; i < a.length; i++) {
//     dot  += a[i] * b[i];
//     magA += a[i] * a[i];
//     magB += b[i] * b[i];
//   }
//   return dot / (Math.sqrt(magA) * Math.sqrt(magB));
// };

// // ─── Greeting / chit-chat detector ───────────────────────────────────────────
// const GREETINGS = [
//   "hello", "hi", "hey", "helo", "hii", "salam", "assalam", "good morning",
//   "good evening", "good afternoon", "good night", "howdy", "yo", "sup",
//   "how are you", "how r u", "what's up", "whats up", "aoa", "assalamualaikum",
// ];

// const THANKS = [
//   "thanks", "thank you", "thankyou", "shukriya", "shukria", "jazakallah",
//   "great", "awesome", "perfect", "nice", "good", "ok thanks", "okay thanks",
// ];

// const HELP_KEYWORDS = [
//   "help", "what can you do", "what do you know", "what can i ask",
//   "capabilities", "features", "options",
// ];

// const detectIntent = (text) => {
//   const lower = text.trim().toLowerCase();

//   if (GREETINGS.some((g) => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + "!")))
//     return "greeting";

//   if (THANKS.some((t) => lower === t || lower.includes(t)))
//     return "thanks";

//   if (HELP_KEYWORDS.some((h) => lower.includes(h)))
//     return "help";

//   return "academic"; // treat as calendar question
// };

// // ─── Pre-built responses for non-academic intents ────────────────────────────
// const getIntentResponse = (intent, department) => {
//   const dept = department ? ` for the **${department}** department` : "";

//   if (intent === "greeting") {
//     return {
//       answer: `👋 Hello! I'm your Campus Academic Assistant.\n\nI can help you with academic calendar information${dept}. Try asking:\n\n• "When are the final exams?"\n• "What is the enrollment date?"\n• "Semester freeze last date?"\n• "When will results be declared?"\n• "When do classes start?"`,
//       sources: [],
//       mode: "intent",
//     };
//   }

//   if (intent === "thanks") {
//     return {
//       answer: `😊 You're welcome! Feel free to ask anything else about the academic calendar.\n\nYou can ask about exam dates, enrollment, results, semester freeze, and more.`,
//       sources: [],
//       mode: "intent",
//     };
//   }

//   if (intent === "help") {
//     return {
//       answer: `🤖 I'm your Campus Academic Assistant. Here's what I can help with:\n\n📅 **Exam Dates** — mid-semester & final exams\n📝 **Enrollment** — enrollment & late enrollment dates\n🎓 **Class Commencement** — when graduate/undergraduate classes start\n🔒 **Semester Freeze** — last date to lock registration\n↩️ **Semester Withdrawal** — last date to withdraw\n📊 **Results** — result declaration & submission dates\n🖥️ **ERP Attendance** — when ERP opens for attendance\n\nJust ask naturally — "when are my finals for CS?" or "enrollment date IT dept"`,
//       sources: [],
//       mode: "intent",
//     };
//   }

//   return null;
// };

// // ─── LLM (optional, local) ────────────────────────────────────────────────────
// let llmPipe = null;

// const getLLM = async () => {
//   if (llmPipe) return llmPipe;
//   console.log("Loading local LLM...");
//   const { pipeline } = await import("@xenova/transformers");
//   llmPipe = await pipeline("text2text-generation", "Xenova/flan-t5-small");
//   console.log("✅ LLM ready!");
//   return llmPipe;
// };

// const generateLLMAnswer = async (question, contextEntries) => {
//   try {
//     const llm = await getLLM();
//     const context = contextEntries.map(({ entry }) => {
//       const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//         weekday: "long", year: "numeric", month: "long", day: "numeric",
//       });
//       return `${entry.department} department ${entry.key.replace(/_/g, " ").toLowerCase()} is on ${dateStr}. ${entry.note || ""}`;
//     }).join(" | ");

//     const prompt = `Answer the student question based on the campus calendar data.\nCalendar data: ${context}\nQuestion: ${question}\nAnswer:`;

//     const result = await llm(prompt, { max_new_tokens: 120, temperature: 0.3 });
//     return result[0]?.generated_text?.trim() || null;
//   } catch (err) {
//     console.warn("LLM failed, using direct answer:", err.message);
//     return null;
//   }
// };

// // ─── Retrieve relevant DB entries ─────────────────────────────────────────────
// const retrieveRelevantEntries = async (questionEmbedding, department = null, topK = 3) => {
//   const filter = { embedding: { $exists: true, $ne: [] } };
//   if (department) filter.department = department.toUpperCase();

//   const allEntries = await DepartmentCalendarEntry.find(filter);
//   const scored = allEntries.map((entry) => ({
//     entry,
//     score: cosineSimilarity(questionEmbedding, entry.embedding),
//   }));

//   scored.sort((a, b) => b.score - a.score);
//   return scored.slice(0, topK).filter((s) => s.score > 0.25);
// };

// // ─── Direct structured answer (fallback) ─────────────────────────────────────
// const buildDirectAnswer = (results) => {
//   const lines = results.map(({ entry }) => {
//     const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
//       weekday: "long", year: "numeric", month: "long", day: "numeric",
//     });
//     const label = entry.key
//       .replace(/_/g, " ")
//       .toLowerCase()
//       .replace(/\b\w/g, (c) => c.toUpperCase());

//     let line = `📅 **${label}** (${entry.department} Dept): ${dateStr}`;
//     if (entry.note) line += `\n   📝 ${entry.note}`;
//     return line;
//   });

//   const intro = results.length === 1 ? "Here is what I found:" : `Here are the ${results.length} most relevant results:`;
//   return `${intro}\n\n${lines.join("\n\n")}`;
// };

// // ─── No results fallback ──────────────────────────────────────────────────────
// const buildNoResultAnswer = (question, department) => {
//   const dept = department ? ` for the **${department}** department` : "";
//   return `🔍 I couldn't find information about "${question}"${dept}.\n\nI can only answer questions about the academic calendar. Try:\n\n• "When are the final exams?"\n• "What is the semester freeze date?"\n• "When does enrollment start?"\n• "Result declaration date?"\n• "When do classes commence?"`;
// };

// // ─── Main RAG Pipeline ────────────────────────────────────────────────────────
// const ragQuery = async (question, department = null) => {
//   // Step 1: Check intent first (greetings, thanks, help)
//   const intent = detectIntent(question);
//   if (intent !== "academic") {
//     return getIntentResponse(intent, department);
//   }

//   // Step 2: Embed the question
//   const questionEmbedding = await generateEmbedding(question);

//   // Step 3: Retrieve relevant entries
//   let results = await retrieveRelevantEntries(questionEmbedding, department);

//   // Step 4: Fallback to all departments if nothing found
//   if (!results.length && department) {
//     console.log(`No results for ${department}, trying all departments...`);
//     results = await retrieveRelevantEntries(questionEmbedding, null);
//   }

//   // Step 5: No results at all
//   if (!results.length) {
//     return {
//       answer: buildNoResultAnswer(question, department),
//       sources: [],
//       mode: "no_results",
//     };
//   }

//   // Step 6: Generate answer
//   const llmAnswer = await generateLLMAnswer(question, results);
//   const answer = llmAnswer || buildDirectAnswer(results);

//   return {
//     answer,
//     sources: results.map(({ entry, score }) => ({
//       department: entry.department,
//       key:        entry.key,
//       date:       entry.date,
//       score:      Math.round(score * 100) / 100,
//     })),
//     mode: llmAnswer ? "llm" : "direct",
//   };
// };

// module.exports = { ragQuery };
// src/services/ragService.js
const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
const { generateEmbedding } = require("./embeddingService");
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Cosine Similarity ────────────────────────────────────────────────────────
const cosineSimilarity = (a, b) => {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

// ─── Greeting / Intent Detection ─────────────────────────────────────────────
const GREETINGS = ["hello","hi","hey","helo","hii","salam","assalam","aoa",
  "good morning","good evening","good afternoon","howdy","yo","sup",
  "how are you","how r u","whats up","what's up","assalamualaikum"];

const THANKS = ["thanks","thank you","thankyou","shukriya","jazakallah",
  "great","awesome","perfect","ok thanks","okay thanks"];

const HELP_KEYWORDS = ["help","what can you do","what do you know",
  "what can i ask","capabilities","features","options"];

const detectIntent = (text) => {
  const lower = text.trim().toLowerCase();
  if (GREETINGS.some((g) => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + "!")))
    return "greeting";
  if (THANKS.some((t) => lower === t || lower.includes(t)))
    return "thanks";
  if (HELP_KEYWORDS.some((h) => lower.includes(h)))
    return "help";
  return "academic";
};

const getIntentResponse = (intent, department) => {
  const dept = department ? ` for the **${department}** department` : "";
  if (intent === "greeting") return {
    answer: `👋 Hello! I'm your Campus Academic Assistant powered by AI.\n\nI can help you with academic calendar information${dept}. Try asking:\n\n• "When are the final exams?"\n• "What is the enrollment date?"\n• "Semester freeze last date?"\n• "When will results be declared?"`,
    sources: [], mode: "intent",
  };
  if (intent === "thanks") return {
    answer: `😊 You're welcome! Feel free to ask anything else about the academic calendar.`,
    sources: [], mode: "intent",
  };
  if (intent === "help") return {
    answer: `🤖 I'm your AI-powered Campus Assistant. I can help with:\n\n📅 **Exam Dates** — mid-semester & final exams\n📝 **Enrollment** — enrollment & late enrollment dates\n🎓 **Class Commencement** — when classes start\n🔒 **Semester Freeze** — last date to lock registration\n↩️ **Semester Withdrawal** — last date to withdraw\n📊 **Results** — result declaration dates\n\nJust ask naturally!`,
    sources: [], mode: "intent",
  };
  return null;
};

// ─── Groq LLM Answer Generation ──────────────────────────────────────────────
const generateLLMAnswer = async (question, contextEntries) => {
  try {
    const context = contextEntries.map(({ entry }) => {
      const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
      const label = entry.key.replace(/_/g, " ").toLowerCase();
      return `- ${entry.department} department | ${label}: ${dateStr}${entry.note ? ` (${entry.note})` : ""}`;
    }).join("\n");

    const completion = await groq.chat.completions.create({
      // model: "llama3-8b-8192", // free model on Groq
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a helpful university campus assistant. Answer student questions about the academic calendar based ONLY on the provided data. Be friendly, concise, and accurate. If the data doesn't contain the answer, say so politely. Always mention the specific date and department in your answer.`,
        },
        {
          role: "user",
          content: `Academic Calendar Data:\n${context}\n\nStudent Question: ${question}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn("Groq LLM failed, using direct answer:", err.message);
    return null;
  }
};

// ─── Retrieve Relevant Entries ────────────────────────────────────────────────
const retrieveRelevantEntries = async (questionEmbedding, department = null, topK = 3) => {
  const filter = { embedding: { $exists: true, $ne: [] } };
  if (department) filter.department = department.toUpperCase();

  const allEntries = await DepartmentCalendarEntry.find(filter);
  const scored = allEntries.map((entry) => ({
    entry,
    score: cosineSimilarity(questionEmbedding, entry.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((s) => s.score > 0.25);
};

// ─── Direct Answer (fallback if Groq fails) ───────────────────────────────────
const buildDirectAnswer = (results) => {
  const lines = results.map(({ entry }) => {
    const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const label = entry.key.replace(/_/g, " ").toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    let line = `📅 **${label}** (${entry.department} Dept): ${dateStr}`;
    if (entry.note) line += `\n   📝 ${entry.note}`;
    return line;
  });
  return `${results.length === 1 ? "Here is what I found:" : `Here are ${results.length} results:`}\n\n${lines.join("\n\n")}`;
};

const buildNoResultAnswer = (question, department) => {
  const dept = department ? ` for **${department}** department` : "";
  return `🔍 I couldn't find information about "${question}"${dept}.\n\nTry asking about:\n• Final exam dates\n• Enrollment dates\n• Semester freeze deadline\n• Result declaration\n• Class commencement dates`;
};

// ─── Main RAG Pipeline ────────────────────────────────────────────────────────
const ragQuery = async (question, department = null) => {
  // Step 1: Handle greetings/thanks/help
  const intent = detectIntent(question);
  if (intent !== "academic") return getIntentResponse(intent, department);

  // Step 2: Embed question
  const questionEmbedding = await generateEmbedding(question);

  // Step 3: Find relevant DB entries
  let results = await retrieveRelevantEntries(questionEmbedding, department);

  // Step 4: Fallback to all departments
  if (!results.length && department) {
    results = await retrieveRelevantEntries(questionEmbedding, null);
  }

  // Step 5: Nothing found
  if (!results.length) {
    return { answer: buildNoResultAnswer(question, department), sources: [], mode: "no_results" };
  }

  // Step 6: Generate AI answer using Groq LLM ✅
  const llmAnswer = await generateLLMAnswer(question, results);

  return {
    answer: llmAnswer || buildDirectAnswer(results),
    sources: results.map(({ entry, score }) => ({
      department: entry.department,
      key: entry.key,
      date: entry.date,
      score: Math.round(score * 100) / 100,
    })),
    mode: llmAnswer ? "llm_groq" : "direct",
  };
};

module.exports = { ragQuery };