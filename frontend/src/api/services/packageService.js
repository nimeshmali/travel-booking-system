// src/api/services/packageService.js
import axiosClient from "../axiosClient";
import endpoints from "../endPoint";

const getPackageDetails = async (packageId) => {
	try {
		const response = await axiosClient.get(endpoints.GET_PACKAGE_DETAILS(packageId));
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getAllPackages = async () => {
	try {
		const response = await axiosClient.get(endpoints.GET_ALL_PACKAGES());
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deletePackage = async (packageId) => {
	try {
		const response = await axiosClient.delete(endpoints.DELETE_PACKAGE(packageId));
		console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
};
const bookPackage = async (packageId, formData) => {
	try {
		const response = await axiosClient.post(endpoints.BOOK_PACKAGE(packageId), formData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export default { getPackageDetails, bookPackage, getAllPackages, deletePackage };
