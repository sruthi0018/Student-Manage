import React, { useEffect } from 'react';
import * as yup from 'yup';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography, useTheme
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const staffSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
});

const NewStaffDialog = ({ open, onClose, onSave, defaultValues }) => {
  const theme = useTheme();

  console.log(defaultValues,"deff")

 const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: yupResolver(staffSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || '',
        email: defaultValues.email || '',
      });
    }
  }, [defaultValues, reset]);

  const handleSave = (data) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, padding: theme.spacing(1) }
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e3a8a" }}>
          {defaultValues?._id ? "Edit Staff" : "Add New Staff"}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={1} direction="column">
          <Grid item>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Name"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleSave)}
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: "#facc15",
            color: "#000",
            '&:hover': { backgroundColor: "#eab308" }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStaffDialog;
