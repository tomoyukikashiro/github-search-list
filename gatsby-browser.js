/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { SearchQuery } from './src/lib/search-query'
import { Token } from './src/lib/token'

export const wrapRootElement = ({ element }) => (
    <Token>
        <SearchQuery>{element}</SearchQuery>
    </Token>
)
