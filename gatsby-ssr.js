/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { WorkSpaceContext } from './src/lib/workspace'
import { Token } from './src/lib/token'

export const wrapRootElement = ({ element }) => (
  <Token>
    <WorkSpaceContext>{element}</WorkSpaceContext>
  </Token>
)
