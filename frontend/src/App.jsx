import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import PackagesList from "./components/PackageList";
import DeletePackage from "./components/DeletePackage";
import TourPackageForm from "./components/TourPackageForm";
import Layout from "./components/Layout"; // ✅ import layout
import Agents from "./components/Agents";
import PackageDetails from "./components/PackageDetails";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Routes without Navbar & Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Routes with Navbar & Footer */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/tours"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PackagesList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <Layout>
                  <Agents />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/package/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PackageDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-packages"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Layout>
                    <DeletePackage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-packages"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Layout>
                    <TourPackageForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
