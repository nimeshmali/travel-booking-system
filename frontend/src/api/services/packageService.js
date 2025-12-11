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

const createCheckoutSession = async (packageId, formData) => {
	try {
		const response = await axiosClient.post(endpoints.CREATE_CHECKOUT_SESSION(packageId), formData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getPaymentSessionStatus = async (sessionId) => {
	try {
		const response = await axiosClient.get(endpoints.PAYMENT_SESSION_STATUS(sessionId));
		return response.data;
	} catch (error) {
		throw error;
	}
};
const createPackage = async (packageData) => {
	try {
		const response = await axiosClient.post(endpoints.CREATE_PACKAGE(), packageData);
		return response.data;
	} catch (error) {
		throw error;
	}

};

const suggestPackage = async (query) => {
	try {
		const response = await axiosClient.post(endpoints.SUGGEST_PACKAGE(), { query: query });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export default {
	getPackageDetails,
	bookPackage,
	getAllPackages,
	deletePackage,
	createPackage,
	suggestPackage,
	createCheckoutSession,
	getPaymentSessionStatus,
};
