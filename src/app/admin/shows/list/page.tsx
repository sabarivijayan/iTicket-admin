"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./List.module.css";
import ShowsSidebar from "../../../../components/Sidebar/ShowsSidebar";
import { Show } from "../../../../types/types";

const ListShows: React.FC = () => {
  const [list, setList] = useState<Show[]>([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/show/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const removeShow = async (showId: string) => {
    try {
      const response = await axios.post(`${url}/api/show/remove`, { id: showId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className={styles.container}>
      <ShowsSidebar />
      <div className={styles.content}>
        <p className={styles.title}>All Shows List</p>
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.titleRow}`}>
            <b>Movie Title</b>
            <b>Theatres</b>
            <b>Showtimes</b>
            <b>Dates</b>
            <b>Action</b>
          </div>

          {list.map((item) => (
            <div key={item._id} className={styles.tableRow}>
              <p>{item.movie?.title}</p>
              <p>
                {item.theatres.map((theatre) => (
                  <span key={theatre._id} className={styles.theatre}>
                    {theatre.name}
                  </span>
                ))}
              </p>
              <p>
                {item.showtimes.map((showtime) => (
                  <span key={showtime._id} className={styles.showtime}>
                    {showtime.time}
                  </span>
                ))}
              </p>
              <p>
                {item.dates.map((date, index) => (
                  <span key={index} className={styles.date}>
                    {new Date(date).toLocaleDateString()}
                  </span>
                ))}
              </p>
              <p className={styles.removeButton} onClick={() => removeShow(item._id)}>
                x
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListShows;
