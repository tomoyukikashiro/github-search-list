import React from 'react'
// import { Link } from 'gatsby'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from 'gatsby-theme-material-ui'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  main: {
    padding: '32px 0'
  }
}));


const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              GitHub Search
            </Typography>
            <Button color="inherit" to="/">HOME</Button>
            <Button color="inherit" to="/settings/">SETTINGS</Button>
            <Button color="inherit" href="https://github.com/tomoyukikashiro/github-search">CODE</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.main}>
        { children }
      </main>
    </>
  )
}

export default Layout
