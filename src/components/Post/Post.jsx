import s from "./Post.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../redux/slice/post";
import { postPoster } from "../../redux/slice/post";

const Post = ({ category, subCategory }) => {
  const dispatch = useDispatch();
  const posts = useSelector(postPoster); // Directly use the selector

  useEffect(() => {
    const params = {};
    if (category) params.mainCategory = category;
    if (subCategory) params.subCategory = subCategory;

    dispatch(fetchPosts(params || {}));
  }, [dispatch, category, subCategory]);

  // Проверка, что posts не undefined и не пустой массив
  if (!posts || posts.length === 0) {
    return <div>Loading posts...</div>; // Или любое другое сообщение о загрузке
  }

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div className={s.card} key={post._id}>
            <img
              src={post.photo[0]}
              alt={post.title}
              className={s.card_image}
            />
            <div className={s.card_content}>
              <Link
                to={`/posts/${post._id}`}
                className={s.card_title}
                title={post.title}
              >
                {post.title}
              </Link>
              <p className={s.card_price}>{post.price} и грн</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Post;
