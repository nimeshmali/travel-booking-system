import React, { useEffect, useState } from "react";
import packageService from "../api/services/packageService";
import Card from "./Card";
import { useAuth } from "../context/AuthContext";
import { FaFilter, FaSearch } from "react-icons/fa";

const PackagesList = () => {
	const { user } = useAuth();
	const [packages, setPackages] = useState([]);
	const [filteredPackages, setFilteredPackages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userSearch, setUserSearch] = useState("");

	// Filter states
	const [filters, setFilters] = useState({
		priceRange: [0, 100000],
		days: '',
		country: '',
		category: ''
	});

	// Filter options (you can populate these dynamically from your data)
	const [filterOptions, setFilterOptions] = useState({
		countries: [],
		categories: [],
		maxPrice: 100000,
		minPrice: 0
	});

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const packageList = await packageService.getAllPackages();
				setPackages(packageList);
				setFilteredPackages(packageList);

				// Extract unique values for filter options
				const countries = [...new Set(packageList.map(pkg => pkg.location?.country).filter(Boolean))];
				const categories = [...new Set(packageList.map(pkg => pkg.category).filter(Boolean))];
				const prices = packageList.map(pkg => pkg.price);

				setFilterOptions({
					countries,
					categories,
					maxPrice: Math.max(...prices),
					minPrice: Math.min(...prices)
				});

				setFilters(prev => ({
					...prev,
					priceRange: [Math.min(...prices), Math.max(...prices)]
				}));

				setIsLoading(false);
			} catch (error) {
				console.error("Error in useEffect:", error);
				setIsLoading(false);
			}
		};

		fetchPackages();
	}, []);

	useEffect(() => { handleSearch() }, [userSearch]);

	// Apply filters
	useEffect(() => {
		let filtered = [...packages];

		// Price filter
		filtered = filtered.filter(pkg =>
			pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
		);

		// Days filter
		if (filters.days) {
			filtered = filtered.filter(pkg => pkg.durationDays === parseInt(filters.days));
		}

		// Country filter
		if (filters.country) {
			filtered = filtered.filter(pkg => pkg.location?.country === filters.country);
		}

		// Category filter
		if (filters.category) {
			filtered = filtered.filter(pkg => pkg.category === filters.category);
		}

		setFilteredPackages(filtered);
	}, [filters, packages]);

	const handleSearch = async () => {
		try {
			if (userSearch.length !== 0) {
				// Filter packages that include the search Search in their title (case-insensitive)
				const searchResults = packages.filter(pkg =>
					pkg.title.toLowerCase().includes(userSearch.toLowerCase())
				);
				setFilteredPackages(searchResults);
			} else {
				setFilteredPackages(packages);
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleFilterChange = (filterType, value) => {
		setFilters(prev => ({
			...prev,
			[filterType]: value
		}));
	};

	const clearFilters = () => {
		setFilters({
			priceRange: [filterOptions.minPrice, filterOptions.maxPrice],
			days: '',
			country: '',
			category: ''
		});
	};

	return (
		<div className="min-h-screen">
			{/* Hero Image Section - 1/3 height */}
			<div className="relative h-80 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
				<img
					src="/beach2.jpg" // replace with your image
					alt="Travel"
					className="absolute inset-0 h-full w-full object-cover brightness-75"
				/>
				{/* Hero Content */}
				<div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
					<div>
						<h1 className="text-5xl font-bold mb-4">Tour List</h1>
						<div className="flex items-center justify-center space-x-2 text-lg">
							<span>Home</span>
							<span>»</span>
							<span>Tour List</span>
						</div>
					</div>
				</div>

				{/* Search Bar - Bottom Right */}
				<div className="absolute bottom-6 right-6 z-20">
					<div className="bg-black rounded-full shadow-lg p-1.5 max-w-xs">
						<div className="relative">
							<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
							<input
								type="text"
								value={userSearch}
								onChange={(e) => setUserSearch(e.target.value)}
								className="w-full pl-8 pr-3 py-1.5 text-sm rounded-full bg-black text-white border-none focus:outline-none focus:ring-0 placeholder-gray-400"
								placeholder="Search Tours"
							/>
						</div>
					</div>
				</div>


			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8 bg-white">
				<div className="flex flex-col lg:flex-row gap-8">

					{/* Filters Sidebar - 1/3 width */}
					<div className="lg:w-1/4">
						<div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
							{/* Filters Section */}
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-semibold text-gray-800 flex items-center">
										<FaFilter className="mr-2 text-blue-600" />
										Filters
									</h3>
									<button
										onClick={clearFilters}
										className="text-blue-600 hover:text-blue-800 text-sm font-medium"
									>
										Clear All
									</button>
								</div>

								{/* Price Range Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
									</label>
									<div className="space-y-2">
										<input
											type="range"
											min={filterOptions.minPrice}
											max={filterOptions.maxPrice}
											value={filters.priceRange[1]}
											onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
											className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
										/>
									</div>
								</div>

								{/* Days Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
									<select
										value={filters.days}
										onChange={(e) => handleFilterChange('days', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="">Any Duration</option>
										<option value="1">1 Day</option>
										<option value="2">2 Days</option>
										<option value="3">3 Days</option>
										<option value="4">4 Days</option>
										<option value="5">5 Days</option>
										<option value="7">1 Week</option>
										<option value="14">2 Weeks</option>
									</select>
								</div>

								{/* Country Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
									<select
										value={filters.country}
										onChange={(e) => handleFilterChange('country', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="">All Countries</option>
										{filterOptions.countries.map((country) => (
											<option key={country} value={country}>{country}</option>
										))}
									</select>
								</div>

								{/* Category Filter */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
									<select
										value={filters.category}
										onChange={(e) => handleFilterChange('category', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="">All Categories</option>
										{filterOptions.categories.map((category) => (
											<option key={category} value={category}>{category}</option>
										))}
									</select>
								</div>

								{/* Results Count */}
								<div className="pt-4 border-t border-gray-200">
									<p className="text-sm text-gray-600">
										Showing {filteredPackages.length} of {packages.length} packages
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Packages Grid - 2/3 width */}
					<div className="lg:w-3/4">
						<div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
							{isLoading ? (
								// Loading State
								Array.from({ length: 6 }).map((_, index) => (
									<div key={index} className="bg-gray-100 animate-pulse rounded-xl h-96"></div>
								))
							) : filteredPackages.length > 0 ? (
								// Packages Render
								filteredPackages.map((pkg) => (
									<Card key={pkg._id} packageData={pkg} />
								))
							) : (
								// Empty State
								<div className="col-span-full text-center py-12">
									<div className="text-gray-400 mb-4">
										<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
										</svg>
									</div>
									<h2 className="text-2xl text-gray-500 mb-4">No packages found</h2>
									<p className="text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
									<button
										onClick={clearFilters}
										className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									>
										Clear Filters
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PackagesList;