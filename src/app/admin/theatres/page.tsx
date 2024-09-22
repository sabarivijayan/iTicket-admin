// src/app/theatres/page.tsx
"use client";

import React from "react";
import TheatresSidebar from "../../../components/Sidebar/TheatresSidebar";
import withAuth from "@/utils/withAuth";

const TheatresPage: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <TheatresSidebar />

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Theatres Management</h1>
        {/* Other page content goes here */}
      </div>
    </div>
  );
};

export default withAuth(TheatresPage);
