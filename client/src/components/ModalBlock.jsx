import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ModalBlock = ({ onClose, visible = false, children }) => {

  if (!visible) {
    return null;
  }

  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Reply
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
