import React from "react";
import { useLocation, Link } from "react-router-dom";
import s from "./SearchParams.module.scss";
import HomeIcon from "@mui/icons-material/Home";

const SearchParams = () => {
  const location = useLocation();

  // Проверяем, что location и location.pathname доступны
  if (!location || !location.pathname) {
    return null; // или отобразить сообщение об ошибке
  }
  console.log("hello world");
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className={s.container}>
      <Link className={s.linkParams} to="/">
        <HomeIcon />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(1, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        console.log("isLastUrlName:", isLast);
        return isLast ? (
          <span className={s.params} key={name}>
            {" "}
            / {name}
          </span>
        ) : (
          <Link className={s.params} key={name} to={routeTo}>
            {" "}
            / {name}
          </Link>
        );
      })}
    </div>
  );
};

export default SearchParams;
