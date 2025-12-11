import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import packageService from "../../api/services/packageService";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const sessionId = useMemo(() => searchParams.get("session_id"), [searchParams]);
	const [status, setStatus] = useState({
		loading: true,
		error: "",
		booking: null,
		paymentStatus: "",
	});

	useEffect(() => {
		const fetchStatus = async () => {
			if (!sessionId) {
				setStatus({ loading: false, error: "Missing payment session.", booking: null, paymentStatus: "" });
				return;
			}

			try {
				const response = await packageService.getPaymentSessionStatus(sessionId);
				setStatus({
					loading: false,
					error: "",
					booking: response.booking,
					paymentStatus: response.paymentStatus,
				});

				// Redirect to profile after short delay
				setTimeout(() => navigate("/profile"), 3000);
			} catch (error) {
				const message = error.response?.data?.message || "Unable to verify payment. Please contact support.";
				setStatus({ loading: false, error: message, booking: null, paymentStatus: "" });
			}
		};

		fetchStatus();
	}, [navigate, sessionId]);

	return (
		<div className="max-w-3xl mx-auto py-16 px-6">
			<div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 text-center">
				<div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>

				<h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
				<p className="text-gray-600 mb-4">Thank you! Your payment has been confirmed.</p>

				{status.loading && <p className="text-gray-500">Finalizing your booking...</p>}

				{status.error && <p className="text-red-500 font-medium">{status.error}</p>}

				{!status.loading && !status.error && status.booking && (
					<div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 text-left">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
							<div>
								<p className="font-medium text-gray-900">Package</p>
								<p>{status.booking.packageName}</p>
							</div>
							<div>
								<p className="font-medium text-gray-900">Payment Status</p>
								<p className="capitalize">{status.paymentStatus || "paid"}</p>
							</div>
							<div>
								<p className="font-medium text-gray-900">Travel Date</p>
								<p>{new Date(status.booking.bookingDate).toLocaleDateString()}</p>
							</div>
							<div>
								<p className="font-medium text-gray-900">Amount Paid</p>
								<p>
									{status.booking.currency?.toUpperCase()} {status.booking.amountPaid?.toLocaleString()}
								</p>
							</div>
						</div>
					</div>
				)}

				<p className="text-gray-500 text-sm mt-6">Redirecting you to your profile...</p>
				<button
					type="button"
					onClick={() => navigate("/profile")}
					className="mt-4 inline-flex items-center px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
				>
					Go to Profile now
				</button>
			</div>
		</div>
	);
};

export default PaymentSuccess;

