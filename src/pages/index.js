import React, {useContext, useState} from 'react'
import Layout from '../components/Layout'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { CardActionArea } from 'gatsby-theme-material-ui'
import {WorkSpace, workSpaceContext} from '../lib/workspace'
import WorkSpaceFormDialog from '../components/WorkSpaceFormDialog'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {saveData} from '../lib/storage'


const useStyles = makeStyles(() => ({
  item: {
    minHeight: 200
  },
  addIcon: {
    position: 'fixed',
    bottom: 50,
    right: 100,
    zIndex: 1
  }
}));

const Index = () => {
  const { workSpaceState, setWorkSpaceState } = useContext(workSpaceContext)
  const [form, setForm] = React.useState({ open: false, name: null, workSpace: null});
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const openForm = ({workSpace, name}) => setForm({open: true, workSpace, name})
  const closeForm = () => setForm({...form, open: false})
  const submitForm = ({workSpace, name}) => {
    if (workSpace) {
      workSpace.update(name)
    } else {
      setWorkSpaceState([...workSpaceState, new WorkSpace({name})])
    }
    handleClose()
    saveData(workSpaceState)
  }
  const removeForm = workSpace => {
    setWorkSpaceState([...workSpaceState.filter(ws => ws.id !== workSpace.id)])
    handleClose()
    saveData(workSpaceState)
  }

  return (
    <Layout>
      <WorkSpaceFormDialog {...form} setClose={closeForm} onSubmit={submitForm}/>
      <Fab color="secondary" className={classes.addIcon} onClick={openForm}>
        <AddIcon />
      </Fab>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {workSpaceState.map(ws => (
            <Grid item xs={6} sm={4} key={ws.id}>
              <Card>
                <CardHeader
                  action={
                    <>
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => openForm({workSpace: ws, name: ws.name})}>Edit</MenuItem>
                        <MenuItem onClick={() => removeForm(ws)}>Remove</MenuItem>
                      </Menu>
                    </>
                  }
                  title={ws.name}
                />
                <CardActionArea to={`/workspace/${ws.id}`}>
                  <CardContent className={classes.item}>
                    {ws.queries.length
                      ? <ul>
                        { ws.queries.map(q => (
                          <Typography key={q.id} variant="body2" color="textSecondary" component="li">{q.name}</Typography>
                        )) }
                      </ul>
                      : null
                    }
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Index
