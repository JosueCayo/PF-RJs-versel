// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-5 pb-5 min-vh-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}