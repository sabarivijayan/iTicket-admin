"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Add.module.css";
import Image from "next/image";
import MoviesSidebar from "../../../../components/Sidebar/MoviesSidebar";
const Add = () => {
    const url = "http://localhost:4000";
  const [posterImg, setPosterImg] = useState<File | null>(null);
  const [backdropImg, setBackdropImg] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    rating: "1",
    genre: "",
    duration: "",
  });

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!posterImg || !backdropImg) {
      toast.error("Both poster and backdrop images must be selected");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("rating", data.rating);
    formData.append("genre", data.genre);
    formData.append("duration", data.duration);
    formData.append("posterImg", posterImg);
    formData.append("backdropImg", backdropImg);

    try {
      const response = await axios.post(
        `${url}/api/movie/add`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          title: "",
          description: "",
          rating: "1",
          genre: "",
          duration: "",
        });
        setPosterImg(null);
        setBackdropImg(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the movie");
    }
  };

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <MoviesSidebar />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.imageUpload}> 
            <p>Upload Poster Image</p>
            <input
              type="file"
              accept="image/*"
              id="posterImg"
              hidden
              onChange={(e) =>
                setPosterImg(e.target.files ? e.target.files[0] : null)
              }
            />
            <label htmlFor="posterImg" className={styles.uploadLabel}>
              {posterImg ? (
                <Image
                  src={URL.createObjectURL(posterImg)}
                  alt="Poster Preview"
                  width={120}
                  height={120}
                  className={styles.previewImage}
                />
              ) : (
                "Choose Poster Image"
              )}
            </label>
          </div>
          <div className={styles.imageUpload}>
            <p>Upload Backdrop Image</p>
            <input
              type="file"
              accept="image/*"
              id="backdropImg"
              hidden
              onChange={(e) =>
                setBackdropImg(e.target.files ? e.target.files[0] : null)
              }
            />
            <label htmlFor="backdropImg" className={styles.uploadLabel}>
              {backdropImg ? (
                <Image
                  src={URL.createObjectURL(backdropImg)}
                  alt="Backdrop Preview"
                  width={120}
                  height={120}
                  className={styles.previewImage}
                />
              ) : (
                "Choose Backdrop Image"
              )}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <p>Title</p>
            <input
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              type="text"
              placeholder="Enter movie title"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <p>Description</p>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows={4}
              placeholder="Enter movie description"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <p>Rating</p>
            <select
              name="rating"
              value={data.rating}
              onChange={onChangeHandler}
              required
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <p>Genre(s)</p>
            <input
              name="genre"
              value={data.genre}
              onChange={onChangeHandler}
              type="text"
              placeholder="Enter genres separated by commas (e.g., Action, Comedy)"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <p>Duration (minutes)</p>
            <input
              name="duration"
              value={data.duration}
              onChange={onChangeHandler}
              type="number"
              placeholder="Enter duration in minutes"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
