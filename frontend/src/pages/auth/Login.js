import React, { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import AlertSnackbar from "../components/AlertSnackbar";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const res = await login(formData);
    if (res.success) {
      showAlert("Login successfully", "success");
      navigate("/");
    } else {
      showAlert(res.message, "error");
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1e3a8a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#facc15", fontWeight: "bold", textAlign: "center" }}
            >
              Welcome Back
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: "#facc15",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "50px",
                }}
              >
                LOGIN
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2, color: "#facc15" }}
                onClick={() => navigate("/register")}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Paper>
        </Container>
        <AlertSnackbar
          open={alert.open}
          onClose={() => setAlert({ ...alert, open: false })}
          message={alert.message}
          severity={alert.severity}
        />
      </Grid>
    </Grid>
  );
}
