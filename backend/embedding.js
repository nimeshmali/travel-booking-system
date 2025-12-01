const { pipeline } = require("@xenova/transformers");

// Load model only once
let embedderPromise = null;

async function loadModel() {
	if (!embedderPromise) {
		console.log("Loading embedding model locally...");
		embedderPromise = await pipeline(
			"feature-extraction",
			"Xenova/all-mpnet-base-v2"
		);
	}
	return embedderPromise;
}

const getEmbedding = async (text) => {
	const embedder = await loadModel();

	const result = await embedder(text, {
		pooling: "mean",     // average pooling
		normalize: true      // L2 normalization
	});

	// Convert tensor → JS array
	return Array.from(result.data);
};

module.exports = { getEmbedding };
