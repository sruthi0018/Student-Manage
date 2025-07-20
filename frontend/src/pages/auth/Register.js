import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AlertSnackbar from "../components/AlertSnackbar";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6),
});

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "superadmin",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const res = await signup(formData);
    if (res.success) {
      showAlert("Signup successful", "success");
      navigate("/login");
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
              Create an Account
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 2 }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <TextField
                fullWidth
                label="User Role"
                value="Super Admin"
                margin="normal"
                InputProps={{ readOnly: true }}
              />

              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: "#facc15",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#fbbf24",
                  },
                }}
              >
                SIGN UP
              </LoadingButton>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 2, color: "#facc15" }}
                onClick={() => navigate("/login")}
              >
                Already have an account? Sign In
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
