import React from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import LazyFooter from "./LazyFooter";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Chatbot />
            <LazyFooter />
        </div>
    );
};

export default Layout;
