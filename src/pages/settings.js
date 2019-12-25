import React, {useContext} from 'react'
import Layout from '../components/Layout'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {tokenContext} from '../lib/token'
import {saveToken} from '../lib/storage'

const Settings = () => {
  const { tokenState, setTokenState } = useContext(tokenContext)
  const onSubmit = (e) => {
    const token = e.target.elements.namedItem('token').value
    setTokenState(token)
    saveToken(token)
    e.preventDefault()
  }
  return (
    <Layout>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <TextField required label="token" fullWidth defaultValue={tokenState} name="token"/>
          <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
      </Container>
    </Layout>
  )
}

export default Settings
