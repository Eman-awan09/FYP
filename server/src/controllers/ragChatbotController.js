// controllers/ragChatbotController.js
const { ragQuery } = require("../services/ragService");

/**
 * Detect department from question text
 * Handles: "cs department", "for it", "in se", etc.
 */
const extractDepartmentFromQuestion = (text) => {
  const deptPatterns = [
    /\b(cs|computer science)\b/i,
    /\b(it|information technology)\b/i,
    /\b(se|software engineering)\b/i,
    /\b(ee|electrical engineering)\b/i,
    /\b(me|mechanical engineering)\b/i,
    /\b(ce|civil engineering)\b/i,
    /\b(ai|artificial intelligence)\b/i,
    /\b(ds|data science)\b/i,
  ];

  const deptMap = {
    cs: "CS", "computer science": "CS",
    it: "IT", "information technology": "IT",
    se: "SE", "software engineering": "SE",
    ee: "EE", "electrical engineering": "EE",
    me: "ME", "mechanical engineering": "ME",
    ce: "CE", "civil engineering": "CE",
    ai: "AI", "artificial intelligence": "AI",
    ds: "DS", "data science": "DS",
  };

  const lower = text.toLowerCase();
  for (const [key, value] of Object.entries(deptMap)) {
    if (lower.includes(key)) return value;
  }
  return null;
};

const ragChatbotHandler = async (req, res, next) => {
  try {
    const user = req.user;
    let { q, department } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ message: "Query parameter 'q' is required." });
    }

    // Detect department: from query param → from question text → from user profile
    let dep =
      (department && department.trim().toUpperCase()) ||
      extractDepartmentFromQuestion(q) ||
      (user?.department && user.department.trim().toUpperCase()) ||
      null;

    const result = await ragQuery(q.trim(), dep);

    return res.json({
      answer: result.answer,
      department: dep || "ALL",
      sources: result.sources, // optional: send to frontend for debugging
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ragChatbotHandler };