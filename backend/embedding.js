let pipelineInstance = null;

async function loadModel() {
	if (!pipelineInstance) {
		console.log("Loading embedding model on Vercel...");

		// Dynamic ESM import
		const { pipeline } = await import("@xenova/transformers");

		pipelineInstance = await pipeline(
			"feature-extraction",
			"Xenova/all-mpnet-base-v2"
		);
	}

	return pipelineInstance;
}

async function getEmbedding(text) {
	const embedder = await loadModel();

	const result = await embedder(text, {
		pooling: "mean",
		normalize: true,
	});

	return Array.from(result.data);
}

module.exports = { getEmbedding };
