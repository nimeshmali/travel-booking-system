const TourPackage = require("../models/TourPackage");

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
		const package = await TourPackage.findById(req.params.id);
		if (!package) {
			return res.status(404).json({ message: "Package not found" });
		}
		res.status(200).json(package);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch package", error: error.message });
	}
};

// Create a new package (admin only)
const createPackage = async (req, res) => {
	try {
		const { title, description, price, image, availableDates } = req.body;

		// Validate required fields
		if (!title || !description || !price || !image || !availableDates) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		// Process dates
		const validatedDates = availableDates.map((dateRange) => {
			const startDate = new Date(dateRange.startDate);
			const endDate = new Date(dateRange.endDate);

			if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
				throw new Error("Invalid date format");
			}

			if (endDate <= startDate) {
				throw new Error("End date must be after start date");
			}

			return { startDate, endDate };
		});

		// Create and save package
		const newPackage = new TourPackage({
			title,
			description,
			price: parseFloat(price),
			image,
			availableDates: validatedDates,
		});

		const savedPackage = await newPackage.save();
		res.status(201).json({
			status: "success",
			message: "Tour package created successfully",
			data: savedPackage,
		});
	} catch (error) {
		res.status(500).json({ message: "Failed to create package", error: error.message });
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
};
