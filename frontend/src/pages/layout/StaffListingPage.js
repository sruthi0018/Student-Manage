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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewStaffDialog from "../components/NewStaffDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateStaff,
  DeleteStaff,
  GetAllStaffs,
  GetStaffById,
  updateStaff,
  updateStaffPermissions,
} from "../../redux/slices/staff";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PermissionsDialog from "../components/PermissionDialog";

const StaffPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllStaffs());
  }, [dispatch]);

  const { staffs, staff } = useSelector((state) => state.staffs);

  const handleAddClick = () => {
    setEditingStaff(null); // Reset form
    setOpenDialog(true);
  };

  const handlePermissionsClick = async (staffId) => {
    try {
      await dispatch(GetStaffById(staffId));

      setPermissionsDialogOpen(true);
    } catch (error) {
      console.error("Failed to load staff permissions:", error);
    }
  };

  const handleEditClick = async (staffId) => {
    try {
      await dispatch(GetStaffById(staffId));
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
      dispatch(GetAllStaffs());
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  const handleAddOrEditStaff = async (staffData) => {
    try {
      if (staff) {
        const id = staff?._id;
        await dispatch(updateStaff(id, staffData));
      } else {
        await dispatch(CreateStaff(staffData));
      }
      dispatch(GetAllStaffs());

      setEditingStaff(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Save failed:", error.message);
    }
  };

  const handleUpdatePermissions = async (updatedPermissions) => {
    if (staff && staff._id) {
      try {
        await dispatch(
          updateStaffPermissions(staff._id, { permissions: updatedPermissions })
        );
        dispatch(GetAllStaffs());
        setPermissionsDialogOpen(false);
      } catch (error) {
        console.error("Failed to update permissions:", error);
      }
    }
  };

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
                      setSelectedStaff(item);
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
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(selectedStaffId);
                        setMenuAnchor(null);
                      }}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handlePermissionsClick(selectedStaffId);
                        setMenuAnchor(null);
                      }}
                    >
                      Update Permissions
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewStaffDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddOrEditStaff}
        defaultValues={staff}
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
    </Box>
  );
};

export default StaffPage;
