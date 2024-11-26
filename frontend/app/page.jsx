"use client";

import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function Page() {
  const router = useRouter();

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
        placeholder="Enter destination"
      />
      <button className={style.searchButton}>Search</button>
    </div>
  );
}
