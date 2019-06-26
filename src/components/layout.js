/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link } from 'gatsby'

const Layout = ({ children }) => {
  const ribbonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    border: 0
  }
  return (
    <div className="container my-5">
      <a href="https://github.com/tomoyukikashiro/github-search-list">
        <img style={ribbonStyle} src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"
             alt="Fork me on GitHub"/>
      </a>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Github Search List</h1>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="disabled" to='/'>HOME</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="disabled" to='/settings'>SETTINGS</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
