"use client";
import { useState } from "react";

import style from "./loigin.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <div className={style.inputContainer}>
        <input type="text" placeholder="Username" className={style.username} />
        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={style.password}
          />
          <span
            className={style.icon}
            onClick={toggleShowPassword}
            role="button"
            tabIndex="0"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
      </div>
      <button className={style.loginButton}>Login</button>
    </div>
  );
}
