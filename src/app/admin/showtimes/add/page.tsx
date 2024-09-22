"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Add.module.css";
import ShowtimeSidebar from "../../../../components/Sidebar/ShowtimesSidebar"; // Adjust the path as needed

const AddShowtimes: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const url = "http://localhost:4000";
  // Predefined screentimes matching the enum in the model
  const screentimes = [
    "9:30 AM",
    "12:30 PM",
    "3:30 PM",
    "7:00 PM",
    "10:30 PM",
    "12:30PM"
  ];

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTime) {
      toast.error("Please select a showtime");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/showtime/add`, {
        time: selectedTime, // Send the selected time as 'time'
      });

      if (response.data.success) {
        toast.success(`Showtime ${selectedTime} added successfully!`);
        setSelectedTime(""); // Reset after successful submission
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding showtime");
    }
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className={styles.container}>
      <ShowtimeSidebar />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.inputGroup}>
            <p>Select Showtime</p>
            <select
              name="showtime"
              value={selectedTime}
              onChange={onTimeChange}
              required
            >
              <option value="">Select a time</option>
              {screentimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Showtime
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShowtimes;
