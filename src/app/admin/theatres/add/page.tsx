"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Add.module.css";
import MoviesSidebar from "../../../../components/Sidebar/TheatresSidebar"; // You can create a similar sidebar for theatres if needed

const AddTheatre = () => {
  const url = "http://localhost:4000";
  const [data, setData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!data.name || !data.location || !data.capacity) {
      toast.error("All fields must be filled out.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/theatre/add`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          location: "",
          capacity: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the theatre.");
    }
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <MoviesSidebar /> {/* Replace with TheatreSidebar if you create one */}
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.inputGroup}>
            <p>Theatre Name</p>
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Enter theatre name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <p>Location</p>
            <input
              name="location"
              value={data.location}
              onChange={onChangeHandler}
              type="text"
              placeholder="Enter theatre location"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <p>Seating Capacity</p>
            <input
              name="capacity"
              value={data.capacity}
              onChange={onChangeHandler}
              type="number"
              placeholder="Enter seating capacity"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Theatre
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTheatre;
