'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { ShowWithDetails } from '../types/types';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [shows, setShows] = useState<ShowWithDetails[]>([]);
  const router = useRouter();
  const url = 'http://localhost:4000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const fetchShows = async () => {
    try {
      const response = await axios.get(`${url}/api/show/list`);
      if (response.data.success) {
        setShows(response.data.data);
      } else {
        toast.error('Error fetching shows');
      }
    } catch (error) {
      toast.error('Error fetching shows');
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Shows</h1>
      <div className={styles.cardGrid}>
        {shows.map((show) => (
          <div key={show._id} className={styles.card}>
            {/* Image Component */}
            <Image
              src={`${url}/images/${show.movie.posterImg}`} // Ensure this points to the correct image URL
              alt={show.movie.title}
              width={200}
              height={300}
              className={styles.image}
              unoptimized // Use this to bypass optimization for external images
            />

            <div className={styles.cardContent}>
              <h2>{show.movie.title}</h2>
              <p><strong>Genre:</strong> {show.movie.genre?.join(', ')}</p>
              <p><strong>Rating:</strong> {show.movie.rating}/10</p>
              <p><strong>Description:</strong> {show.movie.description}</p>
              <p><strong>Duration:</strong> {show.movie.duration} min</p>

              <p><strong>Theatres:</strong></p>
              <ul>
                {show.theatres.map((theatre) => (
                  <li key={theatre._id}>
                    <strong>Name:</strong> {theatre.name} <br />
                    <strong>Location:</strong> {theatre.location || 'N/A'}
                  </li>
                ))}
              </ul>

              <p><strong>Dates:</strong></p>
              <ul>
                {show.dates.map((date, index) => (
                  <li key={index}>
                    {new Date(date).toLocaleDateString()}
                  </li>
                ))}
              </ul>

              <p><strong>Showtimes:</strong></p>
              <ul>
                {show.showtimes.map((showtime) => (
                  <li key={showtime._id}>{showtime.time}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
