import axios from "axios";
import React, { useState } from "react";
import packageService from "../api/services/packageService";

const TourPackageForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		durationDays: "",
		seats: "",
		images: [], // Changed from single image to multiple images
		category: "",
		location: {
			country: "",
			city: "",
			region: "",
		},
		tags: [],
		isInternational: false,
		availableDates: [
			{
				startDate: "", // Only startDate needed now
			},
		],
	});

	const [currentTag, setCurrentTag] = useState("");

	// Handle input changes for text and number fields
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			setFormData((prevState) => ({
				...prevState,
				[name]: checked,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	// Handle location changes
	const handleLocationChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			location: {
				...prevState.location,
				[name]: value,
			},
		}));
	};


	const handleImagesChange = (e) => {
		const files = Array.from(e.target.files);
		setFormData((prev) => ({
			...prev,
			images: [...prev.images, ...files],
		}));
	};

	// Remove an image
	const removeImage = (index) => {
		setFormData((prevState) => ({
			...prevState,
			images: prevState.images.filter((_, i) => i !== index),
		}));
	};

	// Handle tags
	const addTag = () => {
		if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
			setFormData((prevState) => ({
				...prevState,
				tags: [...prevState.tags, currentTag.trim()],
			}));
			setCurrentTag("");
		}
	};

	const removeTag = (tagToRemove) => {
		setFormData((prevState) => ({
			...prevState,
			tags: prevState.tags.filter(tag => tag !== tagToRemove),
		}));
	};

	const handleTagKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addTag();
		}
	};

	// Handle date changes (only startDate now)
	const handleDateChange = (index, e) => {
		const { value } = e.target;
		const updatedDates = [...formData.availableDates];
		updatedDates[index].startDate = value;

		setFormData((prevState) => ({
			...prevState,
			availableDates: updatedDates,
		}));
	};

	// Add more date ranges
	const addDateRange = () => {
		setFormData((prevState) => ({
			...prevState,
			availableDates: [...prevState.availableDates, { startDate: "" }],
		}));
	};

	// Remove a date range
	const removeDateRange = (index) => {
		const updatedDates = formData.availableDates.filter((_, i) => i !== index);
		setFormData((prevState) => ({
			...prevState,
			availableDates: updatedDates,
		}));
	};

	// Form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const {
				title,
				description,
				price,
				durationDays,
				seats,
				images,
				category,
				location,
				tags,
				isInternational,
				availableDates,
			} = formData;

			if (
				!title ||
				!description ||
				!price ||
				!durationDays ||
				!seats ||
				images.length === 0 ||
				!category
			) {
				alert("Please fill in all required fields and upload at least one image");
				return;
			}

			if (availableDates.some((date) => !date.startDate)) {
				alert("Please fill in all available dates");
				return;
			}

			const fd = new FormData();
			fd.append("title", title);
			fd.append("description", description);
			fd.append("price", parseFloat(price));
			fd.append("durationDays", parseInt(durationDays));
			fd.append("seats", parseInt(seats));
			fd.append("category", category);
			fd.append("isInternational", isInternational);
			fd.append("location", JSON.stringify(location));
			fd.append("tags", JSON.stringify(tags));
			fd.append("availableDates", JSON.stringify(availableDates));

			images.forEach((file) => {
				fd.append("images", file); // matches multer field name
			});
			const response = await packageService.createPackage(fd,
			);


			setFormData({
				title: "",
				description: "",
				price: "",
				durationDays: "",
				seats: "",
				images: [],
				category: "",
				location: { country: "", city: "", region: "" },
				tags: [],
				isInternational: false,
				availableDates: [{ startDate: "" }],
			});

			alert("Tour package created successfully!");
		} catch (error) {
			console.error(
				"Error creating package:",
				error.response ? error.response.data : error.message
			);
			alert("Failed to create tour package");
		}
	};

	return (
		<div className='container mx-auto px-8 py-8'>
			<div className='bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-xl shadow-lg mb-8'>
				<h1 className='text-4xl font-bold mb-4 tracking-tight'>Create Tour Package</h1>
				<p className='text-xl opacity-90'>Add exciting travel packages to your catalog with ease</p>
			</div>

			<div className='bg-white shadow-md rounded-lg p-6'>
				<form onSubmit={handleSubmit}>
					{/* Title Input */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Title *</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
							placeholder='Enter package title'
							required
						/>
					</div>

					{/* Description Input */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Description *</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							rows={4}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
							placeholder='Enter package description'
							required
						/>
					</div>

					{/* Price and Duration Row */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div>
							<label className='block text-gray-700 font-semibold mb-2'>Price *</label>
							<input
								type='number'
								name='price'
								value={formData.price}
								onChange={handleChange}
								min='0'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Enter package price'
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700 font-semibold mb-2'>Duration (Days) *</label>
							<input
								type='number'
								name='durationDays'
								value={formData.durationDays}
								onChange={handleChange}
								min='1'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Number of days'
								required
							/>
						</div>
					</div>

					{/* Seats and Category Row */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div>
							<label className='block text-gray-700 font-semibold mb-2'>Available Seats *</label>
							<input
								type='number'
								name='seats'
								value={formData.seats}
								onChange={handleChange}
								min='1'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Number of seats'
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700 font-semibold mb-2'>Category *</label>
							<select
								name='category'
								value={formData.category}
								onChange={handleChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								required
							>
								<option value=''>Select category</option>
								<option value='romantic'>Romantic</option>
								<option value='adventure'>Adventure</option>
								<option value='family'>Family</option>
								<option value='cultural'>Cultural</option>
								<option value='beach'>Beach</option>
								<option value='mountain'>Mountain</option>
								<option value='wildlife'>Wildlife</option>
								<option value='spiritual'>Spiritual</option>
							</select>
						</div>
					</div>

					{/* Location Section */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Location</label>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<input
								type='text'
								name='country'
								value={formData.location.country}
								onChange={handleLocationChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Country'
							/>
							<input
								type='text'
								name='city'
								value={formData.location.city}
								onChange={handleLocationChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='City'
							/>
							<input
								type='text'
								name='region'
								value={formData.location.region}
								onChange={handleLocationChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Region (e.g., Himalayas, Goa Beach)'
							/>
						</div>
					</div>

					{/* International Package Checkbox */}
					<div className='mb-4'>
						<label className='flex items-center space-x-2'>
							<input
								type='checkbox'
								name='isInternational'
								checked={formData.isInternational}
								onChange={handleChange}
								className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
							/>
							<span className='text-gray-700 font-semibold'>International Package</span>
						</label>
					</div>

					{/* Tags Section */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Tags</label>
						<div className='flex items-center space-x-2 mb-2'>
							<input
								type='text'
								value={currentTag}
								onChange={(e) => setCurrentTag(e.target.value)}
								onKeyPress={handleTagKeyPress}
								className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
								placeholder='Enter tag (e.g., honeymoon, trek, water sports)'
							/>
							<button
								type='button'
								onClick={addTag}
								className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
							>
								Add
							</button>
						</div>
						<div className='flex flex-wrap gap-2'>
							{formData.tags.map((tag, index) => (
								<span
									key={index}
									className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center space-x-1'
								>
									<span>{tag}</span>
									<button
										type='button'
										onClick={() => removeTag(tag)}
										className='text-blue-600 hover:text-blue-800 ml-1'
									>
										×
									</button>
								</span>
							))}
						</div>
					</div>

					{/* Multiple Images Upload */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Package Images *</label>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={(e) => setFormData({
								...formData,
								images: Array.from(e.target.files)  // converts FileList → Array<File>
							})}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
						/>
						{formData.images.length > 0 && (
							<div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-4'>
								{formData.images.map((image, index) => (
									<div key={index} className='relative'>
										<img src={image} alt={`Preview ${index + 1}`} className='w-full h-32 object-cover rounded-lg' />
										<button
											type='button'
											onClick={() => removeImage(index)}
											className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600'
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Available Dates */}
					<div className='mb-4'>
						<label className='block text-gray-700 font-semibold mb-2'>Available Start Dates *</label>
						{formData.availableDates.map((date, index) => (
							<div key={index} className='flex items-center gap-4 mb-2'>
								<div className='flex-1'>
									<input
										type='date'
										name='startDate'
										value={date.startDate}
										onChange={(e) => handleDateChange(index, e)}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
										required
									/>
								</div>
								{index > 0 && (
									<button
										type='button'
										onClick={() => removeDateRange(index)}
										className='text-red-600 font-semibold hover:underline px-2'
									>
										Remove
									</button>
								)}
							</div>
						))}
						<button
							type='button'
							onClick={addDateRange}
							className='text-blue-500 font-semibold hover:underline mt-2'
						>
							+ Add Another Start Date
						</button>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center mt-6'
					>
						Create Package
					</button>
				</form>
			</div>
		</div>
	);
};

export default TourPackageForm;