"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const MoviesSidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarOptions}>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/movies/add")}
        >
          Add Movies
        </button>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/movies/list")}
        >
          List Movies
        </button>
      </div>
    </div>
  );
};

export default MoviesSidebar;
