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
import NewStudentDialog from "../components/NewStudentDialog";
import { useAuth } from "../../context/AuthContext";
import {
  clearSingleStudent,
  CreateStudent,
  DeleteStudent,
  GetAllStudents,
  GetStudentById,
  UpdateStudent,
} from "../../redux/slices/student";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../components/ConfirmationDialog";

const StudentPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(GetAllStudents());
  }, [dispatch]);
  const { students, student } = useSelector((state) => state.students);

  console.log(students, "students");

  const handleDeleteClick = (studentId) => {
    setStudentToDelete(studentId);
    setDeleteDialogOpen(true);
  };

  const handleEdit = async (studentId) => {
    try {
      const response = await dispatch(GetStudentById(studentId));
      setEditStudent(response);
      setOpenDialog(true);
    } catch (error) {
      console.error("Failed to load student details:", error);
    }
  };

  const handleAddOrEditStudent = async (data) => {
    try {
      if (student) {
        const id = student?._id;
        await dispatch(UpdateStudent(id, data));
      } else {
        await dispatch(CreateStudent(data));
      }
      dispatch(GetAllStudents());

      setEditStudent(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Save failed:", error.message);
    }
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      await dispatch(DeleteStudent(studentToDelete));
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditStudent(null);
    dispatch(clearSingleStudent());
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
        <Typography variant="h5">Students</Typography>
        {user?.permissions?.student?.create && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1e3a8a" }}
            onClick={() => setOpenDialog(true)}
          >
            New Student
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#facc15" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Contact</TableCell>
              {(user?.permissions?.student?.edit ||
                user?.permissions?.student?.delete) && (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.contact}</TableCell>
                {(user?.permissions?.student?.edit ||
                  user?.permissions?.student?.delete) && (
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => {
                        setMenuAnchor(e.currentTarget);
                        setSelectedStudentId(item._id);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={() => setMenuAnchor(null)}
                    >
                      {user?.permissions?.student?.edit && (
                        <MenuItem
                          onClick={() => {
                            handleEdit(selectedStudentId);
                            setMenuAnchor(null);
                          }}
                        >
                          Edit
                        </MenuItem>
                      )}
                      {user?.permissions?.student?.delete && (
                        <MenuItem
                          onClick={() => {
                            handleDeleteClick(selectedStudentId);
                            setMenuAnchor(null);
                          }}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewStudentDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleAddOrEditStudent}
        initialData={student}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
      />
    </Box>
  );
};

export default StudentPage;
