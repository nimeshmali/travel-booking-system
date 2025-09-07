const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getEmbedding = async (textForEmbedding)=>{
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
		const embeddingResponse = await model.embedContent(textForEmbedding);
		const embedding = embeddingResponse.embedding.values;
		return embedding
}

module.exports = {getEmbedding};