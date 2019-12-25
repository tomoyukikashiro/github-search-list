import React, {useContext, Suspense, useState} from 'react'
import Container from '@material-ui/core/Container'
import Layout from '../components/Layout'
import {workSpaceContext} from '../lib/workspace'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FileCopy from '@material-ui/icons/FileCopyOutlined'
import Octicon, {IssueClosed, IssueOpened, GitPullRequest} from '@primer/octicons-react'
import * as clipboard from 'clipboard-polyfill'
import { getTasks, cachedResults } from '../lib/github-client'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import QueryFormDialog from '../components/QueryFormDialog'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {saveData} from '../lib/storage'
import {tokenContext} from '../lib/token'

const useStyles = makeStyles(() => ({
  workSpace: {
    marginBottom: 32
  },
  addIcon: {
    position: 'fixed',
    bottom: 50,
    right: 100,
    zIndex: 1
  }
}))

function ListItemLink(props) {
  return <ListItem button component="a" target="_blank" rel="noopener noreferrer" {...props} />;
}

const TaskIcon = ({ task }) => {
  if (task.hasOwnProperty('pull_request')) {
    return <Octicon verticalAlign='top' icon={GitPullRequest} />
  } else if (task.state === 'close') {
    return <Octicon verticalAlign='top' icon={IssueClosed} />
  } else {
    return <Octicon verticalAlign='top' icon={IssueOpened} />
  }
}

const TaskList = ({ tasks }) => {
  const repoName = (task) => task.repository_url.split('/').pop()
  const title = (task) => `#${task.number} ${task.title}`

  const onClickClipboard = task => {
    clipboard.writeText(toMarkdown(task))
  }

  const TaskInfo = ({task}) => {
    const useStyles = makeStyles({
      repo: {
        marginRight: '16px',
      },
      label: {
        marginRight: '8px',
      }
    })();
    return (
      <span style={{paddingTop: '8px'}}>
        <Typography
          component="span"
          variant="body2"
          className={useStyles.repo}
        >
          {repoName(task)}
        </Typography>
        {task.labels.map(label => (
          <Chip component="span"
                size="small"
                label={label.name}
                key={label.id}
                className={useStyles.label}
                style={{color: '#fff', backgroundColor: `#${label.color}`}}/>
        ))}
      </span>
    )
  }

  if (!tasks.length) return (
    <List><ListItem>なし</ListItem></List>
  )
  return (
    <List>
      { tasks.map(task => (
        <ListItemLink key={task.id} href={task.html_url}>
          <ListItemIcon><TaskIcon task={task} /></ListItemIcon>
          <ListItemText primary={title(task)} secondary={<TaskInfo task={task}/>}/>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onClickClipboard(task)}>
              <FileCopy />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemLink>
      )) }
    </List>
  )
}

const TaskListSuspense = ({ token, queries }) => {
  if (!token) return <></>
  const tasks = cachedResults.get(queries)
  if (tasks) {
    return <TaskList tasks={tasks}/>
  }
  throw getTasks(token, queries)
}

const toMarkdown = task => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return `[${repo}] [${title}](${task.html_url})`
}

const queryToMarkdown = queryString => {
  const tasks = cachedResults.get(queryString)
  if (!tasks) return
  return tasks.map(task => (toMarkdown(task))).join('\n')
}

const WorkSpace = ({ workSpaceId }) => {
  const isSSR = typeof window === 'undefined'
  if (isSSR) return null
  const classes = useStyles()
  const { workSpaceState } = useContext(workSpaceContext)
  const [queryForm, setQueryForm] = React.useState({ open: false, query: null});
  const ws = workSpaceState.find(ws => ws.id === parseInt(workSpaceId, 10))
  const { tokenState } = useContext(tokenContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const onClickClipboard = data => {
    clipboard.writeText(queryToMarkdown(data.queryString))
    handleClose()
  }
  const closeQueryForm = () => setQueryForm({...queryForm, open: false })
  const onClickEdit = query => {
    setQueryForm({ ...queryForm, open: true, query })
    handleClose()
  }
  const onClickAdd = () => {
    setQueryForm({ open: true })
    handleClose()
  }
  const onClickRemove = (query) => {
    ws.removeQuery(query)
    handleClose()
    saveData(workSpaceState)
  }
  const onSubmit = queryHash => {
    if (queryHash.id) {
      ws.updateQuery(queryHash)
    } else {
      ws.addQuery(queryHash)
    }
    saveData(workSpaceState)
  }

  return (
    <Layout>
      <QueryFormDialog { ...queryForm } setClose={closeQueryForm} onSubmit={onSubmit} />
      <Fab color="secondary" className={classes.addIcon} onClick={onClickAdd}>
        <AddIcon />
      </Fab>
      <Container>
        <header>
          <Typography gutterBottom variant="h3" component="h2">{ws.name}</Typography>
        </header>
        <div>
          { !!ws.queries.length && ws.queries.map(query => (
            <Card key={query.id} className={classes.workSpace}>
              <CardHeader variant="h4" titleTypographyProps={{variant: "h5"}}
                action={
                  <>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                      <MenuItem onClick={() => onClickClipboard(query)}>Copy All</MenuItem>
                      <MenuItem onClick={() => onClickEdit(query)}>Edit</MenuItem>
                      <MenuItem onClick={() => onClickRemove(query)}>Remove</MenuItem>
                    </Menu>
                  </>
                }
                title={query.name}
              />
              <Divider variant="middle" />
              <Suspense fallback={<>Loading...</>}>
                <TaskListSuspense token={tokenState} queries={query.queryString}/>
              </Suspense>
            </Card>
          )) }
        </div>
      </Container>
    </Layout>
  )
}

export default WorkSpace
