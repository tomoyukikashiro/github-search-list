import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/Add'

export default function QueryFormDialog({ open, setClose, onSubmit, query}) {
  const isEdit = !!query
  const title = isEdit ? 'Edit Query' : 'Create Query'
  const name = isEdit ? query.name : ''
  const queryString = isEdit ? query.queryString : ['']
  const [queryCount, setQueryCount] = useState(queryString.length)

  const submit = e => {
    e.preventDefault()
    const nameElement = e.target.elements.namedItem('name')
    let queryElements = e.target.elements.namedItem('query')
    queryElements = !!queryElements.length ? Array.from(queryElements) : [queryElements]
    const name = nameElement.value
    const queryString = queryElements.filter(e => !!e.value).map(e => e.value)
    const orgData = query ? query.toHash() : {}
    onSubmit({...orgData, name, queryString})

    setQueryCount(queryString.length)
    setClose()
  }

  const addQueryString = e => {
    e.preventDefault()
    setQueryCount(queryCount + 1)
  }

  return (
    <Dialog open={open} onClose={setClose} fullWidth maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={submit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Query Name"
            fullWidth
            required
            defaultValue={name}
          />
          { new Array(queryCount).fill().map((v, i) => (
             <TextField
                name="query"
                label={`query string ${i + 1}`}
                key={i}
                required
                fullWidth
                defaultValue={queryString[i]}>
             </TextField>
          )) }
          <Button
            variant="contained"
            color="default"
            startIcon={<Add />}
            onClick={addQueryString}
          >
            Add Query String
      </Button>
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
