import s from "./CommentBlock.module.scss";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import {
  selectUsername,
  selectAvatar,
  selectUserId,
} from "../../redux/slice/auth";

import {
  fetchComments,
  removeComments,
  addComment,
  postComments as selectPostComments,
} from "../../redux/slice/post";

const CommentBlockk = () => {
  const [data, setData] = useState();

  const [comment, setComment] = useState("");
  const userName = useSelector(selectUsername);
  const userAvatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const fetchedComments = useSelector(selectPostComments);
  const userId = useSelector(selectUserId);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { id } = useParams();
  console.log("комент блок ид ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${id}/comments`);
        setData(response.data);
      } catch (error) {
        console.error(error);
        alert("Помилка отримування товару");
      }
    };
    fetchData();
    dispatch(fetchComments(id))
      .then((comments) => {
        console.log("данные комментариев", comments);
      })
      .catch((error) => {
        console.error("ошибка при получении комментариев");
      });
  }, [id]);

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

  return (
    <div>
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
  );
};

export default CommentBlockk;
