import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface CreateAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = memo(
  ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Account</DialogTitle>
        <DialogContent>
          <Typography>Создание нового счета</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onClose}>
            Create Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CreateAccountModal;
