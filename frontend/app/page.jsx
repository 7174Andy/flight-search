"use client";

import { useRouter } from "next/navigation";
import style from "./home.module.css";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className={style.container}>
      <div className={style.topRight}>
        <button
          className={style.signInButton}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button className={style.signInButton}>Signup</button>
      </div>
      <h1 className={style.title}>Flight Search</h1>
      <input
        className={style.searchBar}
        type="text"
        placeholder="Enter departure"
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        className={style.searchBar}
        type="text"
        placeholder="Enter destination"
        onChange={(e) => setDestination(e.target.value)}
      />

      <button className={style.searchButton}>Search</button>
    </div>
  );
}
