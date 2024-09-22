"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const ShowsSidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarOptions}>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/shows/add")}
        >
          Add Shows
        </button>
        <button
          className={styles.sidebarOption}
          onClick={() => router.push("/admin/shows/list")}
        >
          List Shows
        </button>
      </div>
    </div>
  );
};

export default ShowsSidebar;
