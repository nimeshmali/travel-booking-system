import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserCircle2Icon, LogOut } from "lucide-react"; // ✅ Added logout icon
import { useAuth } from "../context/AuthContext";
import { GiStripedSun } from "react-icons/gi";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, logout } = useAuth();

	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	if (isAuthPage) return null;

	// scroll to About Us section
	const handleScrollToAbout = (e) => {
		e.preventDefault();
		if (location.pathname !== "/") {
			navigate("/", { state: { scrollTo: "about" } });
		} else {
			const aboutSection = document.getElementById("about");
			if (aboutSection) {
				aboutSection.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-2/3 z-50">
			<div className="bg-black text-white rounded-full px-6 py-3 flex items-center justify-between shadow-lg">

				{/* Left: Logo */}
				<Link to="/" className="flex items-center space-x-2">
					<GiStripedSun className="text-2xl" />
					<span className="text-xl font-bold">Tripzy</span>
				</Link>

				{/* Center: Navigation Links */}
				<div className="flex space-x-6 font-small">
					<Link to="/" className="hover:text-primary-400 transition">
						Home
					</Link>
					<a
						href="#about"
						onClick={handleScrollToAbout}
						className="hover:text-primary-400 transition"
					>
						About Us
					</a>
					<Link to="/tours" className="hover:text-primary-400 transition">
						Tours
					</Link>
					<Link to="/agents" className="hover:text-primary-400 transition">
						Agents
					</Link>
				</div>

				{/* Right: Login or User */}
				<div className="flex items-center space-x-4">
					{!isAuthenticated ? (
						<button
							onClick={() => navigate("/login")}
							className="px-5 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
						>
							Login
						</button>
					) : (
						<>
							<UserCircle2Icon
								className="h-6 w-6 cursor-pointer hover:text-primary-400 transition"
								onClick={() => navigate("/profile")}
							/>
							<LogOut
								className="h-6 w-6 cursor-pointer hover:text-primary-400 transition"
								onClick={handleLogout}
							/>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
