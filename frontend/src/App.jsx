import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageGallery from "./components/ImageGallery";
import InputSubmit from "./components/InputSubmit";
import PackagesList from "./components/PackageList";
import TourPackageForm from "./components/TourPackageForm";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PackagesList />
              </>
            }
          />
          <Route path="/booking/:id" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
