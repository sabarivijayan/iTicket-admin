'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './List.module.css';
import MoviesSidebar from '../../../../components/Sidebar/ShowtimesSidebar'; // Adjust the path as needed

interface ShowtimeItem {
  _id: string;
  time: string;
}

const List: React.FC = () => {
  const [list, setList] = useState<ShowtimeItem[]>([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/showtime/list`); // Adjust endpoint as needed
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeShowtime = async (showtimeId: string) => {
    try {
      const response = await axios.post(`${url}/api/showtime/remove`, { id: showtimeId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error('Error removing item');
      }
    } catch (error) {
      toast.error('Error removing item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className={styles.container}>
      <MoviesSidebar />
      <div className={styles.content}>
        <p className={styles.title}>All Showtime List</p>
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.titleRow}`}>
            <b>Time</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div key={item._id} className={styles.tableRow}>
              <p>{item.time}</p>
              <p className={styles.removeButton} onClick={() => removeShowtime(item._id)}>x</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
