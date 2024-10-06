// /app/bookings/page.tsx
import BookingCard from '@/components/bookings-card/booking-card';
import styles from './bookings.module.css';

interface Booking {
  movieName: string;
  theatreName: string;
  showtime: string;
  date: string;
  bookedSeats: string[];
  totalPrice: number;
  paymentStatus: string;
}

async function getBookings(): Promise<Booking[]> {
  const res = await fetch('http://localhost:4000/api/booking/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Fetch fresh data on each request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const data = await res.json();
  return data.data; // Assuming `data` contains a `data` field with the list of bookings
}

const BookingListPage = async () => {
  const bookings = await getBookings();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Bookings</h1>
      <div className={styles.grid}>
        {bookings.map((booking, index) => (
          <BookingCard
            key={index}
            movieName={booking.movieName}
            theatreName={booking.theatreName}
            showtime={booking.showtime}
            date={booking.date}
            bookedSeats={booking.bookedSeats}
            totalPrice={booking.totalPrice}
            paymentStatus={booking.paymentStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingListPage;
