import React from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { fetchRegister, selectIsAuth } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Максим Адаменко",
      email: "maxadam@gmail.com",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.getItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
          <Typography variant="h5" gutterBottom>
            Регистрация
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              error={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              {...register("fullName", { required: "Укажите полное имя" })}
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Адрес"
              name="email"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register("email", { required: "Укажите почту" })}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register("password", { required: "Укажите пароль" })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
