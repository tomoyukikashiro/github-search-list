import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function WorkSpaceFormDialog({ open, setClose, onSubmit, workSpace, name}) {
  const isEdit = !!name
  const title = isEdit ? 'Edit WorkSpace' : 'Create WorkSpace'

  const submit = e => {
    e.preventDefault()
    const nameElement = e.target.elements.namedItem('name')
    const name = nameElement.value
    onSubmit({workSpace, name})

    setClose()
  }

  return (
    <Dialog open={open} onClose={setClose} fullWidth maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={submit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="WorkSpace name"
            fullWidth
            required
            defaultValue={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
