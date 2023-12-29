import s from "./Home.module.scss";
import * as React from "react";
import Post from "../../components/Post/Post";
import LeftNavBar from "../../components/LeftNavBar/LeftNavBar";
import { useParams } from "react-router-dom";

const Home = () => {
  const { category, subCategory } = useParams();

  return (
    <div className={s.homeContainer}>
      <LeftNavBar />
      <div className={s.container}>
        <Post category={category} subCategory={subCategory} />
      </div>
    </div>
  );
};

export default Home;
