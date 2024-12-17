import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PackagesList from "./components/PackageList";
import BookingForm from "./components/BookingForm";
import Login from "./components/Login";
import TourPackageForm from "./components/TourPackageForm";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <PackagesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <BookingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-packages"
            element={
              <ProtectedRoute adminOnly={true}>
                <Navbar />
                <TourPackageForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
