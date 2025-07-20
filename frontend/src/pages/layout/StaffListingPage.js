import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewStaffDialog from "../components/NewStaffDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleStaff,
  CreateStaff,
  DeleteStaff,
  GetAllStaffs,
  GetStaffById,
  updateStaff,
  updateStaffPermissions,
} from "../../redux/slices/staff";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PermissionsDialog from "../components/PermissionDialog";
import AlertSnackbar from "../components/AlertSnackbar";
import EmptyTableContent from "../components/EmptyContent";

const StaffPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  // const [selectedStaff, setSelectedStaff] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllStaffs());
  }, [dispatch]);

  const { staffs, staff, isLoading } = useSelector((state) => state.staffs);

  const handleAddClick = () => {
    dispatch(clearSingleStaff());
    setSelectedStaffId(null);
    setEditingStaff(null);
    setOpenDialog(true);
  };

  const handlePermissionsClick = async (staffId) => {
    try {
      // await dispatch(GetStaffById(staffId));

      setPermissionsDialogOpen(true);
    } catch (error) {
      console.error("Failed to load staff permissions:", error);
    }
  };

  const handleEditClick = async (staffId) => {
    try {
      // await dispatch(GetStaffById(staffId));
      setSelectedStaffId(staffId);
      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to load staff details:", error);
    }
  };

  const handleDeleteClick = (staffId) => {
    setStaffToDelete(staffId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (staffToDelete) {
      await dispatch(DeleteStaff(staffToDelete));
      showAlert("Staff deleted successfully", "success");
      // dispatch(GetAllStaffs());
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  const handleAddOrEditStaff = async (staffData) => {
    try {
      if (selectedStaffId) {
        const id = selectedStaffId;
        await dispatch(updateStaff(id, staffData));
        showAlert("Staff updated successfully", "success");
      } else {
        await dispatch(CreateStaff(staffData));
        showAlert(
          "Staff created and credentials sent via email successfully",
          "success"
        );
      }
      dispatch(GetAllStaffs());

      setEditingStaff(null);
      setSelectedStaffId(null);
      setOpenDialog(false);
    } catch (error) {
      showAlert("Failed", "error");
      console.error("Save failed:", error.message);
    }
  };

  const handleUpdatePermissions = async (updatedPermissions) => {
    if (staff && staff._id) {
      try {
        await dispatch(
          updateStaffPermissions(staff._id, { permissions: updatedPermissions })
        );
        // dispatch(GetAllStaffs());
        showAlert("Staff Permissions updated successfully", "success");
        setPermissionsDialogOpen(false);
      } catch (error) {
        showAlert("Failed to update", "error");
        console.error("Failed to update permissions:", error);
      }
    }
  };

  console.log(selectedStaffId, "selectedStaffId");

  return (
    <Box component="main">
      <Toolbar />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Staffs</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1e3a8a" }}
          onClick={handleAddClick}
        >
          New Staff
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#facc15" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Role</TableCell> */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                {/* <TableCell>{item.role}</TableCell> */}

                <TableCell align="right">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuAnchor(e.currentTarget);
                      setSelectedStaffId(item._id);
                     
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                  >
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(selectedStaffId);
                        setMenuAnchor(null);
                      }}
                    >
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(selectedStaffId);
                        setMenuAnchor(null);
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handlePermissionsClick(selectedStaffId);
                        setMenuAnchor(null);
                      }}
                    >
                      <ListItemIcon>
                        <LockOpenIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Update Permissions</ListItemText>{" "}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
            <EmptyTableContent
              isLoading={isLoading}
              dataLength={staffs.length}
              colSpan={6}
              emptyMessage="No staff records found"
            />
          </TableBody>
        </Table>
      </TableContainer>
      <NewStaffDialog
        open={openDialog}
        onClose={() => {
          dispatch(clearSingleStaff());
          setOpenDialog(false);
        }}
        onSave={handleAddOrEditStaff}
        staffId={selectedStaffId}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Staff"
        message={`Are you sure you want to delete this staff?`}
      />
      <PermissionsDialog
        open={permissionsDialogOpen}
        onClose={() => setPermissionsDialogOpen(false)}
        onSave={handleUpdatePermissions}
        permissions={staff?.permissions}
      />
      <AlertSnackbar
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
};

export default StaffPage;
