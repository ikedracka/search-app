import React from 'react';
import './index.css';
import { render } from 'react-dom';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'https://plheadless.wpengine.com/graphql/',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});


// client
//   .query({
//     query: gql`
//       query MyQuery {
//         posts {
//           nodes {
//             title
//             content
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
  
const POSTS_QUERY = gql `
  query MyQuery {
          posts {
            nodes {
              title
              content
            }
          }
       }
`;

function Posts() {

  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.posts.nodes.map(({title,content}) => (
    <div key={title}>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>
  ))
}




  function Hello() {
    return (
      <div>
        <h2>Fetching posts 🚀</h2>
      </div>
    );
  }
  
  render(
    <ApolloProvider client={client}>
      <Hello />
      <Posts />
    </ApolloProvider>,
    document.getElementById('root'),
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
