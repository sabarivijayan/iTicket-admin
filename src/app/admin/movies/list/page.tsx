'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './List.module.css';
import Image from 'next/image';
import MoviesSidebar from '../../../../components/Sidebar/MoviesSidebar'; // Adjust the path as needed

interface MovieItem {
  _id: string;
  title: string;
  description: string;
  posterImg: string;
  backdropImg: string;
  rating: number;
  genre: string;
  duration: number;
}

const List: React.FC = () => {
  const [list, setList] = useState<MovieItem[]>([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/movie/list`); // Adjust endpoint as needed
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeMovie = async (movieId: string) => {
    try {
      const response = await axios.post(`${url}/api/movie/remove`, { id: movieId });
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
        <p className={styles.title}>All Movies List</p>
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.titleRow}`}>
            <b>Poster</b>
            <b>Backdrop</b>
            <b>Title</b>
            <b>Description</b>
            <b>Genre</b>
            <b>Rating</b>
            <b>Duration</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div key={item._id} className={styles.tableRow}>
              <Image
                src={`${url}/images/${item.posterImg}`}
                alt={item.title}
                width={50}
                height={75}
                className={styles.image}
              />
              <Image
                src={`${url}/images/${item.backdropImg}`}
                alt={item.title}
                width={100}
                height={50}
                className={styles.image}
              />
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.genre}</p>
              <p>{item.rating}</p>
              <p>{item.duration} min</p>
              <p className={styles.removeButton} onClick={() => removeMovie(item._id)}>x</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
