/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link } from 'gatsby'

const Layout = ({ children }) => (
  <>
    <header>
      <menu>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </menu>
    </header>
    <main>{children}</main>
  </>
)

export default Layout
