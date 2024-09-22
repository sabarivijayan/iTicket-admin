'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './Add.module.css';
import { Movie, Theatre, Showtime } from '../../../../types/types';
import ShowsSidebar from '../../../../components/Sidebar/ShowsSidebar'; // Importing the sidebar

const AddShow: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [selectedTheatres, setSelectedTheatres] = useState<string[]>([]); // Array for multiple theatres
  const [selectedShowtimes, setSelectedShowtimes] = useState<string[]>([]); // Array for multiple showtimes
  const [selectedDates, setSelectedDates] = useState<string[]>(['']); // Array for multiple dates, starting with one field

  const url = 'http://localhost:4000';

  // Fetch movies, theatres, and showtimes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, theatresRes, showtimesRes] = await Promise.all([
          axios.get(`${url}/api/movie/list`),
          axios.get(`${url}/api/theatre/list`),
          axios.get(`${url}/api/showtime/list`)
        ]);
        setMovies(moviesRes.data.data);
        setTheatres(theatresRes.data.data);
        setShowtimes(showtimesRes.data.data);
      } catch (error) {
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/show/add`, {
        movieId: selectedMovie, // The movie ID
        theatreIds: selectedTheatres, // Array of theater IDs
        showtimeIds: selectedShowtimes, // Array of showtime IDs
        dates: selectedDates // Array of selected dates
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields after success
        setSelectedMovie('');
        setSelectedTheatres([]);
        setSelectedShowtimes([]);
        setSelectedDates(['']);
      } else {
        toast.error('Error adding show');
      }
    } catch (error) {
      toast.error('Error adding show');
    }
  };

  // Handle multiple theater selection
  const handleTheatreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theatreId = e.target.value;
    if (e.target.checked) {
      setSelectedTheatres([...selectedTheatres, theatreId]); // Add selected theatre
    } else {
      setSelectedTheatres(selectedTheatres.filter(id => id !== theatreId)); // Remove unselected theatre
    }
  };

  // Handle multiple showtime selection
  const handleShowtimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const showtimeId = e.target.value;
    if (e.target.checked) {
      setSelectedShowtimes([...selectedShowtimes, showtimeId]); // Add selected showtime
    } else {
      setSelectedShowtimes(selectedShowtimes.filter(id => id !== showtimeId)); // Remove unselected showtime
    }
  };

  // Handle multiple date selection
  const handleDateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newDates = [...selectedDates];
    newDates[index] = e.target.value;
    setSelectedDates(newDates);
  };

  // Add a new date input field
  const addDateField = () => {
    setSelectedDates([...selectedDates, '']);
  };

  // Remove a date input field
  const removeDateField = (index: number) => {
    const newDates = selectedDates.filter((_, i) => i !== index);
    setSelectedDates(newDates);
  };

  return (
    <div className={styles.pageContainer}>
      <ShowsSidebar /> {/* Adding the sidebar here */}
      <div className={styles.mainContent}>
        <p className={styles.title}>Add Show</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="movie" className={styles.label}>Movie</label>
            <select
              id="movie"
              className={styles.select}
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Theatres</label>
            <div className={styles.checkboxOptions}>
              {theatres.map((theatre) => (
                <label key={theatre._id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={theatre._id}
                    checked={selectedTheatres.includes(theatre._id)}
                    onChange={handleTheatreChange}
                  />
                  {theatre.name}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Showtimes</label>
            <div className={styles.checkboxOptions}>
              {showtimes.map((showtime) => (
                <label key={showtime._id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={showtime._id}
                    checked={selectedShowtimes.includes(showtime._id)}
                    onChange={handleShowtimeChange}
                  />
                  {showtime.time}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Dates</label>
            {selectedDates.map((date, index) => (
              <div key={index} className={styles.dateField}>
                <input
                  type="date"
                  className={styles.input}
                  value={date}
                  onChange={(e) => handleDateChange(index, e)}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeDateField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={addDateField}
            >
              Add Date
            </button>
          </div>

          <button type="submit" className={styles.submitButton}>Add Show</button>
        </form>
      </div>
    </div>
  );
};

export default AddShow;
