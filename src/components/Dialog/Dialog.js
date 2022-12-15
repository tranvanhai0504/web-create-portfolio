import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalContext } from '../../globalState/GlobalState';
import { useContext } from 'react';
import { Box } from '@mui/material';

export default function ScrollDialog() {
  const value=useContext(GlobalContext)
  const open=value.activeDialog
  const scroll='paper';
  const shortcuts=[
    {
        keyword:"CTRL+Z",
        describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
        keyword:"CTRL+Z",
        describe:"Undo an action that you just made"
    },
    {
        keyword:"CTRL+J",
        describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made"
    },
    {
      keyword:"CTRL+J",
      describe:"Redo an action that you just made fdfdsfs fsfsfdf fdsfss fssfdsgsfsf efsef"
    },

]
  const descriptionElementRef = React.useRef(null);

  const handleClose=()=>{
    value.setOpen(false)
  }
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          borderRadius:2,
        }}
      >
        <DialogTitle id="scroll-dialog-title">Keyword</DialogTitle>
        <DialogContent dividers={true} sx={{maxHeight:80}}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {shortcuts.map((shortcut) => {
                return <p>{shortcut.keyword+':\t'+shortcut.describe} <br></br></p>
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}