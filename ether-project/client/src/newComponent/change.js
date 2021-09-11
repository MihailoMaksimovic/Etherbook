import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = useState(props.price);

  const [description, setDescription] = useState(props.description);
  const [error, setError] = useState(true);

  const changeValue = () => {
    if (!((price * 1) % 1 === 0)) {
      setError(false);
    } else {
      props.changeValueFunction(props.id, price, description);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Change
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent style={{ float: "left" }} dividers>
          <textarea
            style={{ width: "100%" }}
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            name="description"
            cols="40"
            rows="5"
            maxLength="400"
            value={description}
          ></textarea>

          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="price"
            label="Price in USD"
            type="number"
            required
            inputProps={{ pattern: "d*", step: ".01", min: "0" }}
            value={price}
          />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            autoFocus
            onClick={() => {
              changeValue();
            }}
            color="primary"
          >
            OK
          </Button>
          <Alert
            style={
              error
                ? { visibility: "hidden", marginTop: "10px" }
                : { visibility: "visible", marginTop: "10px" }
            }
            className="alert"
            severity="error"
          >
            Please make sure price is a whole number!
          </Alert>
        </DialogActions>
      </Dialog>
    </div>
  );
}
