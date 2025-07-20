import React, { useEffect } from "react";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import { GetStudentById } from "../../redux/slices/student";
import { useDispatch, useSelector } from "react-redux";

const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be at least 1"),
  grade: yup.string().required("Grade is required"),
  contact: yup
    .string()
    .required("Contact is required")
    .matches(/^\d{10}$/, "Contact must be a 10-digit number"),
});

const NewStudentDialog = ({
  open,
  onClose,
  onSave,
  studentId,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log(studentId, "studentId");
  const { student } = useSelector((state) => state.students);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      grade: "",
      contact: "",
    },
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    if (studentId) {
      dispatch(GetStudentById(studentId));
    } else {
      reset({ name: "", age: "", grade: "", contact: "" });
    }
  }, [dispatch, studentId, reset]);

  useEffect(() => {
    if (student && studentId) {
      reset({
        name: student.name || "",
        age: student.age || "",
        grade: student.grade || "",
        contact: student.contact || "",
      });
    }
  }, [student, reset, studentId]);

  const handleSave = (data) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, padding: theme.spacing(1) } }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e3a8a" }}>
          {student ? "Edit Student" : "Add New Student"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={1} direction="column">
          {/* Name Field */}
          <Grid item>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          {/* Age Field */}
          <Grid item>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Age"
                  variant="outlined"
                  type="number"
                  error={Boolean(errors.age)}
                  helperText={errors.age?.message}
                />
              )}
            />
          </Grid>

          {/* Grade Field */}
          <Grid item>
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Grade"
                  variant="outlined"
                  error={Boolean(errors.grade)}
                  helperText={errors.grade?.message}
                />
              )}
            />
          </Grid>

          {/* Contact Field */}
          <Grid item>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contact"
                  variant="outlined"
                  error={Boolean(errors.contact)}
                  helperText={errors.contact?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleSave)}
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: "#facc15",
            color: "#000",
            "&:hover": { backgroundColor: "#eab308" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStudentDialog;
