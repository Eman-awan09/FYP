// src/scripts/testHF.js
// Run: node src/scripts/testHF.js
const axios = require("axios");
require("dotenv").config();

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
const TEST_INPUT = "hello world test";

const URLS = [
  {
    name: "Option 1 - Router (newest)",
    url: "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/v1/feature-extraction",
    body: { inputs: TEST_INPUT },
  },
  {
    name: "Option 2 - Classic models endpoint",
    url: "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
    body: { inputs: TEST_INPUT },
  },
  {
    name: "Option 3 - Pipeline endpoint",
    url: "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    body: { inputs: TEST_INPUT },
  },
  {
    name: "Option 4 - Inference Providers v1",
    url: "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2/v1/feature-extraction",
    body: { inputs: TEST_INPUT },
  },
];

const testUrl = async ({ name, url, body }) => {
  try {
    console.log(`\nTesting: ${name}`);
    console.log(`URL: ${url}`);

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const data = response.data;
    const isArray = Array.isArray(data);
    const firstItem = isArray ? data[0] : null;
    const isVector =
      isArray &&
      (typeof firstItem === "number" ||
        (Array.isArray(firstItem) && typeof firstItem[0] === "number") ||
        (Array.isArray(firstItem) &&
          Array.isArray(firstItem[0]) &&
          typeof firstItem[0][0] === "number"));

    if (isVector) {
      console.log(`✅ SUCCESS! Response shape: ${JSON.stringify(data).slice(0, 80)}...`);
      console.log(`   → Use this URL in your embeddingService.js`);
      return true;
    } else {
      console.log(`⚠️  Got response but not a vector: ${JSON.stringify(data).slice(0, 100)}`);
      return false;
    }
  } catch (err) {
    const status = err.response?.status;
    const msg = err.response?.data || err.message;
    console.log(`❌ Failed (${status}): ${JSON.stringify(msg).slice(0, 150)}`);

    if (status === 401) {
      console.log("   → Your HF_TOKEN is invalid or missing. Check your .env file.");
    } else if (status === 503) {
      console.log("   → Model is loading (503). Wait 30 seconds and try again.");
    } else if (status === 404) {
      console.log("   → Wrong URL for your account tier.");
    }
    return false;
  }
};

const run = async () => {
  console.log("==============================================");
  console.log("  HuggingFace Endpoint Tester");
  console.log("==============================================");

  if (!HF_TOKEN) {
    console.log("\n❌ HUGGINGFACE_API_KEY is not set in your .env file!");
    console.log("   Add this line to your .env:");
    console.log("   HUGGINGFACE_API_KEY=hf_your_token_here");
    process.exit(1);
  }

  console.log(`\nToken found: ${HF_TOKEN.slice(0, 8)}...${HF_TOKEN.slice(-4)}`);

  let found = false;
  for (const option of URLS) {
    const success = await testUrl(option);
    if (success) {
      found = true;
      console.log(`\n✅ WORKING URL FOUND:`);
      console.log(`   ${option.url}`);
      console.log(`\n👉 Update embeddingService.js with this URL and run seed again.`);
      break;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  if (!found) {
    console.log("\n❌ None of the URLs worked.");
    console.log("\nPossible causes:");
    console.log("1. Your token is wrong — go to huggingface.co → Settings → Access Tokens");
    console.log("2. You need to accept model terms — visit:");
    console.log("   https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2");
    console.log("3. HF free tier may be down — try again in a few minutes");
    console.log("\nAlternative: Use local embeddings with @xenova/transformers (no API needed)");
    console.log("Run: npm install @xenova/transformers");
  }

  process.exit(0);
};

run();