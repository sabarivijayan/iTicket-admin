"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const ShowtimesSidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarOptions}>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/showtimes/add")}
        >
          Add Showtimes & Dates
        </button>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/showtimes/list")}
        >
          List Showtimes & Dates
        </button>
      </div>
    </div>
  );
};

export default ShowtimesSidebar;
