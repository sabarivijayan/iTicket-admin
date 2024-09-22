"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const TheatresSidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarOptions}>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/theatres/add")}
        >
          Add Theatres
        </button>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/theatres/list")}
        >
          List Theatres
        </button>
      </div>
    </div>
  );
};

export default TheatresSidebar;
