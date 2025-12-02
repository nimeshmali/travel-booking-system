const { GoogleGenerativeAI } = require("@google/generative-ai");
const TourPackage = require("./models/TourPackage"); // your schema

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function searchPackages(userQuery, queryEmbedding) {

  const results = await TourPackage.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: 100,
        limit: 20, // ✅ Get more candidates first
        index: "vector_index",
      },
    },
    {
      $addFields: {
        score: { $meta: "vectorSearchScore" }
      }
    },
    {
      $match: {
        score: { $gte: 0.65 } // Only return results with >70% similarity
      }
    },
    {
      $limit: 10 // ✅ Then limit results
    }
  ]);

  console.log(`✅ Found ${results.length} results`);
  return results;
}

module.exports = { searchPackages };
