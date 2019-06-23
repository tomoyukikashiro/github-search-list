/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link } from 'gatsby'

const Layout = ({ children }) => (
  <div className="container my-5">
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

export default Layout
