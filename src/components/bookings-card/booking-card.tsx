// /app/components/BookingCard.tsx
import React from 'react';
import styles from './booking-card.module.css';

interface Booking {
  movieName: string;
  theatreName: string;
  showtime: string;
  date: string;
  bookedSeats: string[];
  totalPrice: number;
  paymentStatus: string;
}

const BookingCard: React.FC<Booking> = ({ 
  movieName, 
  theatreName, 
  showtime, 
  date, 
  bookedSeats, 
  totalPrice, 
  paymentStatus 
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.movieName}>{movieName}</h2>
      <p className={styles.theatreName}>{theatreName}</p>
      <p className={styles.details}>{new Date(date).toLocaleDateString()} at {showtime}</p>
      <p className={styles.details}>Seats: {bookedSeats.join(', ')}</p>
      <p className={`${styles.details} ${styles.totalPrice}`}>Total Price: ₹{totalPrice}</p>
      <p className={`${styles.paymentStatus} ${paymentStatus === 'confirmed' ? styles.confirmed : styles.failed}`}>
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </p>
    </div>
  );
};

export default BookingCard;
