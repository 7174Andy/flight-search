import style from "./page.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.topRight}>
        <button className={style.signInButton}>Login</button>
        <button className={style.signInButton}>Signup</button>
      </div>
      <h1>Flight Search</h1>
      <input
        className={style.searchBar}
        type="text"
        placeholder="Enter destination"
      />
      <button className={style.searchButton}>Search</button>
    </div>
  );
}
