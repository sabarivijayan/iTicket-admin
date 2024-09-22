"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa"; // For the user icon

const Navbar: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // For dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Handle login state
  const router = useRouter(); // Next.js navigation

  useEffect(() => {
    // Check if the user is logged in by checking for the token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push("/admin/login"); // Redirect to login if not logged in
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the token and session data
    localStorage.removeItem("token"); // Example token removal logic
    sessionStorage.clear(); // Clear session data if necessary
    setIsLoggedIn(false); // Set login state to false
    router.push("/admin/login"); // Redirect to login page after logout
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        {/* Admin Panel logo redirects to the main page */}
        <h2
          onClick={() => router.push("/")}
          className={styles.clickableLogo}
        >
          Admin Panel
        </h2>
      </div>
      <div className={styles.navItems}>
        <button
          onClick={() => router.push("/admin/movies")}
          className={styles.navLink}
        >
          Movies
        </button>
        <button
          onClick={() => router.push("/admin/theatres")}
          className={styles.navLink}
        >
          Theatres
        </button>
        <button
          onClick={() => router.push("/admin/showtimes")}
          className={styles.navLink}
        >
          Showtimes
        </button>
        <button
          onClick={() => router.push("/admin/shows")}
          className={styles.navLink}
        >
          Shows
        </button>
        <button
          onClick={() => router.push("/admin/bookings")}
          className={styles.navLink}
        >
          Bookings
        </button>
      </div>
      {isLoggedIn && (
        <div className={styles.userIcon} onClick={toggleDropdown}>
          <FaUserCircle size={30} />
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <button onClick={handleLogout} className={styles.logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
