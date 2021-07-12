import React from 'react'
import { render } from 'react-dom'
import Complete from './Complete'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://headlesspl.wpengine.com/graphql/',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
})

function Hello() {
  return (
    <div>
      <h2>Fetching posts from WordPress 🚀</h2>
    </div>
  )
}

render(
  <ApolloProvider client={client}>
    <Hello />
    <Complete />
  </ApolloProvider>,
  document.getElementById('root')
)
