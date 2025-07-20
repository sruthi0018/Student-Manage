import { TableRow, TableCell, Typography, CircularProgress, Box } from '@mui/material';

const TableStatusRow = ({ isLoading, dataLength, colSpan, emptyMessage = 'No records found' }) => {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} align="center">
          <Box display="flex" justifyContent="center" alignItems="center" py={2}>
            <CircularProgress size={24} />
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  if (dataLength === 0) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} align="center">
          <Typography variant="body2" color="text.secondary">
            {emptyMessage}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return null;
};

export default TableStatusRow;
