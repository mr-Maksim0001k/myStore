import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./FullPost.module.scss";
import RatingStars from "../RatingStars/RatingStars";
import { Button } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import InputRadio from "../InputRadio/InputRadio";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import {
  selectUsername,
  selectAvatar,
  selectUserId,
} from "../../redux/slice/auth";

import {
  fetchPosts,
  fetchComments,
  removeComments,
  addComment,
  postComments as selectPostComments,
} from "../../redux/slice/post";
import { selectIsAuthFullPost } from "../../redux/slice/auth";

const FullPost = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(""); // Добавлено состояние для отслеживания выбранной категории
  const { id } = useParams();
  const userName = useSelector(selectUsername);
  const userAvatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const fetchedComments = useSelector(selectPostComments);
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
        alert("Помилка отримування товару");
      }
    };

    fetchData();
    dispatch(fetchPosts());
    dispatch(fetchComments(id))
      .then((comments) => {
        console.log("Данные комментариев:", comments);
      })
      .catch((error) => {
        console.error("Ошибка при получении комментариев:", error);
      });
  }, [dispatch, id]);

  const handleThumbnailClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Отправка комментария:", {
        postId: id,
        text: comment,
        username: userName,
        useravatar: userAvatar,
      });
      await dispatch(
        addComment({
          postId: id,
          text: comment,
          username: userName,
          useravatar: userAvatar,
        })
      );
      setComment("");
      setIsFormSubmitted(true);
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      alert("Помилка додавання коментаря");
    }
  };

  const removeComment = (postId, commentId) => {
    if (
      commentId !== undefined &&
      window.confirm("Вы действительно хотите удалить комментарий?")
    ) {
      dispatch(
        removeComments({
          postId,
          commentId: commentId.toString(),
          userId,
        })
      );
      console.log("user iD", userId);
    }
  };

  const handleInputRadio = (e) => {
    const value = e.target.id;
    console.log("event.taeget:", e.target.id);

    setInputValue(value);
    setSelectedCategory(value); // Устанавливаем выбранную категорию в состояние

    // Проверяем, выбрана ли категория "Отзывы" или "Вопросы"
    if (value === "Отзывы" || value === "Вопросы") {
      // Выполняем программный переход к разделу с комментариями
      navigate(`/posts/${id}/comments`);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "15px", marginLeft: "15px" }}>
        <InputRadio onChange={handleInputRadio} value={inputValue} />
      </div>

      <div className={s.productCarousel}>
        <img
          src={data?.photo && data.photo[selectedPhotoIndex]}
          alt={`Slide ${selectedPhotoIndex}`}
          className={s.mainImage}
          style={{ width: "350px", height: "45vh" }}
        />
      </div>

      <div className={s.thumbnailContainer}>
        {data?.photo &&
          data.photo.map((photo, index) => (
            <div
              key={index}
              className={`${s.thumbnail} ${
                index === selectedPhotoIndex ? s.active : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={photo} alt={`Thumbnail ${index}`} />
            </div>
          ))}
      </div>

      <div className={s.container_right_section}>
        <h1>{data?.title}</h1>
        <div>
          <RatingStars maxStars={data?.rating} initialRating={data?.rating} />
        </div>
        <div className={s.container_store}>
          <div style={{ padding: "6px", borderBlockEnd: "1px solid #ccc" }}>
            <h3>Продавец: myStore</h3>
          </div>
          <div className={s.containerForButton}>
            <h3>{data?.price}грн</h3>
            <Button
              className={s.leftButton}
              variant="contained"
              color="success"
            >
              <LocalGroceryStoreIcon /> Купити
            </Button>
            <Button
              variant="outlined"
              className={s.rightButton}
              color="success"
            >
              Купити в кредит
            </Button>
          </div>
        </div>
      </div>

      <div className={s.bottom_section}>
        <p>{data?.description}</p>

        <div className={s.commentContainer}>
          <form onSubmit={handleSubmit}>
            <div className={s.commentsBlockTextArea}>
              <Tooltip title="Аватар пользователя">
                <Avatar alt="User Avatar" src={userAvatar} />
              </Tooltip>
              <TextField
                id="comment-input"
                label="Оставьте комментарий"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Tooltip title="Отправить отзыв" arrow>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginBottom: "15px" }}
              >
                Отправить отзыв
              </Button>
            </Tooltip>
          </form>
        </div>

        {fetchedComments.map((c) => (
          <div key={c._id} className={s.commentsBlock}>
            <div className={s.commentsBlock2}>
              <Avatar alt="User Avatar" src={c.useravatar} />
              <div className={s.commentsBlockUserName}>{c.username}</div>

              {userId && c.user && c.user._id && c.user._id === userId && (
                <Tooltip title="Удалить комментарий" arrow>
                  <ClearIcon
                    color="secondary"
                    onClick={() => removeComment(id, c._id)}
                  />
                </Tooltip>
              )}
            </div>
            <p className={s.commentsBlockText}>
              {c.text}
              {console.log("userId block:", userId)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullPost;
