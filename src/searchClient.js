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
        console.log(typeof searchString);
        console.log(typeof String(searchString));
        console.log(error)
        return <p>Error :(</p>
        };
    console.log(data.posts.nodes);
    return data.posts.nodes.map(({title,content}) => (
      <div key={title}>
          <h3>{title}</h3>
          <p>{content.replace(/<\/?[^>]+(>|$)/g, "")}</p>
      </div>
    ))
  }


export default SearchResults;