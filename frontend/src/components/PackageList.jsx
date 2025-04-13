import React, { useEffect, useState } from "react";
import packageService from "../api/services/packageService";
import Card from "./Card";

const PackagesList = () => {
	const [packages, setPackages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	console.log("packags", packages);
	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const packageList = await packageService.getAllPackages();
				setPackages(packageList);
				setIsLoading(false);
			} catch (error) {
				console.error("Error in useEffect:", error);
				setIsLoading(false);
			}
		};

		fetchPackages();
	}, []);

	return (
		<div className='container mx-auto px-8 py-8'>
			{/* Hero Section */}
			<div className='mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12 rounded-xl shadow-lg'>
				<h1 className='text-4xl font-bold mb-4 tracking-tight'>Discover Your Next Adventure</h1>
				<p className='text-xl max-w-2xl mx-auto opacity-90'>
					Explore handpicked travel experiences that promise unforgettable memories and breathtaking journeys across the globe
				</p>
			</div>

			{/* Packages Grid */}
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{isLoading ? (
					// Loading State
					Array.from({ length: 6 }).map((_, index) => <div key={index} className='bg-gray-100 animate-pulse rounded-xl h-80'></div>)
				) : packages.length > 0 ? (
					// Packages Render
					packages.map((pkg) => <Card key={pkg._id} packageData={pkg} />)
				) : (
					// Empty State
					<div className='col-span-full text-center py-12'>
						<h2 className='text-2xl text-gray-500 mb-4'>No packages available</h2>
						<p className='text-gray-400'>Check back later for exciting new travel opportunities</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PackagesList;
