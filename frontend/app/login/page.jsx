import style from "./loigin.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <div className={style.inputContainer}>
        <input type="text" placeholder="Username" className={style.username} />
        <input
          type="password"
          placeholder="Password"
          className={style.password}
        />
      </div>
      <button className={style.loginButton}>Login</button>
    </div>
  );
}
