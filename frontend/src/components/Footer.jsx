import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-black text-white mt-12 text-sm">
            {/* Top Contact Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 border-b border-gray-700">
                <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-400 mt-2">66 ABC Street, Pune, India</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-400 mt-2">+9112345XXXXX</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-400 mt-2">support@tripzy.com</p>
                </div>
            </div>

            {/* Middle Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
                {/* Logo + About */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">Tripzy</h2>
                    <p className="text-gray-400 text-sm">
                        Explore the world with us — your trusted travel partner.
                    </p>
                    {/* Socials */}
                    <div className="flex gap-3 mt-4">
                        <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-300">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-300">
                            <FaXTwitter />
                        </a>
                        <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-300">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="p-2 bg-white text-black rounded-full hover:bg-gray-300">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/tours">Tours</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Gallery (smaller) */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <img
                                key={i}
                                src="/LandingPhoto.jpg"
                                alt="Gallery"
                                className="rounded-lg object-cover"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} Tripzy. All Rights Reserved.
                <div className="mt-2 flex justify-center gap-6">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/legal">Legal</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
