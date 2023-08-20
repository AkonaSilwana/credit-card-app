import React, { useState } from 'react';
import { IFormInputValues } from './CardForm';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../App.css';

interface Details {
  formDataList: IFormInputValues[];
}

const GetCardDetails = ({ formDataList }: Details) => {
  const [open, setOpen] = useState(false);
  console.log(formDataList);
  if (!formDataList) {
    return null; 
  }
  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const uniqueFormDataList = Array.from(new Set(formDataList.map(formData => formData.name))).map(name => {
    return formDataList.find(formData => formData.name === name);
  });

  return (
    <>
      <Button  className="dialogButton customDialogButton" variant="outlined" onClick={handleClickOpen}>
        Card Details
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Card Number</TableCell>
                <TableCell align="right">Expiry</TableCell>
                <TableCell align="right">CVC</TableCell>
                <TableCell align="right">Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uniqueFormDataList.map(formDataLists => (
                <TableRow key={formDataLists?.name}>
                  <TableCell component="th" scope="row">
                    {formDataLists?.name}
                  </TableCell>
                  <TableCell align="right">{formDataLists?.number}</TableCell>
                  <TableCell align="right">{formDataLists?.expiry}</TableCell>
                  <TableCell align="right">{formDataLists?.cvc}</TableCell>
                  <TableCell align="right">{formDataLists?.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetCardDetails;