'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './List.module.css';
import TheatresSidebar from '../../../../components/Sidebar/TheatresSidebar'; // Adjust the path as needed

interface TheatreItem {
  _id: string;
  name: string;
  location: string;
  capacity: number;
}

const List: React.FC = () => {
  const [list, setList] = useState<TheatreItem[]>([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/theatre/list`); // Adjust endpoint as needed
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeTheatre = async (theatreId: string) => {
    try {
      const response = await axios.post(`${url}/api/theatre/remove`, { id: theatreId });
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
      <TheatresSidebar />
      <div className={styles.content}>
        <p className={styles.title}>All Theatres List</p>
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.titleRow}`}>
            <b>Name</b>
            <b>Location</b>
            <b>Capacity</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div key={item._id} className={styles.tableRow}>
              <p>{item.name}</p>
              <p>{item.location}</p>
              <p>{item.capacity}</p>
              <p className={styles.removeButton} onClick={() => removeTheatre(item._id)}>x</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
