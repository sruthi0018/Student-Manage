import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const PermissionsDialog = ({ open, onClose, onSave, permissions }) => {
  const [studentPermissions, setStudentPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    if (permissions?.student) {
      setStudentPermissions(permissions.student);
    }
  }, [permissions]);

  const handleToggle = (key) => (event) => {
    setStudentPermissions((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  const handleSave = () => {
    onSave({ student: studentPermissions });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e3a8a" }}>
          Update Student Permissions
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1} direction="column">
          <FormGroup>
            {["view", "create", "edit", "delete"].map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Switch
                    checked={studentPermissions[key]}
                    onChange={handleToggle(key)}
                  />
                }
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </FormGroup>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ borderRadius: 2, backgroundColor: "#facc15" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionsDialog;
