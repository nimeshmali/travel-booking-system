const { getEmbedding } = require("../embedding");
const cloudinary = require("../config/cloudinary");
const { getMatchObjectFromGemini, searchPackages } = require("../matchObject");
const TourPackage = require("../models/TourPackage");
const { getGeminiResponse } = require("../utils/gemini");

// Get all packages
const getAllPackages = async (req, res) => {
	try {
		const packages = await TourPackage.find();
		res.status(200).json(packages);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch packages", error: error.message });
	}
};

// Get a single package by ID
const getPackageById = async (req, res) => {
	try {
		const packagee = await TourPackage.findById(req.params.id);
		if (!packagee) {
			return res.status(404).json({ message: "Package not found" });
		}
		res.status(200).json(packagee);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch package", error: error.message });
	}
};





const createPackage = async (req, res) => {
	try {
		const {
			title, description, price, durationDays, seats,
			category, location, tags, isInternational, availableDates
		} = req.body;

		if (!title || !description || !price || !durationDays || !seats || !category || !availableDates) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: "At least one image is required" });
		}

		// Upload images to Cloudinary
		const uploadToCloudinary = (fileBuffer) => {
			return new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{ folder: "tour-packages" },
					(error, result) => {
						if (error) return reject(error);
						resolve(result.secure_url);
					}
				);
				stream.end(fileBuffer);
			});
		};

		const images = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer)));



		// Validate availableDates
		const validatedDates = JSON.parse(availableDates).map((dateObj, index) => {
			if (!dateObj.startDate) throw new Error(`Missing startDate at index ${index}`);
			const startDate = new Date(dateObj.startDate);
			if (isNaN(startDate.getTime())) throw new Error(`Invalid startDate format at index ${index}`);
			const today = new Date(); today.setHours(0, 0, 0, 0);
			if (startDate < today) throw new Error(`Start date at index ${index} cannot be in the past`);
			return { startDate };
		});

		let parsedLocation = null;
		if (location) {
			// If location is a JSON string, parse it
			if (typeof location === 'string') {
				try {
					parsedLocation = JSON.parse(location);
				} catch (e) {
					return res.status(400).json({ message: "Invalid location format" });
				}
			} else if (typeof location === 'object') {
				parsedLocation = location;
			}
		}
		let parsedTags = [];
		if (tags) {
			if (Array.isArray(tags)) {
				parsedTags = tags;
			} else if (typeof tags === 'string') {
				try {
					// Try parsing as JSON first
					parsedTags = JSON.parse(tags);
				} catch {
					// Split by comma if not JSON
					parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
				}
			}
		}
		const packageData = {
			title: title.trim(),
			description,
			price: parseFloat(price),
			durationDays: parseInt(durationDays),
			seats: parseInt(seats),
			images, // now URLs from Cloudinary
			category: category.trim(),
			location: parsedLocation,
			tags: parsedTags,
			isInternational: Boolean(isInternational),
			availableDates: validatedDates,
		};

		// Generate embedding
		const textForEmbedding = `
      ${packageData.title}. ${packageData.description}.
      Category: ${packageData.category}.
      Location: ${packageData.location?.city || ""}, ${packageData.location?.country || ""}, ${packageData.location?.region || ""}.
      Tags: ${packageData.tags?.join(", ")}.
      Duration: ${packageData.durationDays} days.
      International: ${packageData.isInternational ? "Yes" : "No"}
    `.trim();

		packageData.embedding = await getEmbedding(textForEmbedding);

		const newPackage = new TourPackage(packageData);
		const savedPackage = await newPackage.save();

		res.status(201).json({
			status: "success",
			message: "Tour package created successfully",
			data: savedPackage,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to create package",
			error: error.message
		});
	}
};


const suggestPackages = async (req, res) => {
	try {
		const { query } = req.body;

		if (!query || typeof query !== "string" || query.trim().length === 0) {
			return res.status(400).json({
				message: "Query is required and must be a non-empty string",
			});
		}

		const trimmedQuery = query.trim();

		// Generate embedding for the search query
		const queryEmbedding = await getEmbedding(trimmedQuery);

		// Search for matching packages
		const results = await searchPackages(trimmedQuery, queryEmbedding);

		let suggestion;
		if (results.length > 0) {
			// Build richer package details for Gemini
			const packageDetails = results
				.map(
					(pkg, i) => `
						${i + 1}. **${pkg.title}**
						- Price: ₹${pkg.price}
						- Duration: ${pkg.durationDays} days
						- Location: ${pkg.location?.city || ""}, ${pkg.location?.country || ""}
						- Tags: ${pkg.tags?.join(", ")}
						`
				)
				.join("\n");

			const prompt = `
						User is searching for: "${trimmedQuery}".
						We found these matching packages:

						${packageDetails}

						Write a friendly travel assistant style reply under 3 sentences. 
						Highlight why these options are great, and keep it engaging.
						Use Markdown (bold for package names, italic if you want to emphasize features).
						`;

			suggestion = await getGeminiResponse(prompt);
		} else {
			// No results or general query
			suggestion = await getGeminiResponse(
				`The user said: "${trimmedQuery}". Reply conversationally as a friendly travel assistant.`
			);
		}

		res.status(200).json({
			status: "success",
			message: "Search completed successfully",
			query: trimmedQuery,
			resultsCount: results.length,
			data: results,
			suggestion: suggestion || "I'm here to help with your travel queries!",
		});
	} catch (error) {
		console.error("❌ Search error:", error);

		if (error.message?.includes("embedding") || error.message?.includes("Gemini")) {
			return res.status(500).json({
				message: "Failed to generate embedding for search query",
				error: error.message,
			});
		}

		if (error.message?.includes("search") || error.message?.includes("aggregation")) {
			return res.status(500).json({
				message: "Failed to execute search",
				error: error.message,
			});
		}

		res.status(500).json({
			message: "Search failed",
			error: error.message,
		});
	}
};



// Delete a package (admin only)
const deletePackage = async (req, res) => {
	try {
		const deletedPackage = await TourPackage.findByIdAndDelete(req.params.id);
		if (!deletedPackage) {
			return res.status(404).json({ message: "Package not found" });
		}
		res.status(200).json({ message: "Package deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Failed to delete package", error: error.message });
	}
};

module.exports = {
	getAllPackages,
	getPackageById,
	createPackage,
	deletePackage,
	suggestPackages
};
