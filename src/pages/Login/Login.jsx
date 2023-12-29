import React from "react";
import { Navigate } from "react-router-dom";

import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchAuth, selectIsAuth } from "../../redux/slice/auth";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "maxadam@gmail.com",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" gutterBottom>
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Адрес"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email", { required: "Укажите почту" })}
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register("password", { required: "Укажите пароль" })}
            id="password"
            autoComplete="current-password"
          />
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
