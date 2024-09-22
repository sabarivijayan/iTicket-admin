// src/app/movies/page.tsx
"use client";

import React from "react";
import MoviesSidebar from "../../../components/Sidebar/MoviesSidebar";
import withAuth from "@/utils/withAuth";

const MoviesPage: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <MoviesSidebar />

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Movies Management</h1>
        {/* Other page content goes here */}
      </div>
    </div>
  );
};

export default withAuth(MoviesPage);
