import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const packageId = searchParams.get("packageId");

	return (
		<div className="max-w-3xl mx-auto py-16 px-6">
			<div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 text-center">
				<div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto mb-6">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>

				<h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
				<p className="text-gray-600 mb-6">Your payment was not completed. You can try again anytime.</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button
						type="button"
						onClick={() => navigate(packageId ? `/package/${packageId}` : "/tours")}
						className="inline-flex items-center px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
					>
						Return to package
					</button>
					<button
						type="button"
						onClick={() => navigate("/profile")}
						className="inline-flex items-center px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
					>
						Go to profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentCancel;

