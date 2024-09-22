// src/app/shows/page.tsx
"use client";

import React from "react";
import ShowsSidebar from "../../../components/Sidebar/ShowtimesSidebar";
import withAuth from "@/utils/withAuth";

const ShowsPage: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <ShowsSidebar />

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Shows Management</h1>
        {/* Other page content goes here */}
      </div>
    </div>
  );
};

export default withAuth(ShowsPage);
