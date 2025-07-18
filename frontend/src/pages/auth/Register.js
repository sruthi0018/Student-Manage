import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const schema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6),
});

export default function Register() {
  const navigate = useNavigate();
  const {signup} = useAuth()
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "superadmin",
    },
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const onSubmit = async (formData) => {
    console.log(formData, "formdata");
    const res = await signup(formData);
    if (res.success) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", backgroundColor: "#1e3a8a" ,justifyContent: "center",
     alignItems: "center",}} >
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
              <TextField
                fullWidth
                label="Name"
                {...register("name")}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />

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

              
              <TextField
                fullWidth
                label="User Role"
                value="Super Admin"
                margin="normal"
                InputProps={{ readOnly: true }}
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
                SIGN UP
              </Button>

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
      </Grid>
    </Grid>
  );
}
