// scripts/seedEmbeddings.js
const mongoose = require("mongoose");
const { DepartmentCalendarEntry } = require("../models/DepartmentCalendarEntry");
const { generateEmbedding } = require("../services/embeddingService");
require("dotenv").config();

// Human-readable descriptions for each KEY — this is what gets embedded
const KEY_DESCRIPTIONS = {
  COURSE_OFFERING_TIMETABLE: "course offering timetable schedule classes",
  ENROLLMENT: "enrollment registration student portal admission date",
  LATE_ENROLLMENT: "late enrollment late registration after deadline",
  COMMENCEMENT_GRADUATE: "graduate classes start commencement date",
  COMMENCEMENT_UNDERGRADUATE: "undergraduate bachelor classes start commencement",
  ERP_ATTENDANCE_OPEN: "ERP portal attendance open date system",
  SEMESTER_FREEZE_LAST_DATE: "semester freeze last date lock course registration deadline",
  MID_SEMESTER_EXAM: "mid semester exam midterm examination date",
  SEMESTER_WITHDRAWAL_LAST_DATE: "semester withdrawal last date withdraw from courses deadline",
  END_SEMESTER_EXAMS: "end semester final exams examination date",
  RESULT_SUBMISSION_TO_COE: "result submission controller of examination COE deadline",
  RESULT_DECLARATION_BY_COE: "result declaration announcement COE controller of examinations",
};

// const seed = async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log("Connected to MongoDB");

//   const entries = await DepartmentCalendarEntry.find({});
//   console.log(`Found ${entries.length} entries to embed`);

//   for (const entry of entries) {
//     const description = `${KEY_DESCRIPTIONS[entry.key] || entry.key} for ${entry.department} department. ${entry.note || ""}`;
    
//     console.log(`Embedding: ${entry.department} - ${entry.key}`);
//     const embedding = await generateEmbedding(description);

//     await DepartmentCalendarEntry.findByIdAndUpdate(entry._id, {
//       embedding,
//       description,
//     });

//     // Small delay to avoid rate limiting on free tier
//     await new Promise((r) => setTimeout(r, 1000));
//   }

//   console.log("✅ All embeddings saved!");
//   process.exit(0);
// };
// scripts/seedEmbeddings.js — update the seed function top section
const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // ✅ ADD THIS: warm up the model first
  console.log("Warming up HuggingFace model (may take 20s if sleeping)...");
  let warmed = false;
  for (let i = 0; i < 5; i++) {
    try {
      await generateEmbedding("test");
      warmed = true;
      console.log("✅ Model is ready!");
      break;
    } catch (e) {
      console.log(`Model loading... retry ${i + 1}/5 (waiting 10s)`);
      await new Promise((r) => setTimeout(r, 10000));
    }
  }

  if (!warmed) {
    console.error("❌ Model failed to load. Check your HF_TOKEN and try again.");
    process.exit(1);
  }

  const entries = await DepartmentCalendarEntry.find({});
  console.log(`Found ${entries.length} entries to embed`);

  for (const entry of entries) {
    const description = `${KEY_DESCRIPTIONS[entry.key] || entry.key} for ${entry.department} department. ${entry.note || ""}`;
    console.log(`Embedding: ${entry.department} - ${entry.key}`);

    try {
      const embedding = await generateEmbedding(description);
      await DepartmentCalendarEntry.findByIdAndUpdate(entry._id, {
        embedding,
        description,
      });
      console.log(`  ✅ Done`);
    } catch (e) {
      console.log(`  ❌ Failed: ${e.message}`);
    }

    await new Promise((r) => setTimeout(r, 1500)); // avoid rate limit
  }

  console.log("✅ All embeddings saved!");
  process.exit(0);
};

seed().catch(console.error);