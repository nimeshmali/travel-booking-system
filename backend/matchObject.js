const { GoogleGenerativeAI } = require("@google/generative-ai");
const TourPackage = require("./models/TourPackage"); // your schema

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getMatchObjectFromGemini(userQuery) {
  const prompt = `
  Convert the following user query into a valid MongoDB filter object.
  Only use these fields from the schema:
  - price (Number, supports $lte, $gte)
  - durationDays (Number, supports $lte, $gte)
  - seats (Number, supports $gt, $lte)
  - category (String)
  - tags (Array of Strings, use $in for multiple)
  - availableDates.startDate (Date, supports $gte, $lte)
  - isInternational (Boolean)

  Return ONLY a valid JSON object, no explanation.

  Example:
  {
    "price": { "$lte": 5000 },
    "durationDays": { "$lte": 4 },
    "category": "romantic",
    "seats": { "$gt": 0 },
    "location.country": "Maldives",
    "isInternational": true
  }

  Query: ${userQuery}
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent(prompt);

  try {
    let text = result.response.text().trim();

    // 🧹 Remove code fences like ```json ... ```
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Failed to parse Gemini response:", err);
    return {};
  }
}


// 🔎 Example usage in aggregation
async function searchPackages(userQuery, queryEmbedding) {

  const matchObject = await getMatchObjectFromGemini(userQuery);
  const results = await TourPackage.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: 2,
        limit: 1,
        index: "embedding",
      },
    },
    { $match: matchObject },
  ]);

  return results;
}

module.exports = { searchPackages, getMatchObjectFromGemini };
