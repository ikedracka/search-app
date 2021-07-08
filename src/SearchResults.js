import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { valueToObjectRepresentation } from "@apollo/client/utilities";

let searchString=prompt("What are you searching for?","test");

const POSTS_QUERY = gql`
 query SearchQuery {
    posts(where: {search:"${searchString}"}) {
      nodes {
        title
        content
      }
    }
  }
`;

function SearchResults() {

    const { loading, error, data } = useQuery(POSTS_QUERY);
  
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error)
        return <p>Error :(</p>
        };
    console.log(data.posts.nodes);
    if (data.posts.nodes.length===0) {
      return (
        <div>
          <h2>No results</h2>
        </div>
      )
    }
    return data.posts.nodes.map(({title,content}) => (
      <div key={title}>
          <h3>{title}</h3>
          <p>{content.replace(/<\/?[^>]+(>|$)/g, "")}</p>
      </div>
    ))
  }


export default SearchResults;